# Reference / lookup fields

Load options from your `DataProvider` or a custom function:

```tsx
// From another resource
<ReferenceField source="brandId" reference="brands" optionLabel="name" />

// Custom loader (REST client, GraphQL, etc.)
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
/>

// Server-side search in dropdown
<ReferenceField source="brandId" reference="brands" search optionLabel="name" />
```

Table columns resolve FK ids to labels via `ReferenceColumn`. Filters support multi-select via `ReferenceFilter multiple`.

[← CRUD overview](overview.md) · [← README](../../README.md)
