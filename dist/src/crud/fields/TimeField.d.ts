import { BaseSourceProps, FieldRules } from '../types';
export type TimeFieldProps = BaseSourceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    hideLabel?: boolean;
    /** Output / display format. Default `HH:mm:ss` (Django TimeField). */
    format?: string;
};
export declare function TimeField({ source, name, label, required, rules, hideLabel, format, }: TimeFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TimeField.d.ts.map