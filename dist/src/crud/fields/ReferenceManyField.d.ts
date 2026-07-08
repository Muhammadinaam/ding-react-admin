import { BaseSourceProps, FieldRules, ReferenceProps } from '../types';
import { ResourcePermissions } from '../../permissions/resourcePermissions';
import { ReactNode } from 'react';
export type ReferenceManyFieldProps = BaseSourceProps & ReferenceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    search?: boolean;
    allowClear?: boolean;
    hideLabel?: boolean;
    disabled?: boolean;
    referenceForm?: ReactNode;
    referencePermissions?: ResourcePermissions;
    referenceTitle?: string;
    referenceDefaultValues?: Record<string, unknown>;
    referenceModalWidth?: number;
    /** When false, hide add button even if catalog defines a form. Default true. */
    referenceActions?: boolean;
    popupMatchSelectWidth?: boolean | number;
    popupMinWidth?: number;
};
export declare function ReferenceManyField({ source, name, label, reference, choices, optionLabel, optionValue, required, rules, search, allowClear, hideLabel, disabled: disabledProp, lazy, recordSource, fetchSelected, referenceForm, referencePermissions, referenceTitle, referenceDefaultValues, referenceModalWidth, referenceActions, popupMatchSelectWidth, popupMinWidth, }: ReferenceManyFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ReferenceManyField.d.ts.map