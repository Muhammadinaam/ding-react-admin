import { BaseSourceProps, FieldRules } from '../types';
export type DateFieldProps = BaseSourceProps & {
    required?: boolean;
    rules?: FieldRules;
    showTime?: boolean;
};
export declare function DateField({ source, label, required, rules, showTime, }: DateFieldProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=DateField.d.ts.map