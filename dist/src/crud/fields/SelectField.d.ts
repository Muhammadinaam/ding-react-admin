import { BaseSourceProps, ChoiceOption, FieldRules } from '../types';
export type SelectFieldProps = BaseSourceProps & {
    required?: boolean;
    rules?: FieldRules;
    choices: ChoiceOption[];
    mode?: "multiple";
    allowClear?: boolean;
};
export declare function SelectField({ source, label, required, rules, choices, mode, allowClear, }: SelectFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SelectField.d.ts.map