import type { PermissionsChecker } from "../context/PermissionsProvider";

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
export function checkResourcePermission(
  can: PermissionsChecker,
  permissions: ResourcePermissions | undefined,
  slot: ResourcePermissionSlot,
): boolean {
  if (!permissions) return true;
  let perm = permissions[slot];
  if (slot === "read" && !perm) perm = permissions.list;
  if (!perm) return false;
  return can(perm);
}

export function filterNavByPermission<T extends { permission?: string; children?: T[] }>(
  items: T[],
  can: PermissionsChecker,
): T[] {
  return items
    .map((item) => {
      if (item.children?.length) {
        const children = filterNavByPermission(item.children, can);
        if (children.length === 0) return null;
        return { ...item, children };
      }
      if (item.permission && !can(item.permission)) return null;
      return item;
    })
    .filter((item): item is T => item !== null);
}
