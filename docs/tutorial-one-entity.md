# Tutorial: build an admin app and add a Users page

This is a **start-to-finish** guide. Follow every step in order if you are new. The playground under `examples/playground` uses the same pattern with an in-memory API instead of REST.

When you finish, you will have:

- A React + Vite app with `ding-react-admin`
- A **Users** list and form wired to your API
- A `data-provider.ts` that composes entity handlers
- Sidebar navigation and routes

---

## Part 1 — Hands-on tutorial (do this first)

### Step 1 — Create a React project

```bash
yarn create vite my-admin --template react-ts
cd my-admin
yarn install
```

Your app folder looks like:

```
my-admin/
  index.html
  package.json
  src/
    main.tsx
    App.tsx
    ...
```

We will replace most of `src/` with admin files. You can delete the default `App.tsx` and `App.css` later.

### Step 2 — Install ding-react-admin and peer dependencies

Your app must install Ant Design, React Router, and the other peers itself:

```bash
yarn add ding-react-admin@^1.0.0 \
  antd@^6.0.0 \
  @ant-design/icons@^6.0.0 \
  dayjs@^1.11.13 \
  react-hook-form@^7.56.4 \
  react-router-dom@^7.14.2
```

See [install.md](install.md) for npm, GitHub, and version details.

### Step 3 — Create the app entry file

**File:** `src/main.tsx`

Replace the contents with a minimal admin shell. For now the data provider is a stub — we will plug in `createDataProvider()` in Step 11.

```tsx
import { App as AntdApp } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  AdminApp,
  AuthProvider,
  DataProvider,
  LoginPage,
  PermissionsProvider,
  PlaceholderPage,
  createSessionStorageAuthAdapter,
  type DataProviderContract,
} from "ding-react-admin";
import { DashboardOutlined } from "@ant-design/icons";
import { MAIN_NAV } from "./navigation";
import { adminRoutes } from "./routes";

const authAdapter = createSessionStorageAuthAdapter();

// Temporary stub — replaced in Step 11 with createDataProvider()
const dataProvider: DataProviderContract = {
  getList: async () => ({ data: [], total: 0 }),
  getOne: async () => ({ data: {} }),
  create: async () => ({ data: {} }),
  update: async () => ({ data: {} }),
  delete: async () => ({ data: {} }),
};

const can = (_permission: string) => true; // temporary — fixed in Step 16 (Part 1B)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AntdApp>
      <AuthProvider adapter={authAdapter}>
        <DataProvider value={dataProvider}>
          <PermissionsProvider can={can}>
            <AdminApp
              navItems={MAIN_NAV}
              routes={adminRoutes}
              layoutProps={{ brand: "My App", collapsedBrand: "M" }}
            />
          </PermissionsProvider>
        </DataProvider>
      </AuthProvider>
    </AntdApp>
  </StrictMode>,
);
```

**What this does:** wraps your app in auth, data, and permissions providers, then renders `AdminApp` with your nav and routes.

### Step 4 — Create navigation

**File:** `src/navigation.tsx` (new file in `src/`)

```tsx
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import type { NavItem } from "ding-react-admin";

export const MAIN_NAV: NavItem[] = [
  { path: "/", label: "Dashboard", Icon: DashboardOutlined },
  // Users link added in Step 13
];
```

### Step 5 — Create routes

**File:** `src/routes.tsx` (new file in `src/`)

```tsx
import {
  LoginPage,
  PlaceholderPage,
  type AdminRouteChild,
} from "ding-react-admin";

export const adminRoutes: AdminRouteChild[] = [
  {
    path: "login",
    access: "guest",
    element: <LoginPage afterLoginPath="/" />,
  },
  { index: true, element: <PlaceholderPage title="Dashboard" /> },
  // User routes added in Step 12
];
```

### Step 6 — Create the Users feature folder

In your terminal or IDE, create a folder:

```
src/pages/users/
```

