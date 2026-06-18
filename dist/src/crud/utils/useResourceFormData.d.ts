import { MessageInstance } from 'antd/es/message/interface';
import { MutableRefObject } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { DataProvider } from '../../data/dataProviderTypes';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { InlineFormSetProps } from '../InlineFormSet';
export type ResourceFormInlineConfig = Pick<InlineFormSetProps, "resource" | "foreignKey" | "name">;
export declare function resolveInlineArrayName(config: ResourceFormInlineConfig): string;
type LoadOptions<T extends FieldValues> = {
    dp: DataProvider;
    resource: string;
    id: string | undefined;
    isNew: boolean;
    form: UseFormReturn<T>;
    message: MessageInstance;
    defaultValues?: Partial<T>;
    inlines?: ResourceFormInlineConfig[];
};
/** Edit mode: fetch parent (+ inline rows) → form.reset → bump formVersion for field arrays. */
export declare function useResourceFormLoad<T extends FieldValues>({ dp, resource, id, isNew, form, message, defaultValues, inlines, }: LoadOptions<T>): {
    loading: boolean;
    formVersion: number;
    existingInlineIds: Record<string, (string | number)[]>;
};
type SubmitOptions<T extends FieldValues & {
    id?: unknown;
}> = {
    dp: DataProvider;
    resource: string;
    id: string | undefined;
    isNew: boolean;
    form: UseFormReturn<T>;
    message: MessageInstance;
    navigate: NavigateFunction;
    listPath: string;
    submitFieldsRef: MutableRefObject<Set<string>>;
    inlines?: ResourceFormInlineConfig[];
    existingInlineIds: Record<string, (string | number)[]>;
    onSaved?: (record: T) => void;
    stayOnPage?: boolean;
};
/** Save: pickBySources → create/update parent → saveInlineRows for each inline config. */
export declare function useResourceFormSubmit<T extends FieldValues & {
    id?: unknown;
}>({ dp, resource, id, isNew, form, message, navigate, listPath, submitFieldsRef, inlines, existingInlineIds, onSaved, stayOnPage, }: SubmitOptions<T>): (values: T) => Promise<void>;
export {};
//# sourceMappingURL=useResourceFormData.d.ts.map