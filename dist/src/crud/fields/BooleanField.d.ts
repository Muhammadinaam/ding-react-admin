import { FieldSourceProps, FieldRules } from '../types';
export type BooleanFieldProps = FieldSourceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    hideLabel?: boolean;
    disabled?: boolean;
};
export declare function BooleanField({ source, name, label, required, rules, hideLabel, hidden, disabled: disabledProp, }: BooleanFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=BooleanField.d.ts.map