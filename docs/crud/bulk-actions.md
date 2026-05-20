# Bulk actions

Django admin–style bulk actions on list pages: a checkbox column, persistent selection across pages and filters, a count bar, an action dropdown, and a **Go** button.

## What you get

- **Checkbox column** as the first table column
- **Selection persists** when you change filters, sort, or pagination (tracked by row id)
- **“N of M selected”** — N is how many rows you picked, M is the total matching the current filter
- **Clear selection** link
- **Select all M items matching filter** — appears when every row on the current page is selected but more pages exist
- **Action dropdown + Go** — pick an action, click Go
- **Delete selected** — built in when the user has `delete` permission (confirmation modal)

## Basic usage

Bulk actions are enabled automatically when there is at least one action (built-in delete and/or your custom actions):

```tsx
<ResourceList
  resource="products"
  title="Products"
  pathPrefix="/products"
>
  {/* filters & columns */}
</ResourceList>
```

Users with `delete` permission see **Delete selected** in the dropdown.

## Custom bulk actions

Add actions with `bulkActions`. They appear after built-ins in the dropdown:

```tsx
<ResourceList
  resource="products"
  title="Products"
  pathPrefix="/products"
  bulkActions={[
    {
      key: "export",
      label: "Export selected",
      execute: (ids) => {
        downloadCsv(ids);
      },
    },
    {
      key: "archive",
      label: "Archive selected",
      confirm: (ids) =>
        ids.length > 10
          ? `Archive ${ids.length} items?`
          : false,
      execute: async (ids, { reload, clearSelection }) => {
        await api.archiveProducts(ids);
        clearSelection();
        reload();
      },
    },
  ]}
>
  {/* … */}
</ResourceList>
```

### `ResourceListBulkAction` shape

| Property | Type | Description |
|----------|------|-------------|
| `key` | `string` | Unique id for the dropdown option |
| `label` | `string` | Text shown in the dropdown |
| `confirm` | `string \| (ids, helpers) => string \| false` | Optional confirmation message. Return `false` to skip the modal. |
| `execute` | `(ids, helpers) => void \| Promise<void>` | Runs on the selected ids when the user clicks **Go** |

### `ResourceListBulkActionHelpers`

| Property | Description |
|----------|-------------|
| `reload()` | Refetch the current list page |
| `clearSelection()` | Uncheck all rows |

## Options

| Prop | Default | Description |
|------|---------|-------------|
| `bulkActions` | `undefined` | Extra actions appended after built-ins |
| `bulkDelete` | `true` | Include **Delete selected** when user has delete permission |
| `bulkActionsEnabled` | `true` | Set `false` to hide checkboxes and the action bar entirely |

```tsx
// No bulk UI at all
<ResourceList bulkActionsEnabled={false} … />

// Custom actions only — no built-in delete
<ResourceList bulkDelete={false} bulkActions={[…]} … />
```

## Permissions

- The checkbox column and action bar appear only when at least one action is available.
- **Delete selected** requires `can("delete", resource)`.
- Custom actions are always listed when provided — gate them yourself inside `execute` if needed.

## Playground example

See `examples/playground/src/pages/products/Products.tsx` for **Export selected** plus built-in **Delete selected**.

[← List pages](list-pages.md) · [← CRUD overview](overview.md) · [← README](../../README.md)
