import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { useState, type ReactNode } from "react";
import { usePermissions } from "../../context/PermissionsProvider";
import {
  checkResourcePermission,
  type ResourcePermissions,
} from "../../permissions/resourcePermissions";
import { ResourceFormModal } from "../ResourceFormModal";

export type ReferenceInputActionsProps = {
  reference?: string;
  referenceForm?: ReactNode;
  referencePermissions?: ResourcePermissions;
  referenceTitle?: string;
  referenceDefaultValues?: Record<string, unknown>;
  referenceModalWidth?: number;
  selectedId?: unknown;
  disabled?: boolean;
  onCreated?: (record: Record<string, unknown>) => void;
  onUpdated?: (record: Record<string, unknown>) => void;
};

export function ReferenceInputActions({
  reference,
  referenceForm,
  referencePermissions,
  referenceTitle,
  referenceDefaultValues,
  referenceModalWidth,
  selectedId,
  disabled,
  onCreated,
  onUpdated,
}: ReferenceInputActionsProps) {
  const can = usePermissions();
  const title = referenceTitle ?? reference;

  const canAdd =
    Boolean(reference && referenceForm) &&
    checkResourcePermission(can, referencePermissions, "add");
  const canEdit =
    Boolean(
      reference && referenceForm && selectedId != null && selectedId !== "",
    ) && checkResourcePermission(can, referencePermissions, "change");

  const [editId, setEditId] = useState<string | null>(null);

  if (!canAdd && !canEdit) return null;

  const closeModal = () => setEditId(null);

  return (
    <>
      <Space size={4}>
        {canAdd ? (
          <Tooltip title={`Add ${title ?? "record"}`}>
            <Button
              type="default"
              icon={<PlusOutlined />}
              disabled={disabled}
              aria-label={`Add ${title ?? "record"}`}
              onClick={() => setEditId("new")}
            />
          </Tooltip>
        ) : null}
        {canEdit ? (
          <Tooltip title={`Edit ${title ?? "record"}`}>
            <Button
              type="default"
              icon={<EditOutlined />}
              disabled={disabled}
              aria-label={`Edit ${title ?? "record"}`}
              onClick={() => setEditId(String(selectedId))}
            />
          </Tooltip>
        ) : null}
      </Space>
      {reference && referenceForm && editId != null ? (
        <ResourceFormModal
          resource={reference}
          editId={editId}
          onClose={closeModal}
          title={
            editId === "new"
              ? `New ${title ?? reference}`
              : `Edit ${title ?? reference}`
          }
          permissions={referencePermissions}
          defaultValues={editId === "new" ? referenceDefaultValues : undefined}
          width={referenceModalWidth}
          onSuccess={(record) => {
            const row = record as Record<string, unknown>;
            if (editId === "new") {
              onCreated?.(row);
            } else {
              onUpdated?.(row);
            }
          }}
        >
          {referenceForm}
        </ResourceFormModal>
      ) : null}
    </>
  );
}
