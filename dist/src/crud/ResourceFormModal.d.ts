import { FieldValues } from 'react-hook-form';
import { ReactNode } from 'react';
import { ResourcePermissions } from '../permissions/resourcePermissions';
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
export declare function ResourceFormModal({ resource, editId, onClose, children, title, permissions, defaultValues, width, onSuccess, }: ResourceFormModalProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ResourceFormModal.d.ts.map