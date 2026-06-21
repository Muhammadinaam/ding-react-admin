import { FieldValues } from 'react-hook-form';
import { ReactNode } from 'react';
export type ResourceRecordFormProps<T extends FieldValues & {
    id?: unknown;
}> = {
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
export declare function ResourceRecordForm<T extends FieldValues & {
    id?: unknown;
}>({ resource, id, children, defaultValues, enabled, canSave, onCancel, cancelHref, onSuccess, loadingMode, }: ResourceRecordFormProps<T>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ResourceRecordForm.d.ts.map