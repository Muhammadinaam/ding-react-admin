import type { MessageInstance } from "antd/es/message/interface";
import {
  useCallback,
  useState,
  type MutableRefObject,
} from "react";
import type { NavigateFunction } from "react-router-dom";
import type { DataProvider } from "../../data/dataProviderTypes";
import { isAbortError } from "../../data/abortError";
import {
  type DefaultValues,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import {
  loadInlineRows,
  saveInlineRows,
  type InlineFormSetProps,
} from "../InlineFormSet";
import { inlineArrayName } from "./inlineArrayName";
import { pickBySources } from "./pickBySources";
import { parseAndApplyFormErrors } from "./formErrors";
import { useAbortableEffect } from "./useAbortableEffect";

export type ResourceFormInlineConfig = Pick<
  InlineFormSetProps,
  "resource" | "foreignKey" | "name"
>;

export function resolveInlineArrayName(config: ResourceFormInlineConfig) {
  return inlineArrayName(config.resource, config.name);
}

type LoadOptions<T extends FieldValues> = {
  dp: DataProvider;
  resource: string;
  id: string | undefined;
  isNew: boolean;
  form: UseFormReturn<T>;
  message: MessageInstance;
  defaultValues?: Partial<T>;
  inlines?: ResourceFormInlineConfig[];
};

/** Edit mode: fetch parent (+ inline rows) → form.reset → bump formVersion for field arrays. */
export function useResourceFormLoad<T extends FieldValues>({
  dp,
  resource,
  id,
  isNew,
  form,
  message,
  defaultValues,
  inlines,
}: LoadOptions<T>) {
  const [loading, setLoading] = useState(!isNew);
  const [formVersion, setFormVersion] = useState(0);
  const [existingInlineIds, setExistingInlineIds] = useState<
    Record<string, (string | number)[]>
  >({});

  const load = useCallback(
    async (signal?: AbortSignal) => {
      if (isNew || !id) {
        if (defaultValues) {
          form.reset({ ...defaultValues } as DefaultValues<T>);
        }
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await dp.getOne(resource, id, { signal });
        if (signal?.aborted) return;
        const record = res.data as DefaultValues<T>;
        if (inlines?.length) {
          const merged = { ...record } as DefaultValues<T>;
          const idsMap: Record<string, (string | number)[]> = {};
          for (const cfg of inlines) {
            const arrayName = resolveInlineArrayName(cfg);
            const { rows, ids } = await loadInlineRows(
              dp,
              cfg.resource,
              cfg.foreignKey,
              id,
            );
            (merged as Record<string, unknown>)[arrayName] = rows;
            idsMap[arrayName] = ids;
          }
          if (signal?.aborted) return;
          form.reset(merged);
          setExistingInlineIds(idsMap);
          setFormVersion((v) => v + 1);
        } else {
          form.reset(record);
          setFormVersion((v) => v + 1);
        }
      } catch (e) {
        if (!isAbortError(e)) {
          message.error(e instanceof Error ? e.message : "Load failed");
        }
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [dp, resource, id, isNew, form, message, defaultValues, inlines],
  );

  useAbortableEffect((signal) => load(signal), [load]);

  return { loading, formVersion, existingInlineIds };
}

type SubmitOptions<T extends FieldValues & { id?: unknown }> = {
  dp: DataProvider;
  resource: string;
  id: string | undefined;
  isNew: boolean;
  form: UseFormReturn<T>;
  message: MessageInstance;
  navigate: NavigateFunction;
  listPath: string;
  submitFieldsRef: MutableRefObject<Set<string>>;
  inlines?: ResourceFormInlineConfig[];
  existingInlineIds: Record<string, (string | number)[]>;
  onSaved?: (record: T) => void;
  stayOnPage?: boolean;
};

/** Save: pickBySources → create/update parent → saveInlineRows for each inline config. */
export function useResourceFormSubmit<T extends FieldValues & { id?: unknown }>({
  dp,
  resource,
  id,
  isNew,
  form,
  message,
  navigate,
  listPath,
  submitFieldsRef,
  inlines,
  existingInlineIds,
  onSaved,
  stayOnPage,
}: SubmitOptions<T>) {
  return useCallback(
    async (values: T) => {
      try {
        const raw = values as Record<string, unknown>;
        let payload = pickBySources(raw, Array.from(submitFieldsRef.current));
        if (inlines?.length) {
          for (const cfg of inlines) {
            delete payload[resolveInlineArrayName(cfg)];
          }
        }

        let saved: T;
        if (isNew) {
          const res = await dp.create(resource, payload);
          saved = res.data as T;
          message.success("Created");
        } else if (id) {
          const res = await dp.update(resource, { id, data: payload });
          saved = res.data as T;
          message.success("Updated");
        } else {
          return;
        }

        const parentId = saved.id as string | number;
        if (inlines?.length && parentId != null) {
          for (const cfg of inlines) {
            const arrayName = resolveInlineArrayName(cfg);
            const rows =
              ((form.getValues(arrayName as never) as unknown) as
                | Record<string, unknown>[]
                | undefined) ?? [];
            const inlineOk = await saveInlineRows(dp, {
              resource: cfg.resource,
              foreignKey: cfg.foreignKey,
              parentId,
              rows,
              existingIds: existingInlineIds[arrayName] ?? [],
              onRowError: (e, index) => {
                const row = rows[index];
                const rowId = row?.id as string | number | undefined;
                return parseAndApplyFormErrors(dp, form, message, e, {
                  resource: cfg.resource,
                  mutation:
                    rowId != null &&
                    (existingInlineIds[arrayName] ?? []).some(
                      (existingId) => existingId === rowId,
                    )
                      ? "update"
                      : "create",
                  inlineArrayName: arrayName,
                  rowIndex: index,
                });
              },
            });
            if (!inlineOk) return;
          }
        }

        onSaved?.(saved);
        if (!stayOnPage) navigate(listPath);
      } catch (e) {
        parseAndApplyFormErrors(dp, form, message, e, {
          resource,
          mutation: isNew ? "create" : "update",
        });
        message.error(e instanceof Error ? e.message : "Save failed");
      }
    },
    [
      dp,
      resource,
      id,
      isNew,
      form,
      message,
      navigate,
      listPath,
      submitFieldsRef,
      inlines,
      existingInlineIds,
      onSaved,
      stayOnPage,
    ],
  );
}
