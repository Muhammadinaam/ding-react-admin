import { FieldValues } from 'react-hook-form';
import { ReactNode } from 'react';
import { ResourcePermissions } from '../permissions/resourcePermissions';
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
export declare function ResourceForm<T extends FieldValues & {
    id?: unknown;
}>({ resource, title, listPath, children, defaultValues, onSaved, stayOnPage, permissions, }: ResourceFormProps<T>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ResourceForm.d.ts.map