import { FieldValues } from 'react-hook-form';
import { ReactNode } from 'react';
import { InlineFormSetProps } from './InlineFormSet';
export type ResourceFormInlineConfig = Pick<InlineFormSetProps, "resource" | "foreignKey" | "name">;
export type ResourceFormProps<T extends FieldValues> = {
    resource: string;
    title: string;
    listPath: string;
    children: ReactNode;
    defaultValues?: Partial<T>;
    onSaved?: (record: T) => void;
    stayOnPage?: boolean;
    inlines?: ResourceFormInlineConfig[];
};
export declare function ResourceForm<T extends FieldValues & {
    id?: unknown;
}>({ resource, title, listPath, children, defaultValues, onSaved, stayOnPage, inlines, }: ResourceFormProps<T>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ResourceForm.d.ts.map