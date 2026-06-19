# How forms and lists work internally

This library wraps **react-hook-form** + Ant Design. If you know RHF (`useForm`, `Controller`, `useFieldArray`), forms should feel familiar.

## Layer diagram (forms)

```
ResourceForm
├── PayloadFieldsProvider    → tracks field paths for the save body
├── InlineFieldsRegistry     → inline arrays + column sources for row cleaning
└── FormProvider (RHF)
      ├── TextField
      │     └── FieldWrapper
      │           ├── useRegisterPayloadField(source)
      │           ├── useRegisterSectionField(source)   → tab/step errors
      │           └── Controller name={source}
      └── InlineFormSet field="lines"
            └── useFieldArray({ name: "lines" })
                  └── cell({ name }) → TextField name={name} hideLabel
```

## ResourceForm lifecycle

| Step | What happens |
|------|----------------|
| **Load** | Edit: one `getOne` → `form.reset(record)` (nested `lines` included) → bump `formVersion` so field arrays remount |
| **Save** | `buildResourceFormSubmitBody` (registered fields + inline rows) → JSON or `FormData` if uploads → one `create` or `update` |

Create mode skips the fetch; use `defaultValues` for initial state.

## Field components

Each field is `FieldWrapper` + an Ant Design input. Top-level fields use `name={source}`. Inline cells pass an explicit nested `name` (e.g. `lines.0.label`).

## Save payload (`useRegisterPayloadField`)

RHF stores all form values. On save, only **fields you rendered** are sent.

Top-level fields call `useRegisterPayloadField(source)`. Inline arrays register their `field` name from `InlineFormSet`. On submit:

```ts
buildResourceFormSubmitBody(values, [...payloadFieldsRef.current], inlineRegistry)
```

This calls `buildFormPayload`, merges cleaned inline rows via `buildInlineRowsPayload`, then `prepareFormSubmitBody` (auto `FormData` when any `File`/`Blob` is present).

Custom fields with your own `Controller` should call **`useRegisterPayloadField(source)`** (and **`useRegisterSectionField(source)`** inside tabs/steps).

## Inline rows

| Concept | Implementation |
|---------|----------------|
| Array path | `field="lines"` on `InlineFormSet` |
| Rows | `useFieldArray({ name: field, keyName: "rowKey" })` |
| Cell path | `nestedFieldPath(field, index, source)` |
| Load / save | Same record as parent — one `getOne`, one `create`/`update` |

## List pages

Lists use `useRegisterColumn` → `ListContext` (no RHF). See [custom-fields.md](custom-fields.md).

[← CRUD overview](overview.md) · [← Inlines](inlines.md)
