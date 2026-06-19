# Inline nested forms (TabularInline / StackedInline)

Form with inline rows

Related rows are standard **react-hook-form `useFieldArray`** data on the same record — e.g. `lines.0.label`. One `getOne` loads parent + rows; one `create`/`update` saves them together.

Your API must return nested rows on `**getOne**` and accept them on `**create`/`update**`:

```json
{
  "id": 1,
  "number": "INV-1001",
  "customer": "Northwind",
  "lines": [{ "id": 10, "label": "Service", "quantity": 1, "unitPrice": 120 }]
}
```

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
      field="lines"
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

<ResourceForm resource="invoices" listPath="/invoices">
  <TextField source="number" required />
  <InvoiceLinesInline />
</ResourceForm>
```


| Prop             | Purpose                                                       |
| ---------------- | ------------------------------------------------------------- |
| `**field**`      | RHF `useFieldArray` name and default API key (e.g. `"lines"`) |
| `label`          | Section heading                                               |
| `payloadKey`     | API key when different from `field` (e.g. `invoice_lines`)    |
| `transformRows`  | `(rows) => unknown` for custom nested shape                   |
| `columns[].cell` | Receives `{ name, index, field }` — pass `name` to the field  |


Use `**hideLabel**` on fields in tabular cells (the column header is the label).

## Stacked inline (`InlineFormSetStacked`)

Django StackedInline: each related row in a card with normal field labels.

```tsx
<InlineFormSetStacked
  field="lines"
  label="Lines"
  sources={["label", "quantity"]}
  renderRow={(row) => (
    <>
      <TextField source="label" name={row.name("label")} label="Label" required />
      <NumberField source="quantity" name={row.name("quantity")} label="Qty" required min={0} />
    </>
  )}
/>
```

## Helper

```ts
import { nestedFieldPath } from "ding-react-admin";

nestedFieldPath("lines", 0, "label"); // → lines.0.label
```

## Validation errors

Inline errors use the same RHF paths (`lines.0.quantity`). Built-in `parseDjangoDRFFormErrors` flattens nested array responses automatically. Save errors work with fetch, axios, and OpenAPI clients — see [form-validation-errors.md](../form-validation-errors.md).

[← CRUD overview](overview.md) · [← README](../../README.md)