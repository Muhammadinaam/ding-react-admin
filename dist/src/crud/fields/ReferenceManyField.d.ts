import { BaseSourceProps, FieldRules, ReferenceProps } from '../types';
export type ReferenceManyFieldProps = BaseSourceProps & ReferenceProps & {
    required?: boolean;
    rules?: FieldRules;
    search?: boolean;
    allowClear?: boolean;
};
export declare function ReferenceManyField({ source, label, reference, choices, optionLabel, optionValue, required, rules, search, allowClear, }: ReferenceManyFieldProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=ReferenceManyField.d.ts.map