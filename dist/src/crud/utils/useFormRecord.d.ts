import { MessageInstance } from 'antd/es/message/interface';
import { MutableRefObject } from 'react';
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
    /** When false, skip loading (e.g. modal closed). Defaults to true. */
    enabled?: boolean;
};
/** Edit mode: `getOne` → `form.reset` → bump `formVersion` so field arrays remount. */
export declare function useFormRecordLoad<T extends FieldValues>({ dp, resource, id, isNew, form, message, defaultValues, enabled, }: LoadOptions<T>): {
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
    payloadFieldsRef: MutableRefObject<Set<string>>;
    inlineRegistryRef: MutableRefObject<Map<string, InlineFieldRegistration>>;
    setGlobalErrors: (errors: string[]) => void;
    onSuccess?: (record: T) => void;
};
/** Save: `buildFormPayload` → clean inline rows → one `create` or `update`. */
export declare function useFormRecordSave<T extends FieldValues & {
    id?: unknown;
}>({ dp, resource, id, isNew, form, message, payloadFieldsRef, inlineRegistryRef, setGlobalErrors, onSuccess, }: SubmitOptions<T>): {
    onSubmit: (values: T) => Promise<void>;
    saving: boolean;
};
export {};
//# sourceMappingURL=useFormRecord.d.ts.map