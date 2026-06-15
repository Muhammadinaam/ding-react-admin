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

## Tabbed and stepped forms

Use **`FormTabs`** / **`FormTab`** or **`FormSteps`** / **`FormStep`** to split long forms. Fields stay registered across hidden tabs/steps so Save validates the whole form.

| Tabbed form (full page) | Stepped form (modal) |
| --- | --- |
| ![Non-modal tabbed form](../assets/non-modal-form-tabbed.png) | ![Modal form with steps](../assets/modal-form-stepped.png) |

```tsx
import { FormTab, FormTabs, ResourceForm, TextField } from "ding-react-admin";

<ResourceForm resource="customers" title="Customer" listPath="/customers">
  <FormTabs>
    <FormTab key="company" label="Company">
      <TextField source="code" label="Code" required />
    </FormTab>
    <FormTab key="contact" label="Contact">
      <TextField source="email" label="Email" />
    </FormTab>
  </FormTabs>
</ResourceForm>
```

```tsx
import { FormStep, FormSteps, ResourceForm, TextField } from "ding-react-admin";

<ResourceForm resource="orders" title="Order" listPath="/orders">
  <FormSteps>
    <FormStep title="Header">
      <TextField source="number" label="Number" required />
    </FormStep>
    <FormStep title="Details">
      <TextField source="notes" label="Notes" />
    </FormStep>
  </FormSteps>
</ResourceForm>
```

On Save (client validation or API errors from `parseFormError`), tabs/steps that contain invalid fields are marked in red, the first such tab/step is opened, and focus moves to the first invalid field in that section. Custom fields built with **`FieldWrapper`** or **`useInlineOrFormField`** participate automatically — see [custom-fields.md](custom-fields.md).

## Validation errors from the API

On save failure, pass a built-in parser to `combineResourceHandlers`:

```ts
import { parseDjangoDRFFormErrors } from "ding-react-admin";

combineResourceHandlers(handlers, { can, parseFormError: parseDjangoDRFFormErrors });
```

Also: `parseDotNetFormErrors`, `parseNodeFormErrors`. Custom APIs: [form-validation-errors.md](../form-validation-errors.md).

[← CRUD overview](overview.md) · [← README](../../README.md)
