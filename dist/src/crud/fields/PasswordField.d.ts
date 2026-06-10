import { BaseSourceProps, FieldRules, InlineFieldOptions } from '../types';
export type PasswordFieldProps = BaseSourceProps & InlineFieldOptions & {
    required?: boolean;
    rules?: FieldRules;
    /** When set, renders a second field and validates it matches `source`. */
    confirmSource?: string;
    confirmLabel?: string;
    autoComplete?: string;
};
export declare function PasswordField({ source, label, required, rules, confirmSource, confirmLabel, autoComplete, width, minWidth, }: PasswordFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=PasswordField.d.ts.map