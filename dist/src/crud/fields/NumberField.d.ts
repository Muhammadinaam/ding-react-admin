import { CSSProperties } from 'react';
import { BaseSourceProps, FieldRules, InlineFieldOptions } from '../types';
export type NumberFieldProps = BaseSourceProps & InlineFieldOptions & {
    required?: boolean;
    rules?: FieldRules;
    min?: number;
    max?: number;
    step?: number;
    inputStyle?: CSSProperties;
};
export declare function NumberField({ source, label, required, rules, min, max, step, width: inlineWidth, minWidth: inlineMinWidth, inputStyle, }: NumberFieldProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=NumberField.d.ts.map