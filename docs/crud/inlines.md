# Inline nested forms (TabularInline / StackedInline)

```tsx
import { InlineFormSet, ResourceForm, TextField, NumberField } from "ding-react-admin";

<ResourceForm
  resource="invoices"
  listPath="/invoices"
  inlines={[{ resource: "invoice-lines", foreignKey: "invoiceId" }]}
>
  <TextField source="number" required />
  {/* Tabular (default) — one row per line, column headers, no duplicate labels */}
  <InlineFormSet resource="invoice-lines" foreignKey="invoiceId" label="Lines">
    <TextField source="label" label="Label" required />
    <NumberField source="quantity" label="Qty" required />
  </InlineFormSet>

  {/* Stacked — Django StackedInline, each item in a card with field labels */}
  <InlineFormSet
    resource="invoice-lines"
    foreignKey="invoiceId"
    label="Lines"
    layout="stacked"
  >
    <TextField source="label" label="Label" required />
    <NumberField source="quantity" label="Qty" required />
  </InlineFormSet>
</ResourceForm>
```

| `layout` | Behavior |
|----------|----------|
| `"tabular"` (default) | Mini-table with column headers; cell inputs have **no** extra labels |
| `"stacked"` | Each related row in a card; fields show labels vertically |

Pass matching `inlines={[...]}` on `ResourceForm` so child rows load/save with the parent.

Inline row validation uses the same **`parseFormError`** as the parent form (built-in parsers handle inline row context automatically). Custom mapping: [form-validation-errors.md](../form-validation-errors.md).

## Inline column width and input styling

In tabular inlines, set **`minWidth`** / **`width`** on field components to size table columns (e.g. `minWidth={220}` on a `ReferenceField`). Use **`inputStyle`** for the control itself (`style` on the underlying Ant Design input/select).

## Dependent fields (e.g. product → unit price)

Use **`onValueChange`** on `ReferenceField` with `useFormContext().setValue`. The callback receives the selected option’s **`record`** (full row from the reference resource) and the inline field **`name`** so you can update sibling fields in the same row:

```tsx
function InvoiceLinesInline() {
  const { setValue } = useFormContext();

  return (
    <InlineFormSet resource="invoice-lines" foreignKey="invoiceId" label="Lines">
      <ReferenceField
        source="productId"
        reference="products"
        minWidth={220}
        onValueChange={(value, option, { name }) => {
          if (!name) return;
          const unitPriceName = name.replace(/\.productId$/, ".unitPrice");
          if (value == null) {
            setValue(unitPriceName, undefined, { shouldDirty: true });
            return;
          }
          const price = option?.record?.price;
          if (typeof price === "number") {
            setValue(unitPriceName, price, { shouldDirty: true });
          }
        }}
      />
      <NumberField source="unitPrice" label="Unit price" minWidth={120} />
    </InlineFormSet>
  );
}
```

Reference choices are **cached and deduped** across rows, so multiple inline `ReferenceField`s for the same resource should not each show a loading spinner after the first load.

[← CRUD overview](overview.md) · [← README](../../README.md)
