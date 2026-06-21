import { Modal } from "antd";
import { type FieldValues } from "react-hook-form";
import { type ReactNode } from "react";
import { ResourceRecordForm } from "./ResourceRecordForm";

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
  const isNew = editId === "new";
  const open = editId != null;

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
      <ResourceRecordForm<FieldValues>
        resource={resource}
        id={editId ?? undefined}
        enabled={open}
        loadingMode="replace"
        onCancel={onClose}
        onSuccess={() => onClose()}
      >
        {children}
      </ResourceRecordForm>
    </Modal>
  );
}