This folder holds everything for the Users entity: UI, API wiring, and exports.

### Step 7 — Create API handlers for Users

**File:** `src/pages/users/userData.ts`

This file connects your backend to `ding-react-admin`. Field names in the form (`source="username"`, etc.) become the JSON body automatically — you do **not** list fields again here.

Below uses **`fetch`** and string URLs (works with any backend). If you use a generated OpenAPI client, see the variant at the end of Step 7.

> **Focus on the five CRUD functions** (`list`, `retrieve`, `create`, `update`, `destroy`). That is all you need to complete this tutorial. Optional extras (like request cancellation below) can wait until later.

```ts
import {
  createRestResourceHandlers,
  toDjangoRestOrdering,
  // toODataOrderBy,    // .NET OData — use instead of toDjangoRestOrdering if your API expects $orderby=...
  // toJsonApiSort,     // JSON:API — use instead if your API expects sort=-field,field
} from "ding-react-admin";

export const USER_RESOURCE = "users" as const;

const API_BASE = "/api/v1/users";

export const createUserHandlers = () =>
  createRestResourceHandlers({
    list: async (params) => {
      const qs = new URLSearchParams();
      if (params.pagination?.page) {
        qs.set("page", String(params.pagination.page));
      }

      // --- Sort: convert table sort → your API's query param format ---
      // When the user clicks column headers, params.sort looks like:
      //   [{ field: "username", order: "DESC" }, { field: "date_joined", order: "ASC" }]
      // That is NOT sent to your API as-is. Each backend expects its own string in the URL.
      //
      // Example (user sorted username ↓ then date_joined ↑):
      //
      //   Django REST:  /api/v1/users/?ordering=-username,date_joined
      //   OData:        /api/v1/users/?$orderby=username desc,date_joined asc
      //   JSON:API:     /api/v1/users/?sort=-username,date_joined
      //   Custom API:   /api/v1/users/?sort=username:desc,date_joined:asc  ← you write this yourself
      //
      // Pick the helper that matches your backend, OR write your own function (see Section C).

      const ordering = toDjangoRestOrdering(params.sort);
      if (ordering) qs.set("ordering", ordering);

      // .NET OData example (comment out Django lines above, use these instead):
      // const orderby = toODataOrderBy(params.sort);
      // if (orderby) qs.set("$orderby", orderby);

      // JSON:API example:
      // const sort = toJsonApiSort(params.sort);
      // if (sort) qs.set("sort", sort);

      // Custom backend example:
      // const sort = params.sort
      //   ? (Array.isArray(params.sort) ? params.sort : [params.sort])
      //       .map((s) => `${s.field}:${s.order === "DESC" ? "desc" : "asc"}`)
      //       .join(",")
      //   : undefined;
      // if (sort) qs.set("sort", sort);

      const res = await fetch(`${API_BASE}/?${qs}`);
      if (!res.ok) throw new Error("Failed to load users");
      const json = await res.json();
      return { data: json.results, total: json.count };
    },
    retrieve: async (id) => {
      const res = await fetch(`${API_BASE}/${id}/`);
      if (!res.ok) throw new Error("Failed to load user");
      return res.json();
    },
    create: async (data) => {
      const res = await fetch(`${API_BASE}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create user");
      return res.json();
    },
    update: async (id, data) => {
      const res = await fetch(`${API_BASE}/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update user");
      return res.json();
    },
    destroy: async (id) => {
      const res = await fetch(`${API_BASE}/${id}/`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");
    },
  });
```

**Typed API client variant** — same shape, different `list` / `create` / etc.:

```ts
import {
  createRestResourceHandlers,
  toDjangoRestOrdering,
  // toODataOrderBy,
  // toJsonApiSort,
} from "ding-react-admin";
import type { ApiApi } from "../../api/api/api-api";

export const USER_RESOURCE = "users" as const;

export const createUserHandlers = (getApi: () => ApiApi) =>
  createRestResourceHandlers({
    list: async (params) => {
      // Same sort conversion as fetch variant — see comments in Step 7 above.
      const { data } = await getApi().apiV1UsersList(
        toDjangoRestOrdering(params.sort), // Django REST ordering=...
        // toODataOrderBy(params.sort),    // or OData $orderby
        // toJsonApiSort(params.sort),     // or JSON:API sort
        params.pagination?.page,
      );
      return { data: data.results, total: data.count };
    },
    retrieve: (id) =>
      getApi().apiV1UsersRetrieve(String(id)).then((r) => r.data),
    create: (data) =>
      getApi().apiV1UsersCreate(data).then((r) => r.data),
    update: (id, data) =>
      getApi().apiV1UsersPartialUpdate(String(id), data).then((r) => r.data),
    destroy: (id) =>
      getApi().apiV1UsersDestroy(String(id)).then(() => {}),
  });
```

Adjust list response shape (`results` / `count`) if your API paginates differently.

#### Optional — request cancellation (`signal`) — **skip for now**

When a list or form loads data, the user might navigate away or change filters before the request finishes. `ding-react-admin` already avoids stale toasts and wrong UI updates for built-in pages — **you do not need to do anything in `userData.ts` to finish this tutorial.**

Later, if you want the browser to **cancel the HTTP request** too (fewer wasted calls on slow networks), forward `params.signal` to `fetch` or axios in `list` and `retrieve` only:

```ts
// list
await fetch(`${API_BASE}/?${qs}`, { signal: params.signal });

// retrieve
await fetch(`${API_BASE}/${id}/`, { signal: params?.signal });
```

That is a small production polish step, not part of the first walkthrough. See [request-cancellation.md](request-cancellation.md) when you are ready — or ignore it until you need it.

### Step 8 — Create the Users UI

**File:** `src/pages/users/Users.tsx`

The `source` prop on each field defines what gets sent to the API on save.

```tsx
import {
  BooleanColumn,
  BooleanField,
  ResourceForm,
  ResourceList,
  TextColumn,
  TextField,
} from "ding-react-admin";
import { USER_RESOURCE } from "./userData";

const userFields = (
  <>
    <TextField source="username" label="Username" required />
    <TextField source="email" label="Email" />
    <BooleanField source="is_active" label="Active" />
  </>
);

export function UserListPage() {
  return (
    <ResourceList
      resource={USER_RESOURCE}
      title="Users"
      pathPrefix="/users"
      editMode="both"
      formChildren={userFields}
    >
      <TextColumn source="username" label="Username" />
      <TextColumn source="email" label="Email" />
      <BooleanColumn source="is_active" label="Active" />
    </ResourceList>
  );
}

export function UserFormPage() {
  return (
    <ResourceForm
      resource={USER_RESOURCE}
      title="User"
      listPath="/users"
    >
      {userFields}
    </ResourceForm>
  );
}
```

### Step 9 — Export from the feature folder

**File:** `src/pages/users/index.ts`

```ts
export { UserFormPage, UserListPage } from "./Users";
export { USER_RESOURCE, createUserHandlers } from "./userData";
```

### Step 10 — Create the data provider composer

**File:** `src/lib/data-provider.ts` (new file)

Create the `lib` folder under `src/` if it does not exist. This file is the **single place** where you register all entity handlers (Users today; Products, Orders, etc. later).

```
src/
  lib/
    data-provider.ts    ← you create this
  pages/
    users/
      userData.ts       ← handlers for one entity
```

```ts
import { combineResourceHandlers, type DataProviderContract } from "ding-react-admin";
import { USER_RESOURCE, createUserHandlers } from "../pages/users";

export function createDataProvider(): DataProviderContract {
  return combineResourceHandlers({
    [USER_RESOURCE]: createUserHandlers(),
  });
}
```

If you use a typed API client, pass your client factory:

```ts
import { getApiClient } from "./api-client";

export function createDataProvider(): DataProviderContract {
  return combineResourceHandlers({
    [USER_RESOURCE]: createUserHandlers(() => getApiClient()),
  });
}
```

**Adding more entities later:** import each `createXHandlers` and add one line per resource inside `combineResourceHandlers({ ... })`.

### Step 11 — Use `createDataProvider` in `main.tsx`

**File:** `src/main.tsx` (edit the file from Step 3)

1. Add the import:

```tsx
import { createDataProvider } from "./lib/data-provider";
```

2. Replace the stub `dataProvider` with:

```tsx
const dataProvider = createDataProvider();
```

3. Remove the old stub object (`getList: async () => ...`).

Your provider tree is now:

```
AuthProvider
  DataProvider  ← value={createDataProvider()}
    PermissionsProvider
      AdminApp
```

CRUD pages (`ResourceList`, `ResourceForm`) call `useDataProvider()` internally; you never pass the provider into each page.

### Step 12 — Add User routes

**File:** `src/routes.tsx`

Add the import:

```tsx
import { UserFormPage, UserListPage } from "./pages/users";
```

Add these routes **inside** the `adminRoutes` array (alongside the dashboard):

```tsx
{ path: "users", element: <UserListPage /> },
{ path: "users/:id", element: <UserFormPage /> },
```

- `/users` — list (and quick-edit modal)
- `/users/new` — create form (`:id` is `new`)
- `/users/<uuid>` — edit form

### Step 13 — Add Users to the sidebar

**File:** `src/navigation.tsx`

```tsx
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";

export const MAIN_NAV: NavItem[] = [
  { path: "/", label: "Dashboard", Icon: DashboardOutlined },
  { path: "/users", label: "Users", Icon: UserOutlined },
];
```

### Step 14 — Run the app

```bash
yarn dev
```

1. Open the URL Vite prints (usually `http://localhost:5173`).
2. Log in (demo adapter: any username/password with `createSessionStorageAuthAdapter`, or your real auth adapter).
3. Click **Users** in the sidebar.
4. Create, edit, and delete users against your API.

---

## Part 1B — Permissions (Steps 15–20)

> When you log in, your backend sends a list of permission **strings** — like `"users.read"` or `"main.view_user"`. Think of it as a **key ring**: if your key is on the ring, you see the button; if not, it stays hidden. The library does not care what the strings look like — Django, .NET, and Node apps all work the same way.

Complete Steps 1–14 first so Users CRUD works. Then add permissions below.

### Step 15 — Save permission strings next to Users

**File:** `src/pages/users/userData.ts`

Add (use whatever strings **your** API returns):

```ts
export const USER_PERMS = {
  list: "users.read",       // see the Users page
  add: "users.create",      // New button
  change: "users.update",   // Edit button
  delete: "users.delete",   // Delete button
};
```

| What the user clicks | Slot | Example string |
|----------------------|------|----------------|
| Users in sidebar | `list` | `users.read` |
| New | `add` | `users.create` |
| Edit | `change` | `users.update` |
| Delete | `delete` | `users.delete` |

Export `USER_PERMS` from `src/pages/users/index.ts` too.

### Step 16 — One function to check permissions

**File:** `src/main.tsx`

Replace the temporary `can = () => true` stub:

```tsx
import { createPermissionsChecker } from "ding-react-admin";
import { getUser } from "./lib/api-client"; // however you store the logged-in user

const can = createPermissionsChecker(() => getUser()?.permissions);
```

Your auth adapter should save `user.permissions` from the login response (a `string[]`).

`can("users.create")` returns `true` when that string is in the array.

### Step 17 — Hide buttons on list and form pages

**File:** `src/pages/users/Users.tsx`

```tsx
import { USER_RESOURCE, USER_PERMS } from "./userData";

<ResourceList
  permissions={{
    add: USER_PERMS.add,
    change: USER_PERMS.change,
    delete: USER_PERMS.delete,
  }}
  ...
/>

<ResourceForm
  permissions={{
    add: USER_PERMS.add,
    change: USER_PERMS.change,
  }}
  ...
/>
```

A user with only `users.read` sees the table but no New / Edit / Delete.

### Step 18 — Hide sidebar link and block direct URLs

**File:** `src/navigation.tsx`

```tsx
import { USER_PERMS } from "./pages/users";

{ path: "/users", label: "Users", Icon: UserOutlined, permission: USER_PERMS.list },
```

**File:** `src/routes.tsx`

```tsx
import { RequirePermission } from "ding-react-admin";
import { USER_PERMS } from "./pages/users";

{ path: "users", element: (
  <RequirePermission permission={USER_PERMS.list} redirect="/">
    <UserListPage />
  </RequirePermission>
) },
```

Nav hides the link; the route guard catches users who bookmark `/users`.

### Step 19 — Block API calls (recommended)

**File:** `src/lib/data-provider.ts`

```tsx
import { USER_PERMS } from "../pages/users";

export function createDataProvider(): DataProviderContract {
  return combineResourceHandlers(
    {
      [USER_RESOURCE]: {
        handlers: createUserHandlers(() => getApiClient()),
        permissions: USER_PERMS,
      },
    },
    { can }, // same `can` from main.tsx — pass via a shared module if needed
  );
}
```

If someone bypasses the UI, the data layer throws Forbidden.

### Step 20 — Try it

1. Log in as a user with all permissions → New / Edit / Delete visible.
2. Log in as read-only → list only.
3. Playground demo: **admin** / **admin** vs **user** / **user** (`yarn dev:example` in the package repo).

---

### Optional — Vite dev proxy (only if frontend and API are on different ports)

**You can skip this step** if:

- Your API is already on the **same origin** as the React app (e.g. both served from one server), or
- You use a **full API URL** in `userData.ts` (e.g. `fetch("http://localhost:8001/api/v1/users/")`), or
- You deploy with a reverse proxy in production that already routes `/api` for you.

**Why it exists:** In local dev, Vite usually runs on `http://localhost:5173` and Django (or .NET) on `http://localhost:8001`. Step 7 uses relative URLs like `/api/v1/users/`. The browser would call port **5173**, where there is no API — requests fail or hit CORS errors.

A dev **proxy** tells Vite: “when the browser requests `/api/...`, forward it to the real backend.” Your `fetch("/api/v1/users/")` keeps working without changing code between dev and production.

**File:** `vite.config.ts` (only when needed)

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:8001", // your Django / .NET / other API port
    },
  },
});
```

After this, a browser request to `http://localhost:5173/api/v1/users/` is forwarded to `http://localhost:8001/api/v1/users/`.

