import { CSSProperties } from 'react';
import { BaseSourceProps, FieldRules } from '../types';
export type NumberFieldProps = BaseSourceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    min?: number;
    max?: number;
    step?: number;
    inputStyle?: CSSProperties;
    hideLabel?: boolean;
};
export declare function NumberField({ source, name, label, required, rules, min, max, step, inputStyle, hideLabel, }: NumberFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=NumberField.d.ts.map