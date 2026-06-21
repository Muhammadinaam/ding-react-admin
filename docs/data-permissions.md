# Data layer & permissions

- **`DataProvider` / `useDataProvider`** — supply CRUD handlers via `combineResourceHandlers`.
- **`PermissionsProvider` / `usePermissions` / `useCan`** — check opaque permission **strings** from your backend.

**Full walkthrough:** [tutorial-one-entity.md](tutorial-one-entity.md) — Steps 15–20 (Part 1B).

## Quick setup

After login, your backend returns `user.permissions: string[]`. The library does **not** parse format — Django (`main.view_user`), .NET (`Users.Read`), Node (`users:read`), all work the same.

### Account menu label

`AdminLayout` shows the logged-in user in the top-right account button. Implement optional **`getUserLabel`** on your **`AuthAdapter`** — return a display string (name, username, email). When omitted or when it returns `null`, the label defaults to `"User"`.

```tsx
import { createPermissionsChecker, PermissionsProvider } from "ding-react-admin";
import { getUser } from "./api-client";

const can = createPermissionsChecker(() => getUser()?.permissions);

export function createAuthAdapter(): AuthAdapter {
  return {
    // login, logout, getToken …
    getUserLabel() {
      const user = getUser();
      if (!user) return null;
      const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");
      return fullName || user.username || user.email || null;
    },
  };
}
```

`getUserLabel` is read on mount (page refresh), after login, and after logout — keep it in sync with wherever you store the user (same as permissions).

## Quick setup

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
  { can, parseFormError }, // optional — maps API errors to form fields
);
```

Optional **`parseFormError`** on the data provider maps save validation errors to form field paths. Built-in helpers: `parseDjangoDRFFormErrors`, `parseDotNetFormErrors`, `parseNodeFormErrors`. Error bodies are resolved from fetch, axios, and OpenAPI client shapes automatically on save. See [tutorial-one-entity.md](tutorial-one-entity.md#section-d--form-validation-errors) and [form-validation-errors.md](form-validation-errors.md).

[← Back to README](../README.md)
