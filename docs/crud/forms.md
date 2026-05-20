# Form pages

```tsx
import { ResourceForm, TextField, ReferenceField } from "ding-react-admin";

export function ProductFormPage() {
  return (
    <ResourceForm resource="products" title="Product" listPath="/products">
      <TextField source="sku" label="SKU" required />
      <TextField source="name" label="Name" required />
      <ReferenceField
        source="brandId"
        label="Brand"
        reference="brands"
        optionLabel="name"
        required
      />
    </ResourceForm>
  );
}
```

Forms use **react-hook-form** under the hood. Layout is plain JSX — wrap fields in Ant Design `Row` / `Col` as needed.

[← CRUD overview](overview.md) · [← README](../../README.md)
