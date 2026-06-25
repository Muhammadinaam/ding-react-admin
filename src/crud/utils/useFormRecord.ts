import type { MessageInstance } from "antd/es/message/interface";
import {
  useCallback,
  useState,
  type MutableRefObject,
} from "react";
import type { DataProvider } from "../../data/dataProviderTypes";
import { isAbortError } from "../../data/abortError";
import {
  type DefaultValues,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import type { InlineFieldRegistration } from "../context/InlineFieldsRegistry";
import { buildResourceFormSubmitBody } from "./buildResourceFormSubmitBody";
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
  /** When false, skip loading (e.g. modal closed). Defaults to true. */
  enabled?: boolean;
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
  enabled = true,
}: LoadOptions<T>) {
  const [loading, setLoading] = useState(!isNew);
  const [formVersion, setFormVersion] = useState(0);

  const load = useCallback(
    async (signal?: AbortSignal) => {
      if (isNew || !id) {
        if (defaultValues) {
          form.reset({ ...defaultValues } as DefaultValues<T>);
        } else {
          form.reset({} as DefaultValues<T>);
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

  useAbortableEffect(
    (signal) => {
      if (!enabled) return;
      return load(signal);
    },
    [enabled, load],
  );

  return { loading, formVersion };
}

type SubmitOptions<T extends FieldValues & { id?: unknown }> = {
  dp: DataProvider;
  resource: string;
  id: string | undefined;
  isNew: boolean;
  form: UseFormReturn<T>;
  message: MessageInstance;
  payloadFieldsRef: MutableRefObject<Set<string>>;
  inlineRegistryRef: MutableRefObject<Map<string, InlineFieldRegistration>>;
  setGlobalErrors: (errors: string[]) => void;
  onSuccess?: (record: T) => void;
};

/** Save: `buildFormPayload` → clean inline rows → one `create` or `update`. */
export function useFormRecordSave<T extends FieldValues & { id?: unknown }>({
  dp,
  resource,
  id,
  isNew,
  form,
  message,
  payloadFieldsRef,
  inlineRegistryRef,
  setGlobalErrors,
  onSuccess,
}: SubmitOptions<T>) {
  const [saving, setSaving] = useState(false);

  const onSubmit = useCallback(
    async (values: T) => {
      setGlobalErrors([]);
      setSaving(true);
      try {
        const raw = values as Record<string, unknown>;
        const body = buildResourceFormSubmitBody(
          raw,
          Array.from(payloadFieldsRef.current),
          inlineRegistryRef.current.values(),
        );

        let saved: T;
        if (isNew) {
          const res = await dp.create(resource, body);
          saved = res.data as T;
          message.success("Created");
        } else if (id) {
          const res = await dp.update(resource, { id, data: body });
          saved = res.data as T;
          message.success("Updated");
        } else {
          return;
        }

        onSuccess?.(saved);
      } catch (e) {
        const { handled, globalErrors } = await applyApiErrorsToForm(
          dp,
          form,
          e,
          {
            resource,
            mutation: isNew ? "create" : "update",
            inlineFieldPaths: Array.from(inlineRegistryRef.current.keys()),
          },
          {
            payloadFields: payloadFieldsRef.current,
            inlineRegistry: inlineRegistryRef.current.values(),
          },
        );
        if (handled) {
          setGlobalErrors(globalErrors);
          message.error(globalErrors[0] ?? "Save failed.");
        } else {
          setGlobalErrors([]);
          message.error(e instanceof Error ? e.message : "Save failed");
        }
      } finally {
        setSaving(false);
      }
    },
    [
      dp,
      resource,
      id,
      isNew,
      form,
      message,
      payloadFieldsRef,
      inlineRegistryRef,
      setGlobalErrors,
      onSuccess,
    ],
  );

  return { onSubmit, saving };
}
