import { CSSProperties } from 'react';
import { FieldSourceProps, FieldRules } from '../types';
export type TextFieldProps = FieldSourceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    placeholder?: string;
    inputStyle?: CSSProperties;
    hideLabel?: boolean;
};
export declare function TextField({ source, name, label, required, rules, placeholder, inputStyle, hideLabel, hidden, }: TextFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TextField.d.ts.map