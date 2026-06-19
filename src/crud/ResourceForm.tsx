import { ArrowLeftOutlined } from "@ant-design/icons";
import { App, Button, Card, Form, Space, Spin, Typography, theme } from "antd";
import { FormProvider, useForm, type DefaultValues, type FieldValues } from "react-hook-form";
import { useEffect, useRef, type ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDataProvider } from "../context/DataProvider";
import { usePermissions } from "../context/PermissionsProvider";
import type { ResourcePermissions } from "../permissions/resourcePermissions";
import { checkResourcePermission } from "../permissions/resourcePermissions";
import { FormMetaProvider } from "./context/FormContext";
import { PayloadFieldsProvider } from "./context/PayloadFieldsContext";
import {
  InlineFieldsRegistryProvider,
  type InlineFieldRegistration,
} from "./context/InlineFieldsRegistry";
import { useFormRecordLoad, useFormRecordSave } from "./utils/useFormRecord";

export type ResourceFormProps<T extends FieldValues> = {
  resource: string;
  title: string;
  listPath: string;
  children: ReactNode;
  defaultValues?: Partial<T>;
  onSaved?: (record: T) => void;
  stayOnPage?: boolean;
  /** Permission strings for create vs edit. Omit to allow all (demos only). */
  permissions?: Pick<ResourcePermissions, "add" | "change">;
};

/**
 * Create/edit page — standard react-hook-form under the hood.
 *
 * Load: one `getOne` → `form.reset(record)` (nested inline arrays included).
 * Save: one `create` or `update` with parent fields + nested inline rows.
 */
export function ResourceForm<T extends FieldValues & { id?: unknown }>({
  resource,
  title,
  listPath,
  children,
  defaultValues,
  onSaved,
  stayOnPage,
  permissions,
}: ResourceFormProps<T>) {
  const { id } = useParams();
  const isNew = id === "new" || !id;
  const dp = useDataProvider();
  const can = usePermissions();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { token } = theme.useToken();
  const payloadFieldsRef = useRef(new Set<string>());
  const inlineRegistryRef = useRef(new Map<string, InlineFieldRegistration>());

  const form = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const { loading, formVersion } = useFormRecordLoad({
    dp,
    resource,
    id,
    isNew,
    form,
    message,
    defaultValues,
  });

  const onSubmit = useFormRecordSave({
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
  });

  useEffect(() => {
    if (!permissions) return;
    const slot = isNew ? "add" : "change";
    if (!checkResourcePermission(can, permissions, slot)) {
      navigate(listPath, { replace: true });
    }
  }, [permissions, isNew, can, navigate, listPath]);

  const canSave = permissions
    ? checkResourcePermission(can, permissions, isNew ? "add" : "change")
    : true;

  return (
    <Card
      title={
        <Space>
          <Link to={listPath} style={{ color: token.colorText }}>
            <ArrowLeftOutlined /> Back
          </Link>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
        </Space>
      }
    >
      <FormMetaProvider resource={resource} isNew={isNew}>
        <PayloadFieldsProvider fieldsRef={payloadFieldsRef}>
          <InlineFieldsRegistryProvider registryRef={inlineRegistryRef}>
            <div style={{ position: "relative" }}>
              {loading ? (
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
                  onFinish={() => void form.handleSubmit(onSubmit)()}
                  style={{
                    opacity: loading ? 0.4 : 1,
                    pointerEvents: loading ? "none" : undefined,
                  }}
                >
                  {children}
                  <Form.Item style={{ marginTop: 16 }}>
                    <Space>
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={loading || !canSave}
                      >
                        Save
                      </Button>
                      <Link to={listPath}>
                        <Button disabled={loading}>Cancel</Button>
                      </Link>
                    </Space>
                  </Form.Item>
                </Form>
              </FormProvider>
            </div>
          </InlineFieldsRegistryProvider>
        </PayloadFieldsProvider>
      </FormMetaProvider>
    </Card>
  );
}
