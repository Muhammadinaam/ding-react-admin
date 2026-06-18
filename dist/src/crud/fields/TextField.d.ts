import { CSSProperties } from 'react';
import { BaseSourceProps, FieldRules } from '../types';
export type TextFieldProps = BaseSourceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    placeholder?: string;
    inputStyle?: CSSProperties;
    hideLabel?: boolean;
};
export declare function TextField({ source, name, label, required, rules, placeholder, inputStyle, hideLabel, }: TextFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TextField.d.ts.map