# Request cancellation (`AbortSignal`)

When a list or form loads data, the request can become **stale**: the user navigates away, changes filters, or React remounts the component. ding-react-admin cancels in-flight reads with the standard web **`AbortSignal`** API.

---

## The problem in one minute

```tsx
useEffect(() => {
  dp.getList("users", { pagination: { page: 1, perPage: 10 } })
    .then(setData)
    .catch(() => message.error("Load failed"));
}, [page]);
```

If the effect runs twice (React StrictMode in dev) or `page` changes quickly:

1. Request **A** starts  
2. Request **B** starts (A is now stale)  
3. **A** fails or finishes → toast + wrong data  

Effects must **clean up**. The standard way in 2026 is `AbortController`.

---

## How ding-react-admin handles it

Built-in CRUD components (`ResourceList`, `ResourceForm`, `ResourceFormModal`) use `useAbortableEffect`:

```tsx
useAbortableEffect((signal) => {
  return dp.getList(resource, { ...params, signal });
}, [deps]);
```

On cleanup (unmount, deps change, StrictMode remount), the signal is **aborted**. The library:

- Skips state updates when `signal.aborted`
- Does **not** show error toasts for aborted requests (`isAbortError`)

You get this for free in list/form pages. No extra wiring unless you want **real HTTP cancellation**.

---

## Why React remounts in development

`<StrictMode>` (recommended in dev) intentionally runs:

```
mount → effect → cleanup → effect again
```

This catches missing cleanups. It **only doubles fetches in development**, not in production builds.

Duplicate network calls in dev are expected. Duplicate **toasts** or **stale UI** are bugs — that is what `AbortSignal` fixes.

---

## Your job: forward `signal` to fetch / axios (optional)

`GetListParams` and `GetOneParams` include optional `signal`:

```ts
type GetListParams = {
  pagination?: { page: number; perPage: number };
  sort?: SortSpec | SortSpec[];
  filter?: Record<string, unknown>;
  signal?: AbortSignal;
};

type GetOneParams = {
  signal?: AbortSignal;
};
```

If you **ignore** `signal`, the library still ignores stale results. If you **forward** it, the browser cancels the HTTP request too.

### fetch

```ts
list: async (params) => {
  const res = await fetch(`${API_BASE}/?${qs}`, { signal: params.signal });
  // ...
},
retrieve: async (id, params) => {
  const res = await fetch(`${API_BASE}/${id}/`, { signal: params?.signal });
  return res.json();
},
```

### OpenAPI + axios

Generated clients usually accept `options` as the last argument:

```ts
list: async (params) => {
  const { data } = await getApi().apiV1UsersList(
    ordering,
    params.pagination?.page,
    undefined,
    { signal: params.signal },
  );
  return { data: data.results, total: data.count };
},
retrieve: (id, params) =>
  getApi()
    .apiV1UsersRetrieve(String(id), { signal: params?.signal })
    .then((r) => r.data),
```

### In-memory / demo handlers

No HTTP — ignore `signal` (or accept `_params?` and do nothing):

```ts
async getOne(id, _params?) {
  return { data: getRowById(rows, id) };
}
```

---

## Custom effects in your app

Import the same utilities the library uses:

```ts
import {
  useAbortableEffect,
  isAbortError,
  useDataProvider,
} from "ding-react-admin";

function MyPanel() {
  const dp = useDataProvider();

  useAbortableEffect(async (signal) => {
    try {
      const res = await dp.getList("reports", { signal });
      if (!signal.aborted) setRows(res.data);
    } catch (e) {
      if (!isAbortError(e)) showError(e);
    }
  }, [dp]);
}
```

Manual reloads (button click) call `getList` **without** `signal` — user-initiated, not auto-cancelled.

---

## `isAbortError`

Aborted fetch/axios calls throw errors that are **not** user-facing failures:

```ts
import { isAbortError } from "ding-react-admin";

catch (e) {
  if (!isAbortError(e)) message.error("Load failed");
}
```

Recognizes `AbortError`, axios `CanceledError`, and `ERR_CANCELED`.

---

## Summary

| Layer | Who | What |
|-------|-----|------|
| UI | ding-react-admin | Creates `AbortController`, passes `signal`, ignores abort errors |
| DataProvider | Your handlers | Optionally forward `signal` to fetch/axios |
| StrictMode | React dev | Double effect run — handled by cleanup |

See also: [tutorial-one-entity.md](tutorial-one-entity.md) (handler examples), [data-layer-advanced.md](data-layer-advanced.md).
