import { BaseSourceProps, FieldRules } from '../types';
export type FileFieldProps = BaseSourceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    hideLabel?: boolean;
    /** Allow clearing an existing or newly selected file. */
    clearable?: boolean;
    accept?: string;
};
export declare function FileField({ source, name, label, required, rules, hideLabel, clearable, accept, }: FileFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FileField.d.ts.map