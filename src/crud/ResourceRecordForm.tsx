import { App, Button, Form, Space, Spin } from "antd";
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
} from "react-hook-form";
import { useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useDataProvider } from "../context/DataProvider";
import { FormMetaProvider } from "./context/FormContext";
import { PayloadFieldsProvider } from "./context/PayloadFieldsContext";
import {
  InlineFieldsRegistryProvider,
  type InlineFieldRegistration,
} from "./context/InlineFieldsRegistry";
import { FormGlobalErrorsAlert } from "./FormGlobalErrorsAlert";
import { useFormRecordLoad, useFormRecordSave } from "./utils/useFormRecord";

export type ResourceRecordFormProps<T extends FieldValues & { id?: unknown }> = {
  resource: string;
  id: string | undefined;
  children: ReactNode;
  defaultValues?: Partial<T>;
  /** When false, skip loading (e.g. modal closed). Defaults to true. */
  enabled?: boolean;
  canSave?: boolean;
  onCancel: () => void;
  /** When set, Cancel renders as a router Link instead of a button. */
  cancelHref?: string;
  onSuccess?: (record: T) => void;
  /** overlay: dim form + spinner; replace: show spinner instead of form. */
  loadingMode?: "overlay" | "replace";
};

/**
 * Shared create/edit form — load record, save, field providers, and actions.
 * Used by ResourceForm (page) and ResourceFormModal.
 */
export function ResourceRecordForm<T extends FieldValues & { id?: unknown }>({
  resource,
  id,
  children,
  defaultValues,
  enabled = true,
  canSave = true,
  onCancel,
  cancelHref,
  onSuccess,
  loadingMode = "overlay",
}: ResourceRecordFormProps<T>) {
  const isNew = id === "new" || !id;
  const recordId = isNew ? undefined : id;
  const dp = useDataProvider();
  const { message } = App.useApp();
  const payloadFieldsRef = useRef(new Set<string>());
  const inlineRegistryRef = useRef(new Map<string, InlineFieldRegistration>());
  const [globalErrors, setGlobalErrors] = useState<string[]>([]);

  const form = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const { loading, formVersion } = useFormRecordLoad({
    dp,
    resource,
    id: recordId,
    isNew,
    form,
    message,
    defaultValues,
    enabled,
  });

  const { onSubmit, saving } = useFormRecordSave({
    dp,
    resource,
    id: recordId,
    isNew,
    form,
    message,
    payloadFieldsRef,
    inlineRegistryRef,
    setGlobalErrors,
    onSuccess,
  });

  const busy = loading || saving;

  const handleFinish = () => {
    void form.handleSubmit(onSubmit, () => {
      message.warning("Please fix the errors below.");
    })();
  };

  const cancelButton = (
    <Button disabled={busy} onClick={cancelHref ? undefined : onCancel}>
      Cancel
    </Button>
  );

  const formContent = (
    <FormMetaProvider resource={resource} isNew={isNew}>
      <PayloadFieldsProvider fieldsRef={payloadFieldsRef}>
        <InlineFieldsRegistryProvider registryRef={inlineRegistryRef}>
          <div style={{ position: "relative" }}>
            {busy && loadingMode === "overlay" ? (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                }}
              >
                <Spin />
              </div>
            ) : null}
            <FormProvider {...form} key={formVersion}>
              <Form
                layout="vertical"
                onFinish={handleFinish}
                style={
                  loadingMode === "overlay"
                    ? {
                        opacity: busy ? 0.4 : 1,
                        pointerEvents: busy ? "none" : undefined,
                      }
                    : undefined
                }
              >
                <FormGlobalErrorsAlert errors={globalErrors} />
                {children}
                <Form.Item style={{ marginTop: 16, marginBottom: 0 }}>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={saving}
                      disabled={busy || !canSave}
                    >
                      Save
                    </Button>
                    {cancelHref ? (
                      <Link to={cancelHref}>{cancelButton}</Link>
                    ) : (
                      cancelButton
                    )}
                  </Space>
                </Form.Item>
              </Form>
            </FormProvider>
          </div>
        </InlineFieldsRegistryProvider>
      </PayloadFieldsProvider>
    </FormMetaProvider>
  );

  if (loading && !saving && loadingMode === "replace") {
    return <Spin />;
  }

  return formContent;
}
