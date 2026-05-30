# ding-react-admin

Composable admin shell for React apps: **Ant Design** layout, **CRUD field system** (lists, forms, filters, inlines, bulk actions), **theme/density** controls, **session-style auth** helpers, **data / permissions providers** (react-admin–style naming, intentionally small), and **React Router** helpers.

Prefer **`createBrowserRouter` in your app** with **`AdminLayout`**, `Protected`, and `GuestOnly` (see `examples/playground/src/main.tsx`) when you need full control. Use **`<AdminApp />`** or **`createAdminRouter`** for a declarative route list with **`access`** (`protected` / `guest` / `public`) — see [docs/routing.md](docs/routing.md).

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
| Quick start (`<AdminApp />`) | [docs/quick-start.md](docs/quick-start.md) |
| Composition (your own router) | [docs/composition.md](docs/composition.md) |
| Odoo-style app hub | [docs/app-hub.md](docs/app-hub.md) |
| `createAdminRouter` shortcut | [docs/admin-router.md](docs/admin-router.md) |
| Developing next to your app (Vite) | [docs/developing.md](docs/developing.md) |

## License

MIT
