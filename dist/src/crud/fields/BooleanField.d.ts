import { BaseSourceProps, FieldRules } from '../types';
export type BooleanFieldProps = BaseSourceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    hideLabel?: boolean;
    disabled?: boolean;
};
export declare function BooleanField({ source, name, label, required, rules, hideLabel, disabled: disabledProp, }: BooleanFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=BooleanField.d.ts.map