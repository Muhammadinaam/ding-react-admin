import { MessageInstance } from 'antd/es/message/interface';
import { MutableRefObject } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { DataProvider } from '../../data/dataProviderTypes';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { InlineFieldRegistration } from '../context/InlineFieldsRegistry';
type LoadOptions<T extends FieldValues> = {
    dp: DataProvider;
    resource: string;
    id: string | undefined;
    isNew: boolean;
    form: UseFormReturn<T>;
    message: MessageInstance;
    defaultValues?: Partial<T>;
};
/** Edit mode: `getOne` → `form.reset` → bump `formVersion` so field arrays remount. */
export declare function useFormRecordLoad<T extends FieldValues>({ dp, resource, id, isNew, form, message, defaultValues, }: LoadOptions<T>): {
    loading: boolean;
    formVersion: number;
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
    payloadFieldsRef: MutableRefObject<Set<string>>;
    inlineRegistryRef: MutableRefObject<Map<string, InlineFieldRegistration>>;
    onSaved?: (record: T) => void;
    stayOnPage?: boolean;
};
/** Save: `buildFormPayload` → clean inline rows → one `create` or `update`. */
export declare function useFormRecordSave<T extends FieldValues & {
    id?: unknown;
}>({ dp, resource, id, isNew, form, message, navigate, listPath, payloadFieldsRef, inlineRegistryRef, onSaved, stayOnPage, }: SubmitOptions<T>): (values: T) => Promise<void>;
export {};
//# sourceMappingURL=useFormRecord.d.ts.map