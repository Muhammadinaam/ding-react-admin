import { BaseSourceProps, FieldRules } from '../types';
export type PasswordFieldProps = BaseSourceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    /** When set, renders a second field and validates it matches `source`. */
    confirmSource?: string;
    confirmLabel?: string;
    autoComplete?: string;
    hideLabel?: boolean;
};
export declare function PasswordField({ source, name, label, required, rules, confirmSource, confirmLabel, autoComplete, hideLabel, }: PasswordFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=PasswordField.d.ts.map