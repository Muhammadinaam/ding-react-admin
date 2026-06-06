# ding-react-admin

Composable admin shell for React apps: **Ant Design** layout, **CRUD field system** (lists, forms, filters, inlines, bulk actions), **theme/density** controls, **`AuthProvider`** + **`useAuth`**, **data / permissions providers** (react-admin–style naming, intentionally small), and **React Router** helpers.

## Providers (manual composition)

Nothing is wired automatically except theme inside `<AdminApp />`. Wrap providers yourself:

| Provider | Required for |
|----------|----------------|
| **`AuthProvider`** | Login, logout, route guards (`Protected`, `GuestOnly`), `useAuth` |
| **`DataProvider`** | CRUD components (`ResourceList`, `ResourceForm`, …) |
| **`PermissionsProvider`** | Permission gating in CRUD (`usePermissions`, `useCan`) |

**Auth only** (custom pages, no CRUD yet):

```tsx
<AuthProvider adapter={createSessionStorageAuthAdapter()}>
  <AdminApp navItems={nav} routes={routes} />
</AuthProvider>
```

**Full stack** (CRUD + permissions) — see [docs/data-permissions.md](docs/data-permissions.md) and [`examples/playground/src/main.tsx`](examples/playground/src/main.tsx):

```tsx
<AuthProvider adapter={authAdapter}>
  <DataProvider value={dataProvider}>
    <PermissionsProvider can={permissions}>
      <AdminApp navItems={nav} routes={routes} />
    </PermissionsProvider>
  </DataProvider>
</AuthProvider>
```

Use **`createSessionStorageAuthAdapter`** for demos; replace with an adapter that calls your API in production.

## Getting started

**Quick path:** [docs/quick-start.md](docs/quick-start.md) — `<AuthProvider>` + `<AdminApp />` with declarative routes.

**Full control:** [docs/composition.md](docs/composition.md) and the [playground](examples/playground/src/main.tsx) — your own `createBrowserRouter` with `AdminLayout`, `Protected`, `GuestOnly`, `DataProvider`, and `PermissionsProvider`.

## Documentation

| Topic | Guide |
|-------|--------|
| Install & peer deps | [docs/install.md](docs/install.md) |
| Example playground app | [docs/example-app.md](docs/example-app.md) |
| Sidebar navigation | [docs/navigation.md](docs/navigation.md) |
| CRUD overview | [docs/crud/overview.md](docs/crud/overview.md) |
| List pages & filters | [docs/crud/list-pages.md](docs/crud/list-pages.md) |
| **Bulk actions** (Django-style) | [docs/crud/bulk-actions.md](docs/crud/bulk-actions.md) |
| Form pages | [docs/crud/forms.md](docs/crud/forms.md) |
| Reference / lookup fields | [docs/crud/references.md](docs/crud/references.md) |
| Inline nested forms | [docs/crud/inlines.md](docs/crud/inlines.md) |
| Custom field types | [docs/crud/custom-fields.md](docs/crud/custom-fields.md) |
| Data layer & permissions | [docs/data-permissions.md](docs/data-permissions.md) |
| **Routing & auth guards** | [docs/routing.md](docs/routing.md) |
| Login / register layout | [docs/auth-pages.md](docs/auth-pages.md) |
| Quick start (`<AdminApp />`) | [docs/quick-start.md](docs/quick-start.md) |
| Composition (your own router) | [docs/composition.md](docs/composition.md) |
| Odoo-style app hub | [docs/app-hub.md](docs/app-hub.md) |
| `createAdminRouter` shortcut | [docs/admin-router.md](docs/admin-router.md) |
| Developing next to your app (Vite) | [docs/developing.md](docs/developing.md) |

## License

MIT
