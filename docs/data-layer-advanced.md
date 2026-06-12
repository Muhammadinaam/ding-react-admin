# Data layer — when the simple tutorial is not enough

The [tutorial](tutorial-one-entity.md) covers the **normal** case:

1. Put fields in the UI with `source="fieldName"`.
2. Wire five API functions in `userData.ts` with `createRestResourceHandlers`.
3. Register handlers in `lib/data-provider.ts`.

That is enough for most pages. This page explains **when you need more** and **what to do instead** — in plain language.

---

## How do I know I need something advanced?

Ask yourself:

| Question | If **yes** → |
|----------|----------------|
| Does saving one record also change **another** table or API? | Manual handlers or memory hooks (side effects) |
| Does my API use **different JSON keys** than my form `source` names, and I cannot rename `source`? | `transformCreate` / `transformUpdate` |
| Does my list API return data in a **weird shape** (not `{ results, count }` or similar)? | Custom `list` function |
| Am I building an **in-memory demo** without a real server? | `createMemoryResourceHandlers` with optional overrides |

If everything is “one form → one API endpoint, same field names,” stay on the tutorial path.

---

## Case 1 — Cross-entity side effects

### What this means

You save **one** thing in the UI, but the server (or your demo store) must also update **something else**.

**Example from the playground:** When you delete a **brand**, products that pointed at that brand must be reassigned to another brand. When you save a **product**, the linked **brand** row must update its `productId`.

The simple `createRestResourceHandlers` only calls **one URL per action**. It does not know about other tables.

### What to do

**REST / real API:** If the backend already handles this in one request, you do nothing extra. If not, you either:

- Fix the backend (preferred), or
- Implement full `ResourceHandlers` yourself (call multiple APIs in `create` / `update` / `delete`).

**In-memory playground:** Use `createMemoryResourceHandlers` with hooks:

```ts
createMemoryResourceHandlers({
  getRows: () => api.brands,
  nextId,
  afterDelete: (removed) => {
    // YOUR custom logic when a brand is deleted
    api.products.forEach((p) => {
      if (p.brandId === removed.id) {
        // reassign product to another brand...
      }
    });
  },
});
```

**Real example:** [`productData.ts`](../examples/playground/src/pages/products/productData.ts) — fully manual handlers because create/update/delete sync brand ↔ product links.

### Rule of thumb

- **One API call per action, backend does the rest** → tutorial pattern is fine.
- **You must orchestrate multiple records in the browser or demo store** → advanced handlers.

---

## Case 2 — API field names differ from form `source`

### What this means

The form builds JSON from `source`:

```tsx
<TextField source="invoiceLine.product" />
```

Submit body:

```json
{ "invoiceLine": { "product": "SKU-1" } }
```

But your API might expect:

```json
{ "line": { "product": "SKU-1" } }
```

### What to do (easiest first)

**Level 1 — Rename `source` (best):**

If the API expects `user_email`, use:

```tsx
<TextField source="user_email" />
```

No extra code in `userData.ts`.

**Level 2 — `transformCreate` / `transformUpdate`:**

When you cannot change `source` (e.g. nested structure must stay for the UI):

```ts
createRestResourceHandlers({
  list: async (params) => { /* ... */ },
  retrieve: async (id) => { /* ... */ },
  create: async (data) => { /* ... */ },
  update: async (id, data) => { /* ... */ },
  destroy: async (id) => { /* ... */ },

  transformCreate: (data) => ({
    line: (data as { invoiceLine: unknown }).invoiceLine,
  }),
  transformUpdate: (data) => ({
    line: (data as { invoiceLine: unknown }).invoiceLine,
  }),
});
```

The form still uses `invoiceLine.product`; only the HTTP body sent to the API is reshaped.

---

## Case 3 — Non-standard list response

### What this means

`ResourceList` needs your `list` function to return:

```ts
{ data: Row[], total: number }
```

`total` is the **full** count across all pages (for pagination UI).

Many APIs match Django REST: `{ count: 42, results: [...] }`. You map that in `list`:

```ts
return { data: json.results, total: json.count };
```

Some APIs return:

- `{ items: [...], totalCount: 42 }`
- `{ data: { users: [...] }, meta: { total: 42 } }`
- A plain array with no total (you must adapt or fake `total`)

### What to do

Keep `createRestResourceHandlers` — only change the **`list`** function to read **your** JSON shape:

```ts
list: async (params) => {
  const res = await fetch(/* your URL with page + sort */);
  const json = await res.json();
  return {
    data: json.items,           // ← your array field name
    total: json.totalCount,     // ← your total field name
  };
},
```

Sorting and pagination still go in the same `list` function (see tutorial Section C).

---

## Case 4 — In-memory demos (no real backend)

### What this means

You are building a demo or test like the playground: data lives in a JavaScript array in memory, not on a server.

### What to do

Use `createMemoryResourceHandlers`:

```ts
createMemoryResourceHandlers({
  getRows: () => api.users,
  nextId,
  // mapCreate omitted → default is { ...formData, id }
});
```

Form `source` fields still define the row shape on create/update.

**Override `mapCreate` when:**

- You need a default (e.g. `issuedAt` = today if empty).
- Foreign keys must be numbers but the form gives strings (see invoice lines in the playground).

**Override `applyUpdate` when:**

- Same coercion rules on patch.

**Use `afterDelete` when:**

- Deleting a parent must delete or update children (invoices → invoice lines).

---

## Case 5 — Validation errors on save

Throw errors from `create` / `update` when the API rejects the payload. Wire **`parseFormError`** on `combineResourceHandlers` — use `parseDjangoDRFFormErrors`, `parseDotNetFormErrors`, or `parseNodeFormErrors`. See [tutorial Section D](tutorial-one-entity.md#section-d--form-validation-errors) and [form-validation-errors.md](form-validation-errors.md).

---

## Quick decision chart

```
Adding a new entity?
│
├─ Real REST API, same field names as form source
│     → createRestResourceHandlers (tutorial)
│
├─ Real REST API, different JSON keys
│     → transformCreate / transformUpdate
│
├─ Real REST API, weird list JSON
│     → custom list mapping only
│
├─ Save/delete affects other entities (client-side)
│     → manual ResourceHandlers or memory hooks
│
└─ No backend, demo data in arrays
      → createMemoryResourceHandlers
```

---

## See also

- [tutorial-one-entity.md](tutorial-one-entity.md) — full walkthrough (start here)
- [example-app.md](example-app.md) — playground with in-memory data
- Playground [`productData.ts`](../examples/playground/src/pages/products/productData.ts) — manual handlers example

[← Back to README](../README.md)
