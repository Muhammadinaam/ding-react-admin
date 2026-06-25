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
    referenceForm?: ReactNode;
    referencePermissions?: ResourcePermissions;
    referenceTitle?: string;
    referenceDefaultValues?: Record<string, unknown>;
    referenceModalWidth?: number;
    /** When false, hide add button even if catalog defines a form. Default true. */
    referenceActions?: boolean;
};
export declare function ReferenceManyField({ source, name, label, reference, choices, optionLabel, optionValue, required, rules, search, allowClear, hideLabel, lazy, recordSource, fetchSelected, referenceForm, referencePermissions, referenceTitle, referenceDefaultValues, referenceModalWidth, referenceActions, }: ReferenceManyFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ReferenceManyField.d.ts.map