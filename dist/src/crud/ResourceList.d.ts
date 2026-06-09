import { ReactNode } from 'react';
import { ResourcePermissions } from '../permissions/resourcePermissions';
import { EditMode, ResourceListBuiltInActions, ResourceListBulkAction, ResourceListRowActionsHelpers } from './types';
type ResourceListContextValue = {
    filterValues: Record<string, unknown>;
    setFilterValue: (source: string, value: unknown) => void;
};
export declare function useResourceListContext(): ResourceListContextValue | null;
export type ResourceListProps = {
    resource: string;
    title: string;
    pathPrefix: string;
    newPath?: string;
    /** Merged into every list request (not synced to URL). */
    staticFilter?: Record<string, unknown>;
    editMode?: EditMode;
    syncQueryParams?: boolean;
    children: ReactNode;
    /** Form fields rendered inside create/edit modal. */
    formChildren?: ReactNode;
    /** Show/hide built-in Edit, Quick edit, and Delete actions (permissions still apply). */
    actions?: ResourceListBuiltInActions;
    /** Extra row actions rendered after built-in ones in the Actions column. */
    rowActions?: (row: Record<string, unknown>, helpers: ResourceListRowActionsHelpers) => ReactNode;
    /** Extra card header content, rendered before New / New page buttons. */
    headerExtra?: ReactNode;
    /** Extra bulk actions in the Django-style action bar (appended after built-ins). */
    bulkActions?: ResourceListBulkAction[];
    /** Show built-in "Delete selected" when user has delete permission. Default true. */
    bulkDelete?: boolean;
    /** Set false to hide row checkboxes and the bulk action bar. Default true. */
    bulkActionsEnabled?: boolean;
    /** Permission strings for built-in actions. Omit to allow all (demos only). */
    permissions?: ResourcePermissions;
};
export declare function ResourceList({ resource, title, pathPrefix, newPath, staticFilter, editMode, syncQueryParams, children, formChildren, actions, rowActions, headerExtra, bulkActions, bulkDelete, bulkActionsEnabled, permissions, }: ResourceListProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ResourceList.d.ts.map