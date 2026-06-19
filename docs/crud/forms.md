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

## Image and file uploads

Use **`ImageField`** and **`FileField`** for backend-agnostic uploads. The form value is one of:

| Value | Meaning |
| --- | --- |
| `File` | Newly selected file (included in the save payload) |
| `string` | Existing URL from the API (shown in edit view; included in payload unless you strip it in your data provider) |
| `null` | Cleared when `clearable` is set (included in payload so the backend can delete the file) |

`ImageField` shows an immediate browser preview via `URL.createObjectURL` for new files, and the existing URL in edit mode. `FileField` shows the file name (linked when the value is a URL).

```tsx
import { FileField, ImageField, ResourceForm, TextField } from "ding-react-admin";

<ResourceForm resource="products" title="Product" listPath="/products">
  <TextField source="name" label="Name" required />
  <ImageField source="photo" label="Photo" clearable />
  <FileField source="datasheet" label="Datasheet" clearable accept=".pdf" />
</ResourceForm>
```

### Automatic multipart

When the save payload contains any `File` or `Blob` (including in inline rows), **`ResourceForm`** and **`ResourceFormModal`** automatically convert the body to **`FormData`** before calling your `DataProvider`. Text-only forms still submit as a plain object.

Nested fields and inline arrays use bracket notation, e.g. `lines[0][label]`, `lines[0][photo]`.

| Form value | In multipart body |
| --- | --- |
| `File` | File part |
| `null` (cleared upload) | Empty string `""` |
| `https://…` (unchanged URL from edit) | Omitted (keeps existing file on server) |
| Other scalars | String |

Your REST handler receives `FormData` — pass it directly to `fetch` and **do not** set `Content-Type` (the browser adds the boundary):

```ts
createRestResourceHandlers({
  create: (data) =>
    fetch("/api/products/", {
      method: "POST",
      body: data instanceof FormData ? data : JSON.stringify(data),
      headers: data instanceof FormData ? undefined : { "Content-Type": "application/json" },
    }).then((r) => r.json()),
  // ...
});
```

Helpers are exported if you need them elsewhere: `hasUploadValues`, `toFormData`, `prepareFormSubmitBody`, `buildResourceFormSubmitBody`.

`transformCreate` / `transformUpdate` on `createRestResourceHandlers` are **not** applied when the body is already `FormData` — apply object transforms before upload fields are present, or build `FormData` yourself in the handler.

## If you know react-hook-form

`ResourceForm` is a thin shell around patterns you already use:

| RHF concept | In ding-react-admin |
|-------------|---------------------|
| `useForm()` | Inside `ResourceForm` — you get `FormProvider` for children |
| `Controller` | Built-in fields via `FieldWrapper` |
| `name` | Top-level: field `source` (e.g. `email`). Inline cells: nested path (e.g. `lines.0.label`) |
| `useFieldArray` | `InlineFormSet` with `field="lines"` |
| `form.reset(record)` | Edit load: one `getOne` with nested rows, then reset |
| Submit body | `buildResourceFormSubmitBody` — JSON object, or `FormData` when uploads are present |

You can use `useFormContext()` in child components (dependent fields, inline helpers) like any RHF app.

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

On Save (client validation or API errors from `parseFormError`), tabs/steps that contain invalid fields are marked in red, the first such tab/step is opened, and focus moves to the first invalid field in that section. Custom fields built with **`FieldWrapper`** participate automatically — see [custom-fields.md](custom-fields.md) and [internals.md](internals.md).

Works with fetch, axios, and OpenAPI-generated clients — see [form-validation-errors.md](../form-validation-errors.md#two-layers-api-body-vs-http-client).

## Validation errors from the API

On save failure, pass a built-in parser to `combineResourceHandlers`:

```ts
import { parseDjangoDRFFormErrors } from "ding-react-admin";

combineResourceHandlers(handlers, { can, parseFormError: parseDjangoDRFFormErrors });
```

Also: `parseDotNetFormErrors`, `parseNodeFormErrors`. Custom APIs: [form-validation-errors.md](../form-validation-errors.md).

[← CRUD overview](overview.md) · [← README](../../README.md)
