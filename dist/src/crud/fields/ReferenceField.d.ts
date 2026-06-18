import { CSSProperties } from 'react';
import { BaseSourceProps, ChoiceOption, FieldRules, ReferenceProps } from '../types';
export type ReferenceFieldProps = BaseSourceProps & ReferenceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    search?: boolean;
    allowClear?: boolean;
    disabled?: boolean;
    hideLabel?: boolean;
    /** Applied to the underlying Select / input control. */
    inputStyle?: CSSProperties;
    /** Called after the value changes (e.g. to update dependent fields). */
    onValueChange?: (value: unknown, option: ChoiceOption | undefined, meta: {
        name: string;
    }) => void;
};
export declare function ReferenceField({ source, name, label, reference, choices, optionLabel, optionValue, required, rules, search, allowClear, disabled: disabledProp, hideLabel, inputStyle, onValueChange, }: ReferenceFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ReferenceField.d.ts.map