### Final file layout

```
src/
  main.tsx                 # createDataProvider() passed to <DataProvider>
  navigation.tsx           # sidebar links
  routes.tsx               # UserListPage, UserFormPage routes
  lib/
    data-provider.ts       # combineResourceHandlers — register all entities here
    api-client.ts          # optional: your OpenAPI / axios client
  pages/
    users/
      Users.tsx            # ResourceList + ResourceForm (field source = payload)
      userData.ts          # createUserHandlers + USER_PERMS (Step 15)
      index.ts             # re-exports
```

### You write vs the library handles

| You write | Library handles |
|-----------|-----------------|
| Folders and files above | `AdminApp`, layout, theme |
| Field `source` in `Users.tsx` | Save body from registered fields (`buildFormPayload`) |
| Five API functions in `userData.ts` | `createRestResourceHandlers` CRUD glue |
| Permission strings in `USER_PERMS` | `ResourceList` / nav / routes hide UI |
| `createDataProvider` + one line per entity | `combineResourceHandlers` |
| Sort/pagination in `list` | Optional `toDjangoRestOrdering` etc. |
| Routes and nav entries | `ResourceList`, `ResourceForm`, filters, bulk actions |

---

## Part 2 — How it works (read after you have it running)

### Section A — How the submit object is built from `source`

