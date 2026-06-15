# CRUD field system

Django-admin-style CRUD built from JSX components. List pages, forms, filters, reference lookups, URL-synced state, modal create/edit, nested inlines, and bulk actions are all included.

**Requires:** `DataProvider`, `PermissionsProvider`, and `react-hook-form` in your app (see playground `main.tsx`).

## Guides

| Topic | Link |
|-------|------|
| List pages & filters | [list-pages.md](list-pages.md) |
| Request cancellation (`AbortSignal`) | [../request-cancellation.md](../request-cancellation.md) |
| Bulk actions (checkboxes + action bar) | [bulk-actions.md](bulk-actions.md) |
| Form pages | [forms.md](forms.md) |
| Tabbed / stepped forms | [forms.md](forms.md#tabbed-and-stepped-forms) |
| Reference / lookup fields | [references.md](references.md) |
| Inline nested forms | [inlines.md](inlines.md) |
| Custom field types | [custom-fields.md](custom-fields.md) |

## Built-in field / column / filter components

| Type | Form | Column | Filter |
|------|------|--------|--------|
| Text | `TextField` | `TextColumn` | `TextFilter` |
| Password | `PasswordField` | — | — |
| Number | `NumberField` | `NumberColumn` | `NumberFilter` |
| Boolean | `BooleanField` | `BooleanColumn` | `BooleanFilter` |
| Date | `DateField` | `DateColumn` | `DateFilter` |
| Select (static) | `SelectField` | — | `SelectFilter` |
| Reference (FK) | `ReferenceField` | `ReferenceColumn` | `ReferenceFilter` |
| Reference many | `ReferenceManyField` | `ReferenceManyColumn` | `ReferenceManyFilter` |
| Custom | — | `CustomColumn` | — |

`DateField` and `DateFilter` use Ant Design **`DatePicker`** (requires `dayjs` peer). If you alias this library to source in a monorepo (like the playground), **dedupe `dayjs`** in Vite so Ant Design and the library share one copy — otherwise opening the calendar can throw `clone.weekday is not a function`.

[← Back to README](../../README.md)
