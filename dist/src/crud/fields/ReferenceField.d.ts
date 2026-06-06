import { CSSProperties } from 'react';
import { BaseSourceProps, ChoiceOption, FieldRules, InlineFieldOptions, ReferenceProps } from '../types';
export type ReferenceFieldProps = BaseSourceProps & ReferenceProps & InlineFieldOptions & {
    required?: boolean;
    rules?: FieldRules;
    search?: boolean;
    allowClear?: boolean;
    disabled?: boolean;
    /** Applied to the underlying Select / input control. */
    inputStyle?: CSSProperties;
    /** Called after the value changes (e.g. to update dependent fields). */
    onValueChange?: (value: unknown, option: ChoiceOption | undefined, meta: {
        name?: string;
        index?: number;
    }) => void;
};
export declare function ReferenceField({ source, label, reference, choices, optionLabel, optionValue, required, rules, search, allowClear, disabled: disabledProp, width: inlineWidth, minWidth: inlineMinWidth, inputStyle, onValueChange, }: ReferenceFieldProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=ReferenceField.d.ts.map