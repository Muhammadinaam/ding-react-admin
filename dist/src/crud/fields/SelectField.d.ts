import { FieldSourceProps, ChoiceOption, FieldRules } from '../types';
export type SelectFieldProps = FieldSourceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    choices: ChoiceOption[];
    mode?: "multiple";
    hideLabel?: boolean;
};
export declare function SelectField({ source, name, label, required, rules, choices, mode, hideLabel, hidden, }: SelectFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SelectField.d.ts.map