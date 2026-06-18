import { BaseSourceProps, ChoiceOption, FieldRules } from '../types';
export type SelectFieldProps = BaseSourceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    choices: ChoiceOption[];
    mode?: "multiple";
    allowClear?: boolean;
    hideLabel?: boolean;
};
export declare function SelectField({ source, name, label, required, rules, choices, mode, allowClear, hideLabel, }: SelectFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SelectField.d.ts.map