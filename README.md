# ding-react-admin

[![npm version](https://img.shields.io/npm/v/ding-react-admin.svg)](https://www.npmjs.com/package/ding-react-admin)
[![license](https://img.shields.io/npm/l/ding-react-admin.svg)](https://github.com/Muhammadinaam/ding-react-admin/blob/master/LICENSE)
[![build](https://img.shields.io/github/actions/workflow/status/Muhammadinaam/ding-react-admin/ci.yml?branch=master)](https://github.com/Muhammadinaam/ding-react-admin/actions/workflows/ci.yml)

Composable admin shell for React apps: **Ant Design 6** layout, **CRUD field system** (lists, forms, filters, inlines, bulk actions), **theme/density** controls, **`AuthProvider`** + **`useAuth`**, **data / permissions providers** (react-admin–style naming, intentionally small), and **React Router** helpers.

# -> Live demo

[![Open playground](https://img.shields.io/badge/Try%20it-playground-1677ff?style=for-the-badge)](https://muhammadinaam.github.io/ding-react-admin/)

# -> Tutorial

[Build an admin app and add a Users page](docs/tutorial-one-entity.md) — step-by-step from `yarn create vite` through CRUD and routes.

Interactive demo on GitHub Pages — sign in with **`admin` / `admin`** or **`user` / `user`**.

## Installation

```bash
npm install ding-react-admin antd @ant-design/icons dayjs react-hook-form react-router-dom
```

```bash
yarn add ding-react-admin antd @ant-design/icons dayjs react-hook-form react-router-dom
```

Peer dependency versions and setup notes: [docs/install.md](docs/install.md).

## Quick start

Wrap your app with `AuthProvider`, then render `AdminApp` with navigation and routes:

```tsx
import { AdminApp, AuthProvider, createSessionStorageAuthAdapter } from "ding-react-admin";

const navItems = [{ key: "home", label: "Home", path: "/" }];
const routes = [{ path: "/", element: <div>Welcome</div> }];

export function App() {
  return (
    <AuthProvider adapter={createSessionStorageAuthAdapter()}>
      <AdminApp navItems={navItems} routes={routes} />
    </AuthProvider>
  );
}
```

For CRUD pages, add `DataProvider` and `PermissionsProvider` — see [Getting started](#getting-started) and [docs/quick-start.md](docs/quick-start.md).

## Features

- **Declarative CRUD** — describe list and form pages in JSX; field `source` names map to your API
- **List tables** with column sorting, pagination, and URL-synced query state
- **Filters** — text, number, boolean, date, select, and reference lookups on list pages
- **Page forms** and **modal forms** (`ResourceForm`, `ResourceFormModal`) with shared create/edit logic
- **Tabbed forms** (`FormTabs`) and **stepped forms** (`FormSteps`) for long or wizard-style records
- **Reference / lookup fields** with inline **create** and **edit** actions in a modal
- **Inline nested rows** — tabular (`InlineFormSet`) and stacked layouts for related records
- **Bulk actions** — Django-style row selection and batch operations
- **Built-in fields** — text, number, boolean, date, select, password, image, file, reference, reference-many
- **Permissions** — gate list/form actions and nav items per resource (`useCan`, `usePermissions`)
- **Auth & routing** — `AuthProvider`, login page, `Protected` / `GuestOnly` route guards
- **Theme & density** — light/dark mode and compact/comfortable layout switches
- **Validation errors** — map API responses to field errors (Django REST, .NET, Node helpers included)
- **Data layer** — `DataProvider` contract plus REST and in-memory handler factories
- **Uploads** — image/file fields with `FormData` submit support

## Screenshots

From the [playground demo](https://muhammadinaam.github.io/ding-react-admin/):

**List with filters**

![List page with filters](docs/assets/list-page-with-filters.png)

**Tabbed form page**

![Non-modal tabbed form](docs/assets/non-modal-form-tabbed.png)

**Stepped modal form**

![Modal form with steps](docs/assets/modal-form-stepped.png)

**Login**

![Login page](docs/assets/login.png)

## Declarative CRUD

Wire a [`DataProvider`](docs/data-permissions.md) (see [Providers](#providers-manual-composition) below), then describe list and form pages in JSX — field `source` names map to your API. Filters, modals, permissions, and validation plug in when you need them; start with the basics:

### List page

```tsx
import { ResourceList, TextColumn, DateColumn } from "ding-react-admin";

export function InvoiceListPage() {
  return (
    <ResourceList resource="invoices" title="Invoices" pathPrefix="/invoices">
      <TextColumn source="number" label="Number" />
      <TextColumn source="customer" label="Customer" />
      <DateColumn source="issuedAt" label="Issued" />
    </ResourceList>
  );
}
```

Add `<TextFilter />`, `<ReferenceFilter />`, bulk actions, and row permissions inside the same component — [list pages guide](docs/crud/list-pages.md).

### Form page

```tsx
import { ResourceForm, TextField, DateField } from "ding-react-admin";

export function InvoiceFormPage() {
  return (
    <ResourceForm resource="invoices" title="Invoice" listPath="/invoices">
      <TextField source="number" label="Number" required />
      <TextField source="customer" label="Customer" required />
      <DateField source="issuedAt" label="Issued" required />
    </ResourceForm>
  );
}
```

Tabbed forms, stepped modals, and API validation errors under fields (fetch, axios, OpenAPI) — [forms guide](docs/crud/forms.md) · [validation errors](docs/form-validation-errors.md).

### Inline nested rows

Django-style tabular inlines: related rows edit in a table inside the parent form.

![Form with inline rows](docs/assets/form-with-inline.png)

```tsx
import {
  InlineFormSet,
  NumberField,
  ResourceForm,
  TextField,
} from "ding-react-admin";

<ResourceForm resource="invoices" title="Invoice" listPath="/invoices">
  <TextField source="number" label="Number" required />
  <TextField source="customer" label="Customer" required />
  <InlineFormSet
    field="lines"
    label="Lines"
    columns={[
      {
        source: "label",
        label: "Label",
        cell: ({ name }) => (
          <TextField source="label" name={name} hideLabel required />
        ),
      },
      {
        source: "quantity",
        label: "Qty",
        width: 120,
        cell: ({ name }) => (
          <NumberField source="quantity" name={name} hideLabel required min={0} />
        ),
      },
      {
        source: "unitPrice",
        label: "Unit price",
        cell: ({ name }) => (
          <NumberField
            source="unitPrice"
            name={name}
            hideLabel
            required
            min={0}
            step={0.01}
          />
        ),
      },
    ]}
  />
</ResourceForm>
```

If you already use react-hook-form, you can pick this up in minutes — nested inlines are just `useFieldArray` on the same record. See [inlines guide](docs/crud/inlines.md).

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

Use **`createSessionStorageAuthAdapter`** for demos; replace with an adapter that calls your API in production. Implement **`AuthAdapter.login`** with a **`LoginCredentials`** object (`username`, `password`, plus any extra fields your login form needs, e.g. `businessId`). Optionally implement **`getUserLabel`** so the account menu shows the logged-in user — see [data-permissions.md](docs/data-permissions.md#account-menu-label).

## Getting started

**New to CRUD:** [docs/tutorial-one-entity.md](docs/tutorial-one-entity.md) — full walkthrough from `yarn create vite` through Users list/form, `data-provider.ts`, and routes.

**Quick path:** [docs/quick-start.md](docs/quick-start.md) — `<AuthProvider>` + `<AdminApp />` with declarative routes.

**Full control:** [docs/composition.md](docs/composition.md) and the [playground](examples/playground/src/main.tsx) — your own `createBrowserRouter` with `AdminLayout`, `Protected`, `GuestOnly`, `DataProvider`, and `PermissionsProvider`.

## Documentation

| Topic | Guide |
|-------|--------|
| Install & peer deps | [docs/install.md](docs/install.md) |
| **Tutorial: add one CRUD entity** | [docs/tutorial-one-entity.md](docs/tutorial-one-entity.md) |
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
| **Form validation errors** | [docs/form-validation-errors.md](docs/form-validation-errors.md) |
| **Routing & auth guards** | [docs/routing.md](docs/routing.md) |
| Login / register layout | [docs/auth-pages.md](docs/auth-pages.md) |
| Quick start (`<AdminApp />`) | [docs/quick-start.md](docs/quick-start.md) |
| Composition (your own router) | [docs/composition.md](docs/composition.md) |
| Odoo-style app hub | [docs/app-hub.md](docs/app-hub.md) |
| `createAdminRouter` shortcut | [docs/admin-router.md](docs/admin-router.md) |
| Developing next to your app (Vite) | [docs/developing.md](docs/developing.md) |

## License

MIT
