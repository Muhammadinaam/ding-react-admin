import { BaseSourceProps, FieldRules } from '../types';
export type DateFieldProps = BaseSourceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    showTime?: boolean;
    hideLabel?: boolean;
};
export declare function DateField({ source, name, label, required, rules, showTime, hideLabel, }: DateFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=DateField.d.ts.map