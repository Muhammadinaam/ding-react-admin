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
import { SubmitFieldsProvider } from "./context/SubmitFieldsContext";
import {
  useResourceFormLoad,
  useResourceFormSubmit,
  type ResourceFormInlineConfig,
} from "./utils/useResourceFormData";

export type { ResourceFormInlineConfig };

export type ResourceFormProps<T extends FieldValues> = {
  resource: string;
  title: string;
  listPath: string;
  children: ReactNode;
  defaultValues?: Partial<T>;
  onSaved?: (record: T) => void;
  stayOnPage?: boolean;
  inlines?: ResourceFormInlineConfig[];
  /** Permission strings for create vs edit. Omit to allow all (demos only). */
  permissions?: Pick<ResourcePermissions, "add" | "change">;
};

/**
 * Create/edit page shell around react-hook-form.
 *
 * Flow:
 * 1. Load — edit: getOne(parent) + loadInlineRows → form.reset (see useResourceFormLoad)
 * 2. Edit — children render fields; useSubmitField tracks sources for the API payload
 * 3. Save — pickBySources → create/update parent → saveInlineRows (see useResourceFormSubmit)
 */
export function ResourceForm<T extends FieldValues & { id?: unknown }>({
  resource,
  title,
  listPath,
  children,
  defaultValues,
  onSaved,
  stayOnPage,
  inlines,
  permissions,
}: ResourceFormProps<T>) {
  const { id } = useParams();
  const isNew = id === "new" || !id;
  const dp = useDataProvider();
  const can = usePermissions();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { token } = theme.useToken();
  const submitFieldsRef = useRef(new Set<string>());

  const form = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const { loading, formVersion, existingInlineIds } = useResourceFormLoad({
    dp,
    resource,
    id,
    isNew,
    form,
    message,
    defaultValues,
    inlines,
  });

  const onSubmit = useResourceFormSubmit({
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
        <SubmitFieldsProvider fieldsRef={submitFieldsRef}>
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
            {/* formVersion remounts RHF after load so inline field arrays bind correctly */}
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
        </SubmitFieldsProvider>
      </FormMetaProvider>
    </Card>
  );
}