Field `source` props define the payload shape. You do **not** duplicate field names in `userData.ts`.

**Flat fields:**

```tsx
<TextField source="username" />
<TextField source="email" />
<BooleanField source="is_active" />
```

On save, your handler receives:

```json
{ "username": "jane", "email": "jane@example.com", "is_active": true }
```

**Nested fields** — dot notation builds nested objects:

```tsx
<TextField source="invoiceLine.product" />
<NumberField source="invoiceLine.quantity" />
```

On save:

```json
{ "invoiceLine": { "product": "SKU-1", "quantity": 2 } }
```

On edit, the form loads the full API record but **only registered field paths** are sent back — read-only nested data is not included unless you render a field for it. See [crud/internals.md](crud/internals.md).

**What you do not do:** no `toUserRequest` / `toPatch` helpers for the default case; no second field list in `*Data.ts`.

### Section B — Overriding when the API shape differs

| Level | When | How |
|-------|------|-----|
| 1. Rename `source` | API key can match the form | `source="user_email"` if API expects `user_email` |
| 2. Handler transform | Whole payload needs reshaping | `transformCreate` / `transformUpdate` on `createRestResourceHandlers` |
| 3. Manual handlers | Cross-entity side effects | Full `ResourceHandlers` — see [data-layer-advanced.md](data-layer-advanced.md) |

