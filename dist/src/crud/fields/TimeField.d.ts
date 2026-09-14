import { FieldSourceProps, FieldRules } from '../types';
export type TimeFieldProps = FieldSourceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    hideLabel?: boolean;
    /** Output / display format. Default `HH:mm:ss` (Django TimeField). */
    format?: string;
};
export declare function TimeField({ source, name, label, required, rules, hideLabel, hidden, format, }: TimeFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TimeField.d.ts.map