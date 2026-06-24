# Reference / lookup fields

Reference fields load options from your `DataProvider` (or a custom `choices` loader). By default they behave like **Select2 server-side**: the full option list is **not** fetched on mount — only when the user opens the dropdown or types a search query.

## Basic usage

```tsx
// Lazy list load via DataProvider (default)
<ReferenceField source="brandId" reference="brands" optionLabel="name" search />

<ReferenceManyField
  source="categoryIds"
  reference="categories"
  optionLabel="name"
  search
/>
```

Wire the resource in your data provider:

```ts
combineResourceHandlers({
  brands: { handlers: createBrandHandlers(getApi), permissions: BRAND_PERMS },
});
```

## Lazy loading (default)

| When | API call |
|------|----------|
| Form mounts | No list fetch |
| User opens dropdown | `getList(reference, …)` |
| User types (`search`) | `getList` with `filter.q` |
| Edit form with selected id(s) | See [Showing selected labels](#showing-selected-labels) |

Opt back into eager loading (e.g. small static lists):

```tsx
<ReferenceField source="statusId" reference="statuses" lazy={false} />
```

## Server-side search

Pass `search` so the Select disables client-side filtering and passes the query to your loader / `getList` filter as `q`:

```tsx
<ReferenceField source="brandId" reference="brands" search optionLabel="name" />
```

In your list handler:

```ts
list: async (params) => {
  const search = typeof params.filter?.q === "string" ? params.filter.q : undefined;
  const data = await api.listBrands({ search, page: params.pagination?.page });
  return { data: data.results, total: data.count };
},
```

Custom loader:

```tsx
<ReferenceField
  source="brandId"
  choices={async ({ dataProvider, search }) => {
    const res = await dataProvider.getList("brands", {
      filter: search ? { q: search } : undefined,
    });
    return res.data.map((row) => ({
      label: String(row.name),
      value: row.id,
    }));
  }}
  search
/>
```

## Showing selected labels

On edit, the field must display labels for already-selected ids **without** loading the full dropdown list. ding-react-admin resolves labels in this order:

1. **Nested object on the field value** — if the value is `{ id: 1, name: "Branch 1" }`, the label comes from that object.
2. **Embedded relation on the form record** — if retrieve returns `{ branch_id: 1, branch: { id: 1, name: "Branch 1" } }`, use `recordSource`:

```tsx
<ReferenceField
  source="branch_id"
  recordSource="branch"
  reference="branches"
  optionLabel="name"
  search
/>
```

For many-to-many / multi-select with embedded arrays:

```tsx
// API: { branch_ids: ["1","2"], branches: [{ id: "1", name: "A" }, …] }
<ReferenceManyField
  source="branch_ids"
  recordSource="branches"
  reference="branches"
  optionLabel="name"
  search
/>
```

3. **`getOne` fallback** — if the value is a primitive id and no embedded record is available, the library calls `dataProvider.getOne(reference, id)` once per missing id. Disable this when your API never supports single-record fetch:

```tsx
<ReferenceField
  source="branch_id"
  reference="branches"
  fetchSelected={false}
  search
/>
```

With `fetchSelected={false}` and no embedded data, the raw id is shown until the user opens the dropdown.

## Props summary

| Prop | Default | Purpose |
|------|---------|---------|
| `reference` | — | Resource name for `getList` / `getOne` |
| `choices` | — | Custom loader; overrides `reference` |
| `optionLabel` | `"name"` | Field or function for display text |
| `optionValue` | `"id"` | Field used as Select value |
| `search` | `false` | Enable server-side search (`filter.q`) |
| `lazy` | `true` | Load list only on open / search |
| `recordSource` | — | Form key with embedded related object(s) |
| `fetchSelected` | `true` | Call `getOne` for unresolved primitive ids |

## Columns and filters

Table columns still **eager-load** labels (for list display):

```tsx
<ReferenceColumn source="brandId" reference="brands" optionLabel="name" />
```

List filters use the same lazy + search behaviour as form fields:

```tsx
<ReferenceFilter source="brandId" reference="brands" search />
<ReferenceManyFilter source="categoryIds" reference="categories" search />
```

## `useChoices` hook

Custom fields can reuse the same logic:

```tsx
import { useChoices } from "ding-react-admin";

const { options, loading } = useChoices(
  undefined,
  "brands",
  "name",
  "id",
  searchText,
  {
    lazy: true,
    active: dropdownOpen || Boolean(searchText),
    selectedValues: value,
    selectedRecords: record.branch,
    fetchSelected: true,
  },
);
```

Helpers for custom selects live in `src/crud/utils/choiceSelectionUtils.ts` (`valueAsId`, `recordsToOptions`, …).

[← CRUD overview](overview.md) · [← README](../../README.md)
