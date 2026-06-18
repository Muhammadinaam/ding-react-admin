import { FieldValues } from 'react-hook-form';
import { ReactNode } from 'react';
import { ResourcePermissions } from '../permissions/resourcePermissions';
import { ResourceFormInlineConfig } from './utils/useResourceFormData';
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
export declare function ResourceForm<T extends FieldValues & {
    id?: unknown;
}>({ resource, title, listPath, children, defaultValues, onSaved, stayOnPage, inlines, permissions, }: ResourceFormProps<T>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ResourceForm.d.ts.map