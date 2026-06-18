# Inline nested forms (TabularInline / StackedInline)

![Form with inline rows](../assets/form-with-inline.png)

Related rows use **react-hook-form `useFieldArray`**. Each cell gets an explicit RHF `name` (via the `cell` or `renderRow` callback) — no hidden registration.

Pass matching `inlines={[...]}` on `ResourceForm` so child rows load/save with the parent.

## Tabular inline (`InlineFormSet`)

Django TabularInline: one table row per related item, column headers, no duplicate labels in cells.

```tsx
import {
  InlineFormSet,
  NumberField,
  ReferenceField,
  ResourceForm,
  TextField,
} from "ding-react-admin";
import { useFormContext } from "react-hook-form";

function InvoiceLinesInline() {
  const { setValue } = useFormContext();

  return (
    <InlineFormSet
      resource="invoice-lines"
      foreignKey="invoiceId"
      label="Lines"
      columns={[
        {
          source: "productId",
          label: "Product",
          minWidth: 220,
          cell: ({ name }) => (
            <ReferenceField
              source="productId"
              name={name}
              hideLabel
              reference="products"
              onValueChange={(value, option, { name: fieldName }) => {
                const unitPriceName = fieldName.replace(/\.productId$/, ".unitPrice");
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
          ),
        },
        {
          source: "label",
          label: "Label",
          minWidth: 180,
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
      ]}
    />
  );
}

<ResourceForm
  resource="invoices"
  listPath="/invoices"
  inlines={[{ resource: "invoice-lines", foreignKey: "invoiceId" }]}
>
  <TextField source="number" required />
  <InvoiceLinesInline />
</ResourceForm>
```

| Column prop | Purpose |
|-------------|---------|
| `source` | Field key in each row object |
| `label` | Table column header |
| `width` / `minWidth` | Ant Design Table column sizing |
| `cell` | Receives `{ name, index, arrayName }` — pass `name` to the field |

Use **`hideLabel`** on fields in tabular cells (the column header is the label).

## Stacked inline (`InlineFormSetStacked`)

Django StackedInline: each related row in a card with normal field labels.

```tsx
import {
  InlineFormSetStacked,
  NumberField,
  ResourceForm,
  TextField,
} from "ding-react-admin";

<ResourceForm
  resource="invoices"
  listPath="/invoices"
  inlines={[{ resource: "invoice-lines", foreignKey: "invoiceId" }]}
>
  <TextField source="number" required />

  <InlineFormSetStacked
    resource="invoice-lines"
    foreignKey="invoiceId"
    label="Lines"
    sources={["label", "quantity"]}
    renderRow={(row) => (
      <>
        <TextField
          source="label"
          name={row.name("label")}
          label="Label"
          required
        />
        <NumberField
          source="quantity"
          name={row.name("quantity")}
          label="Qty"
          required
          min={0}
        />
      </>
    )}
  />
</ResourceForm>
```

| Prop | Purpose |
|------|---------|
| `sources` | Field keys used when appending an empty row |
| `renderRow` | Receives `{ arrayName, index, name }` — `row.name("label")` builds the RHF path |

## Helpers

```ts
import { inlineArrayName, inlineFieldName } from "ding-react-admin";

inlineArrayName("invoice-lines"); // → __inline_invoice_lines
inlineFieldName("__inline_invoice_lines", 0, "label"); // → __inline_invoice_lines.0.label
```

Custom `name` on the inline component overrides the default array name (must match `inlines` on `ResourceForm`).

## Validation errors

Inline row validation uses the same **`parseFormError`** as the parent form (built-in parsers handle inline row context automatically). Custom mapping: [form-validation-errors.md](../form-validation-errors.md).

Reference choices are **cached and deduped** across rows, so multiple inline `ReferenceField`s for the same resource should not each show a loading spinner after the first load.

See [internals.md](internals.md) for how inlines map to react-hook-form.

[← CRUD overview](overview.md) · [← README](../../README.md)
