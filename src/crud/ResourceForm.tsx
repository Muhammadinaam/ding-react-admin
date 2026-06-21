import { ArrowLeftOutlined } from "@ant-design/icons";
import { Card, Space, Typography, theme } from "antd";
import { type FieldValues } from "react-hook-form";
import { useEffect, type ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePermissions } from "../context/PermissionsProvider";
import type { ResourcePermissions } from "../permissions/resourcePermissions";
import { checkResourcePermission } from "../permissions/resourcePermissions";
import { ResourceRecordForm } from "./ResourceRecordForm";

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
 * Create/edit page — Card chrome around {@link ResourceRecordForm}.
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
  const can = usePermissions();
  const navigate = useNavigate();
  const { token } = theme.useToken();

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
      <ResourceRecordForm<T>
        resource={resource}
        id={id}
        defaultValues={defaultValues}
        canSave={canSave}
        cancelHref={listPath}
        onCancel={() => navigate(listPath)}
        onSuccess={(saved) => {
          onSaved?.(saved);
          if (!stayOnPage) navigate(listPath);
        }}
      >
        {children}
      </ResourceRecordForm>
    </Card>
  );
}
