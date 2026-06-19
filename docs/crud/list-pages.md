# List pages

![List page with filters](../assets/list-page-with-filters.png)

```tsx
import {
  FilterBar,
  ImageColumn,
  NumberColumn,
  ReferenceColumn,
  ReferenceFilter,
  ResourceList,
  TextColumn,
  TextField,
  TextFilter,
} from "ding-react-admin";

export function ProductListPage() {
  const formFields = (
    <>
      <TextField source="sku" label="SKU" required />
      <TextField source="name" label="Name" required />
    </>
  );

  return (
    <ResourceList
      resource="products"
      title="Products"
      pathPrefix="/products"
      editMode="both"
      formChildren={formFields}
    >
      <FilterBar>
        <TextFilter source="name" label="Name" />
        <ReferenceFilter
          source="brandId"
          label="Brand"
          reference="brands"
          optionLabel="name"
          multiple
        />
      </FilterBar>
      <ImageColumn source="image" label="Image" />
      <TextColumn source="sku" label="SKU" />
      <TextColumn source="name" label="Name" />
      <ReferenceColumn
        source="brandId"
        label="Brand"
        reference="brands"
        optionLabel="name"
      />
    </ResourceList>
  );
}
```

## URL query params (shareable links)

| Param | Example | Purpose |
|-------|---------|---------|
| `page`, `perPage` | `?page=2&perPage=25` | Pagination |
| `sort` | `?sort=name:asc&sort=price:desc` | Multi-column sort |
| Filter keys | `?name=Widget&brandId=1,2` | List filters |
| `create` | `?create=1` | Open create modal |
| `edit` | `?edit=5` | Open edit modal |

`editMode`: `"page"` (default), `"modal"`, or `"both"`.

List and form pages pass `AbortSignal` to `getList` / `getOne` and cancel on unmount or filter changes. Forward `params.signal` in your handlers for real HTTP cancellation — see [request-cancellation.md](../request-cancellation.md).

## List header and row actions

**Card header** — add buttons to the left of **New** / **New page** with `headerExtra`:

```tsx
<ResourceList
  resource="products"
  title="Products"
  pathPrefix="/products"
  headerExtra={<Button onClick={exportCsv}>Export</Button>}
>
  {/* columns & filters */}
</ResourceList>
```

**Built-in row actions** — Edit, Quick edit, and Delete are shown when the user has `write` / `delete` permission. Hide individual actions with `actions` (permissions still apply; `false` only suppresses the button):

```tsx
<ResourceList
  resource="products"
  title="Products"
  pathPrefix="/products"
  editMode="both"
  actions={{ delete: false, quickEdit: false }}
>
  {/* … */}
</ResourceList>
```

| `actions` key | Hides |
|---------------|--------|
| `edit` | Navigate-to-form **Edit** link (`editMode` `"page"` or `"both"`) |
| `quickEdit` | Modal **Edit** / **Quick edit** (`editMode` `"modal"` or `"both"`) |
| `delete` | **Delete** button |

**Custom row actions** — append links or buttons in the Actions column with `rowActions`. The second argument exposes `reload()` and `openEditModal(id)`:

```tsx
<ResourceList
  resource="products"
  title="Products"
  pathPrefix="/products"
  rowActions={(row, { reload, openEditModal }) => (
    <>
      <Button type="link" size="small" style={{ padding: 0 }} onClick={() => openEditModal(row.id as number)}>
        Clone
      </Button>
      <Link to={`/products/${row.id}/preview`}>Preview</Link>
    </>
  )}
>
  {/* … */}
</ResourceList>
```

Pass `rowActions` alone (without built-in actions) to get an Actions column with only your buttons — set every `actions` key to `false` and ensure permissions would not show defaults, or rely on read-only users plus custom actions.

For a **separate column** (not the Actions column), use `CustomColumn` instead.

### Image thumbnails

Use `ImageColumn` when a list row stores an image URL (same field as `ImageField` on the form). Defaults: 40×40 px thumbnail, `objectFit: "cover"`, `borderRadius: 4`, not sortable.

```tsx
<ImageColumn source="image" label="Image" />
<ImageColumn source="photo" label="Photo" width={64} height={64} borderRadius={8} />
```

| Prop | Default | Purpose |
|------|---------|---------|
| `width`, `height` | `40` | Thumbnail size in pixels |
| `objectFit` | `"cover"` | CSS `object-fit` |
| `borderRadius` | `4` | Corner radius in pixels |
| `alt` | `""` | `<img alt>` text |
| `sortable` | `false` | Enable column sorting |

See also: [Bulk actions](bulk-actions.md)

[← CRUD overview](overview.md) · [← README](../../README.md)
