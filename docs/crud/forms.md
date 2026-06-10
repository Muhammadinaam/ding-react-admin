# Form pages

```tsx
import { PasswordField, ResourceForm, TextField, ReferenceField } from "ding-react-admin";

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

## Password fields

Use **`PasswordField`** for a single write-only password input. Pass **`confirmSource`** for a Django-admin-style password + confirm pair (registers both sources for submit):

```tsx
<PasswordField
  source="password1"
  confirmSource="password2"
  label="Password"
  required={isNew}
/>
```

Forms use **react-hook-form** under the hood. Layout is plain JSX — wrap fields in Ant Design `Row` / `Col` as needed.

[← CRUD overview](overview.md) · [← README](../../README.md)
