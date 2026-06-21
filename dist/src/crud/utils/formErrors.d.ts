import { FieldValues, UseFormReturn } from 'react-hook-form';
import { DataProvider, FormValidationErrors, ParseFormErrorContext } from '../../data/dataProviderTypes';
import { InlineFieldRegistration } from '../context/InlineFieldsRegistry';
export type ApplyApiErrorsResult = {
    handled: boolean;
    globalErrors: string[];
};
export type ApplyApiErrorsOptions = {
    payloadFields: Iterable<string>;
    inlineRegistry: Iterable<InlineFieldRegistration>;
};
/** Top-level `source` or inline cell path such as `lines.0.quantity`. */
export declare function isKnownFormFieldPath(path: string, payloadFields: Set<string>, inlineRegistry: Map<string, InlineFieldRegistration>): boolean;
export declare function partitionFormErrors(parsed: FormValidationErrors, payloadFields: Set<string>, inlineRegistry: Map<string, InlineFieldRegistration>): {
    fieldErrors: Record<string, string | string[]>;
    globalErrors: string[];
};
export declare function applyFormErrors<T extends FieldValues>(form: UseFormReturn<T>, fieldErrors: Record<string, string | string[]>): void;
export declare function applyApiErrorsToForm<T extends FieldValues>(dp: DataProvider, form: UseFormReturn<T>, error: unknown, context: ParseFormErrorContext, options: ApplyApiErrorsOptions): Promise<ApplyApiErrorsResult>;
//# sourceMappingURL=formErrors.d.ts.map