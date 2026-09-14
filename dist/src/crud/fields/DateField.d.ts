import { FieldSourceProps, FieldRules } from '../types';
export type DateFieldProps = FieldSourceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    showTime?: boolean;
    hideLabel?: boolean;
};
export declare function DateField({ source, name, label, required, rules, showTime, hideLabel, hidden, }: DateFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=DateField.d.ts.map