import { CSSProperties } from 'react';
import { BaseSourceProps, FieldRules, InlineFieldOptions } from '../types';
export type TextFieldProps = BaseSourceProps & InlineFieldOptions & {
    required?: boolean;
    rules?: FieldRules;
    placeholder?: string;
    inputStyle?: CSSProperties;
};
export declare function TextField({ source, label, required, rules, placeholder, width: inlineWidth, minWidth: inlineMinWidth, inputStyle, }: TextFieldProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=TextField.d.ts.map