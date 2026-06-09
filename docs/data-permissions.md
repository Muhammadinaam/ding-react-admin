# Data layer & permissions

- **`DataProvider` / `useDataProvider`** — supply CRUD handlers via `combineResourceHandlers`.
- **`PermissionsProvider` / `usePermissions` / `useCan`** — check opaque permission **strings** from your backend.

**Full walkthrough:** [tutorial-one-entity.md](tutorial-one-entity.md) — Steps 15–20 (Part 1B).

## Quick setup

After login, your backend returns `user.permissions: string[]`. The library does **not** parse format — Django (`main.view_user`), .NET (`Users.Read`), Node (`users:read`), all work the same.

```tsx
import { createPermissionsChecker, PermissionsProvider } from "ding-react-admin";
import { getUser } from "./api-client";

const can = createPermissionsChecker(() => getUser()?.permissions);

<PermissionsProvider can={can}>
  <AdminApp ... />
</PermissionsProvider>
```

## Per entity (4 strings in `userData.ts`)

```ts
export const USER_PERMS = {
  list: "users.read",
  add: "users.create",
  change: "users.update",
  delete: "users.delete",
};
```

| Slot | UI / API |
|------|----------|
| `list` | Sidebar, route guard, list page |
| `add` | New button, create form, POST |
| `change` | Edit / Quick edit, edit form, PATCH |
| `delete` | Delete row, bulk delete |

```tsx
<ResourceList permissions={{ add: USER_PERMS.add, change: USER_PERMS.change, delete: USER_PERMS.delete }} ... />
<ResourceForm permissions={{ add: USER_PERMS.add, change: USER_PERMS.change }} ... />
```

Nav: `{ path: "/users", label: "Users", permission: USER_PERMS.list }`

Routes: `<RequirePermission permission={USER_PERMS.list} redirect="/"><UserListPage /></RequirePermission>`

Data provider:

```ts
combineResourceHandlers(
  {
    users: {
      handlers: createUserHandlers(getApi),
      permissions: USER_PERMS,
    },
  },
  { can },
);
```

[← Back to README](../README.md)
