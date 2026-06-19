import { MessageInstance } from 'antd/es/message/interface';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { DataProvider, ParseFormErrorContext } from '../../data/dataProviderTypes';
export declare function applyFormErrors<T extends FieldValues>(form: UseFormReturn<T>, parsed: {
    fields?: Record<string, string | string[]>;
    global?: string | string[];
}, message: MessageInstance): void;
export declare function applyApiErrorsToForm<T extends FieldValues>(dp: DataProvider, form: UseFormReturn<T>, message: MessageInstance, error: unknown, context: ParseFormErrorContext): Promise<boolean>;
//# sourceMappingURL=formErrors.d.ts.map