Example — API expects `line` instead of `invoiceLine`:

```ts
createRestResourceHandlers({
  // ...
  transformUpdate: (data) => ({
    line: (data as { invoiceLine: unknown }).invoiceLine,
  }),
});
```

### Section C — Mapping list sort to your backend

#### Why you need a conversion step

When a user clicks a column header in `ResourceList`, two things happen:

1. **Browser address bar** (optional, for bookmarking) may show something like:
   ```
   /users?sort=-username,date_joined
   ```
   That `sort=-username,date_joined` string is how **this admin UI** remembers sort in the URL (`-` means descending).

2. **`list` in `userData.ts`** receives a parsed array — **not** that raw string:
   ```ts
   params.sort = [
     { field: "username", order: "DESC" },
     { field: "date_joined", order: "ASC" },
   ]
   ```

Your **backend API** usually expects yet another format in the HTTP request. You must convert `params.sort` → the query string **your server** understands. That is what `toDjangoRestOrdering`, `toODataOrderBy`, `toJsonApiSort`, or your own function does.

#### Before and after (same user action: username ↓, date_joined ↑)

| Step | What you see |
|------|----------------|
| Admin page URL | `/users?sort=-username,date_joined` |
| `params.sort` in your code | `[{ field: "username", order: "DESC" }, { field: "date_joined", order: "ASC" }]` |
| **API request you build** | Depends on framework ↓ |

