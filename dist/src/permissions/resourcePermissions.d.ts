import { PermissionsChecker } from '../context/PermissionsProvider';
/** Opaque permission strings per CRUD action (values come from your backend). */
export type ResourcePermissions = {
    /** List page, nav, route guard */
    list?: string;
    /** getOne — falls back to `list` when omitted */
    read?: string;
    /** New button, create modal, POST */
    add?: string;
    /** Edit / Quick edit, PATCH/PUT */
    change?: string;
    /** Row delete, bulk delete */
    delete?: string;
};
export type ResourcePermissionSlot = keyof ResourcePermissions;
/** When `permissions` is omitted, allow. When provided, missing slot → deny. */
export declare function checkResourcePermission(can: PermissionsChecker, permissions: ResourcePermissions | undefined, slot: ResourcePermissionSlot): boolean;
export declare function filterNavByPermission<T extends {
    permission?: string;
    children?: T[];
}>(items: T[], can: PermissionsChecker): T[];
//# sourceMappingURL=resourcePermissions.d.ts.map