import { BaseSourceProps, FieldRules, ReferenceProps } from '../types';
export type ReferenceManyFieldProps = BaseSourceProps & ReferenceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    search?: boolean;
    allowClear?: boolean;
    hideLabel?: boolean;
};
export declare function ReferenceManyField({ source, name, label, reference, choices, optionLabel, optionValue, required, rules, search, allowClear, hideLabel, }: ReferenceManyFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ReferenceManyField.d.ts.map