| Framework | API URL (example) |
|-----------|-------------------|
| Django REST | `GET /api/v1/users/?ordering=-username,date_joined` |
| ASP.NET OData | `GET /api/v1/users/?$orderby=username desc,date_joined asc` |
| JSON:API | `GET /api/v1/users/?sort=-username,date_joined` |
| Custom (example) | `GET /api/v1/users/?sort=username:desc,date_joined:asc` |

The library does **not** pick a framework for you — you choose one helper (or write your own) inside `list`.

#### Optional helpers (import only what matches your API)

```ts
import { toDjangoRestOrdering, toODataOrderBy, toJsonApiSort } from "ding-react-admin";

// Django REST → query value for ?ordering=
toDjangoRestOrdering(params.sort);
// [{ field: "username", order: "DESC" }]  →  "-username"
// two columns                            →  "-username,date_joined"

// .NET OData → query value for ?$orderby=
toODataOrderBy(params.sort);
// [{ field: "username", order: "DESC" }]  →  "username desc"

// JSON:API → query value for ?sort=
toJsonApiSort(params.sort);
// [{ field: "username", order: "DESC" }]  →  "-username"
```

Use **one** of these in `userData.ts`, or copy the logic and change it (see Django inline example below).

#### Write your own converter

If your API uses `sort=name:asc,age:desc`:

