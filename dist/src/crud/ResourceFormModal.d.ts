import { ReactNode } from 'react';
export type ResourceFormModalProps = {
    resource: string;
    editId: string | null;
    onClose: () => void;
    children: ReactNode;
    title?: string;
};
export declare function ResourceFormModal({ resource, editId, onClose, children, title, }: ResourceFormModalProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ResourceFormModal.d.ts.map