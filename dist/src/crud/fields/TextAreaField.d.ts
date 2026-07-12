import { CSSProperties } from 'react';
import { BaseSourceProps, FieldRules } from '../types';
export type TextAreaFieldProps = BaseSourceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    placeholder?: string;
    inputStyle?: CSSProperties;
    hideLabel?: boolean;
    rows?: number;
    maxLength?: number;
    showCount?: boolean;
    autoSize?: boolean | {
        minRows?: number;
        maxRows?: number;
    };
};
export declare function TextAreaField({ source, name, label, required, rules, placeholder, inputStyle, hideLabel, rows, maxLength, showCount, autoSize, }: TextAreaFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TextAreaField.d.ts.map