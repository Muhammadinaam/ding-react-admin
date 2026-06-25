import { Modal } from "antd";
import { type FieldValues } from "react-hook-form";
import { type ReactNode } from "react";
import { usePermissions } from "../context/PermissionsProvider";
import {
  checkResourcePermission,
  type ResourcePermissions,
} from "../permissions/resourcePermissions";
import { ResourceRecordForm } from "./ResourceRecordForm";

export type ResourceFormModalProps = {
  resource: string;
  editId: string | null;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  permissions?: Pick<ResourcePermissions, "add" | "change">;
  defaultValues?: Partial<FieldValues>;
  width?: number;
  onSuccess?: (record: FieldValues) => void;
};

export function ResourceFormModal({
  resource,
  editId,
  onClose,
  children,
  title,
  permissions,
  defaultValues,
  width = 560,
  onSuccess,
}: ResourceFormModalProps) {
  const isNew = editId === "new";
  const open = editId != null;
  const can = usePermissions();

  const modalTitle =
    title ?? (isNew ? `New ${resource}` : `Edit ${resource}`);

  const canSave = permissions
    ? checkResourcePermission(can, permissions, isNew ? "add" : "change")
    : true;

  return (
    <Modal
      open={open}
      title={modalTitle}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      width={width}
    >
      <ResourceRecordForm<FieldValues>
        resource={resource}
        id={editId ?? undefined}
        enabled={open}
        loadingMode="replace"
        defaultValues={defaultValues}
        canSave={canSave}
        onCancel={onClose}
        onSuccess={(record) => {
          onSuccess?.(record);
          if (!onSuccess) onClose();
        }}
      >
        {children}
      </ResourceRecordForm>
    </Modal>
  );
}
