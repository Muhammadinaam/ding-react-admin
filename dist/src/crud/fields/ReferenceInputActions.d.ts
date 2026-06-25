import { ReactNode } from 'react';
import { ResourcePermissions } from '../../permissions/resourcePermissions';
export type ReferenceInputActionsProps = {
    reference?: string;
    referenceForm?: ReactNode;
    referencePermissions?: ResourcePermissions;
    referenceTitle?: string;
    referenceDefaultValues?: Record<string, unknown>;
    referenceModalWidth?: number;
    selectedId?: unknown;
    disabled?: boolean;
    onCreated?: (record: Record<string, unknown>) => void;
    onUpdated?: (record: Record<string, unknown>) => void;
};
export declare function ReferenceInputActions({ reference, referenceForm, referencePermissions, referenceTitle, referenceDefaultValues, referenceModalWidth, selectedId, disabled, onCreated, onUpdated, }: ReferenceInputActionsProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=ReferenceInputActions.d.ts.map