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
import type { InlineFieldRegistration } from "../context/InlineFieldsRegistry";
import { buildFormPayload } from "./buildFormPayload";
import { buildInlineRowsPayload } from "./buildInlineRowsPayload";
import { applyApiErrorsToForm } from "./formErrors";
import { useAbortableEffect } from "./useAbortableEffect";

type LoadOptions<T extends FieldValues> = {
  dp: DataProvider;
  resource: string;
  id: string | undefined;
  isNew: boolean;
  form: UseFormReturn<T>;
  message: MessageInstance;
  defaultValues?: Partial<T>;
};

/** Edit mode: `getOne` → `form.reset` → bump `formVersion` so field arrays remount. */
export function useFormRecordLoad<T extends FieldValues>({
  dp,
  resource,
  id,
  isNew,
  form,
  message,
  defaultValues,
}: LoadOptions<T>) {
  const [loading, setLoading] = useState(!isNew);
  const [formVersion, setFormVersion] = useState(0);

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
        form.reset(res.data as DefaultValues<T>);
        setFormVersion((v) => v + 1);
      } catch (e) {
        if (!isAbortError(e)) {
          message.error(e instanceof Error ? e.message : "Load failed");
        }
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [dp, resource, id, isNew, form, message, defaultValues],
  );

  useAbortableEffect((signal) => load(signal), [load]);

  return { loading, formVersion };
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
  payloadFieldsRef: MutableRefObject<Set<string>>;
  inlineRegistryRef: MutableRefObject<Map<string, InlineFieldRegistration>>;
  onSaved?: (record: T) => void;
  stayOnPage?: boolean;
};

/** Save: `buildFormPayload` → clean inline rows → one `create` or `update`. */
export function useFormRecordSave<T extends FieldValues & { id?: unknown }>({
  dp,
  resource,
  id,
  isNew,
  form,
  message,
  navigate,
  listPath,
  payloadFieldsRef,
  inlineRegistryRef,
  onSaved,
  stayOnPage,
}: SubmitOptions<T>) {
  return useCallback(
    async (values: T) => {
      try {
        const raw = values as Record<string, unknown>;
        const payload = buildFormPayload(
          raw,
          Array.from(payloadFieldsRef.current),
        );

        for (const inline of inlineRegistryRef.current.values()) {
          const rows = raw[inline.field];
          const key = inline.payloadKey ?? inline.field;
          payload[key] = buildInlineRowsPayload(rows, inline.sources, {
            transformRows: inline.transformRows,
          });
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

        onSaved?.(saved);
        if (!stayOnPage) navigate(listPath);
      } catch (e) {
        const inlineFieldPaths = Array.from(inlineRegistryRef.current.keys());
        applyApiErrorsToForm(dp, form, message, e, {
          resource,
          mutation: isNew ? "create" : "update",
          inlineFieldPaths,
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
      payloadFieldsRef,
      inlineRegistryRef,
      onSaved,
      stayOnPage,
    ],
  );
}