```ts
function toMyApiSort(sort: GetListParams["sort"]): string | undefined {
  const specs = Array.isArray(sort) ? sort : sort ? [sort] : [];
  if (specs.length === 0) return undefined;
  return specs
    .map((s) => `${s.field}:${s.order === "DESC" ? "desc" : "asc"}`)
    .join(",");
}

// In list:
const sort = toMyApiSort(params.sort);
if (sort) qs.set("sort", sort);
// → GET /api/v1/users/?sort=username:desc,date_joined:asc
```

#### Inline Django example (no helper)

```ts
const specs = Array.isArray(params.sort)
  ? params.sort
  : params.sort
    ? [params.sort]
    : [];
const ordering = specs
  .map((s) => (s.order === "DESC" ? `-${s.field}` : s.field))
  .join(",");
if (ordering) qs.set("ordering", ordering);
```

#### Pagination (same idea)

`params.pagination` has `page` and `perPage` from the table. Map them in `list` to what your API uses (`page`, `$skip`/`$top`, `offset`/`limit`, etc.). There is no universal helper — each backend differs, like sort.

### Section D — Form validation errors (optional)

Skip until basic save works. Use this when save **fails** and you want **red text under fields**, not only a toast.

Your API should respond with **HTTP 400** (or **422**) and a **JSON object** whose keys match form field `source` values — see [form-validation-errors.md](form-validation-errors.md#expected-api-response-http-400).

Pick the helper that matches your **API JSON shape**, then pass it to `combineResourceHandlers`:

```ts
// src/lib/data-provider.ts
import {
  combineResourceHandlers,
  parseDjangoDRFFormErrors, // Django REST
  // parseDotNetFormErrors,   // ASP.NET Core ValidationProblemDetails
  // parseNodeFormErrors,     // Express / Joi-style bodies
} from "ding-react-admin";

export function createDataProvider() {
  return combineResourceHandlers(
    { [USER_RESOURCE]: createUserHandlers() },
    { can, parseFormError: parseDjangoDRFFormErrors },
  );
}
```

| Helper | When to use (API body shape) |
|--------|------------------------------|
| `parseDjangoDRFFormErrors` | `{ "email": ["Invalid"], "non_field_errors": ["…"] }` |
| `parseDotNetFormErrors` | `{ "errors": { "Email": ["…"] } }` |
| `parseNodeFormErrors` | `{ errors: { email: ["…"] } }`, express-validator arrays, Joi `details` |

**HTTP client:** the backend JSON is the same for fetch, axios, and OpenAPI clients. `ResourceForm` resolves the error body automatically (including fetch `ResponseError` with a `Response` object). You do **not** need axios-specific middleware or manual `throw { body }` unless your client uses a non-standard error shape — see [form-validation-errors.md](form-validation-errors.md).

**Different API shape?** See [form-validation-errors.md](form-validation-errors.md) — custom `parseFormError`, inline prefixes, nested row errors.

**Playground:** duplicate product SKU or invoice line quantity `0` (`parseDjangoDRFFormErrors`).

---

## See also

- [install.md](install.md) — peer dependencies
- [quick-start.md](quick-start.md) — minimal shell without CRUD
- [data-permissions.md](data-permissions.md) — short permissions reference
- [form-validation-errors.md](form-validation-errors.md) — custom validation error mapping
- [data-layer-advanced.md](data-layer-advanced.md) — manual handlers, cross-entity rules
- [example-app.md](example-app.md) — in-memory playground

[← Back to README](../README.md)
