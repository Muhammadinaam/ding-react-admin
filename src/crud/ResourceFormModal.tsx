import { App, Button, Form, Modal, Spin } from "antd";
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
} from "react-hook-form";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { useDataProvider } from "../context/DataProvider";
import { FormMetaProvider } from "./context/FormContext";
import { PayloadFieldsProvider } from "./context/PayloadFieldsContext";
import { buildResourceFormSubmitBody } from "./utils/buildResourceFormSubmitBody";
import { applyApiErrorsToForm } from "./utils/formErrors";
import { useAbortableEffect } from "./utils/useAbortableEffect";
import { isAbortError } from "../data/abortError";

export type ResourceFormModalProps = {
  resource: string;
  editId: string | null;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

export function ResourceFormModal({
  resource,
  editId,
  onClose,
  children,
  title,
}: ResourceFormModalProps) {
  const isNew = editId === "new" || editId == null;
  const open = editId != null;
  const dp = useDataProvider();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(!isNew);

  const form = useForm<FieldValues>();
  const payloadFieldsRef = useRef(new Set<string>());

  const load = useCallback(
    async (signal?: AbortSignal) => {
      if (isNew || !editId) {
        form.reset({} as DefaultValues<FieldValues>);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await dp.getOne(resource, editId, { signal });
        if (signal?.aborted) return;
        form.reset(res.data as DefaultValues<FieldValues>);
      } catch (e) {
        if (!isAbortError(e)) {
          message.error(e instanceof Error ? e.message : "Load failed");
        }
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [dp, resource, editId, isNew, form, message],
  );

  useAbortableEffect(
    (signal) => {
      if (!open) return;
      return load(signal);
    },
    [open, load],
  );

  async function onSubmit(values: FieldValues) {
    try {
      const body = buildResourceFormSubmitBody(
        values as Record<string, unknown>,
        Array.from(payloadFieldsRef.current),
      );
      if (isNew) {
        await dp.create(resource, body);
        message.success("Created");
      } else if (editId) {
        await dp.update(resource, { id: editId, data: body });
        message.success("Updated");
      }
      onClose();
    } catch (e) {
      const handled = await applyApiErrorsToForm(dp, form, message, e, {
        resource,
        mutation: isNew ? "create" : "update",
      });
      if (!handled) {
        message.error(e instanceof Error ? e.message : "Save failed");
      }
    }
  }

  const modalTitle =
    title ?? (isNew ? `New ${resource}` : `Edit ${resource}`);

  return (
    <Modal
      open={open}
      title={modalTitle}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      width={560}
    >
      {loading ? (
        <Spin />
      ) : (
        <FormMetaProvider resource={resource} isNew={isNew}>
          <PayloadFieldsProvider fieldsRef={payloadFieldsRef}>
            <FormProvider {...form}>
              <Form
                layout="vertical"
                onFinish={() => void form.handleSubmit(onSubmit)()}
              >
                {children}
                <Form.Item style={{ marginTop: 16, marginBottom: 0 }}>
                  <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </Form.Item>
              </Form>
            </FormProvider>
          </PayloadFieldsProvider>
        </FormMetaProvider>
      )}
    </Modal>
  );
}
