import { CSSProperties, ReactNode } from 'react';
import { BaseSourceProps, ChoiceOption, FieldRules, ReferenceProps } from '../types';
import { ResourcePermissions } from '../../permissions/resourcePermissions';
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
    /** Form fields shown in the add/edit modal. Omit to hide action buttons. */
    referenceForm?: ReactNode;
    /** Permissions for add/edit buttons (`add` and `change` slots). */
    referencePermissions?: ResourcePermissions;
    referenceTitle?: string;
    referenceDefaultValues?: Record<string, unknown>;
    referenceModalWidth?: number;
    /** When false, hide add/edit buttons. Default true when `referenceForm` is set. */
    referenceActions?: boolean;
};
export declare function ReferenceField({ source, name, label, reference, choices, optionLabel, optionValue, required, rules, search, allowClear, disabled: disabledProp, hideLabel, inputStyle, onValueChange, lazy, recordSource, fetchSelected, referenceForm, referencePermissions, referenceTitle, referenceDefaultValues, referenceModalWidth, referenceActions, }: ReferenceFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ReferenceField.d.ts.map