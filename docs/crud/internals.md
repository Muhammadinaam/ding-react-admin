# How forms and lists work internally

This library wraps **react-hook-form** + Ant Design. If you know RHF, the form internals should feel familiar.

## Layer diagram (forms)

```
ResourceForm
├── SubmitFieldsProvider     → tracks which sources go to the API
├── FormMetaProvider         → resource, isNew, optional form-wide disabled
└── FormProvider (RHF)
      ├── TextField
      │     └── FieldWrapper
      │           ├── useSubmitField(source)     → add to submit set
      │           ├── useSectionField(source)    → tab/step error grouping
      │           └── Controller name={source}   → value + validation
      └── InlineFormSet
            └── useFieldArray name={arrayName}
                  └── cell({ name }) → TextField name={name} hideLabel
```

## ResourceForm lifecycle

`ResourceForm` is mostly UI (card, back link, Save). Data flow lives in two hooks in `src/crud/utils/useResourceFormData.ts`:

| Step | Hook | What happens |
|------|------|----------------|
| **Load** | `useResourceFormLoad` | Edit: `getOne` parent → optional `loadInlineRows` per `inlines` config → `form.reset` → bump `formVersion` so field arrays remount |
| **Save** | `useResourceFormSubmit` | `pickBySources` (tracked fields only) → strip inline array keys → `create` or `update` parent → `saveInlineRows` for each inline |

Create mode skips the fetch; default values come from the `defaultValues` prop.

Your JSX only declares fields and inline components — load/save orchestration stays in those hooks.

## Field components (`TextField`, etc.)

Each field is a thin wrapper:

1. **`FieldWrapper`** — one `Controller` + Ant Design `Form.Item`
2. Your input — `Input`, `Select`, etc.

Top-level fields use `name={source}` (default). Inline cells pass an explicit nested `name`.

Read `src/crud/fields/TextField.tsx` — that pattern applies to all built-in fields.

## Submit payload (`useSubmitField`)

RHF stores **all** form values. On save, the library sends **only fields you rendered** in JSX.

When a top-level field mounts, `useSubmitField(source)` adds its `source` to a `Set`. On submit:

```ts
pickBySources(values, [...submitFieldsRef.current])
```

- Flat `source="email"` → `{ email: "..." }`
- Nested `source="address.city"` → `{ address: { city: "..." } }`
- Inline array data is **excluded** from the parent payload and saved separately

Nested inline cell names (e.g. `__inline_lines.0.label`) do **not** register for submit — only the parent’s top-level sources do.

If you build a custom field with your own `Controller`, call **`useSubmitField(source)`** (and **`useSectionField(source)`** if the field can appear inside `FormTabs` / `FormSteps`).

## Tab / step errors (`useSectionField`)

`FormTabs` and `FormSteps` track which sources belong to each section. On Save, the first section with validation errors is opened automatically.

`FieldWrapper` calls `useSectionField` for top-level fields. No-op outside tabs/steps.

## Inline rows (`InlineFormSet` / `InlineFormSetStacked`)

Inlines are standard RHF **field arrays**:

| Concept | Implementation |
|---------|----------------|
| Array name | `inlineArrayName(resource, name?)` → e.g. `__inline_invoice_lines` |
| Rows | `useFieldArray({ name: arrayName })` |
| Cell path | `inlineFieldName(arrayName, index, source)` |
| Load / save | `ResourceForm` + `loadInlineRows` / `saveInlineRows` |

**Tabular** (`InlineFormSet`): declare `columns` with a `cell` renderer. Each cell receives the full RHF `name`.

**Stacked** (`InlineFormSetStacked`): `renderRow` receives `row.name("fieldSource")` for each row card.

No context registration — fields render where you put them.

## List pages — why columns still use registration

Forms were simplified to **explicit RHF paths** because fields bind to `Controller` and must not “render elsewhere.”

List pages are different:

| | Forms | Lists |
|---|--------|--------|
| Data binding | react-hook-form `Controller` | Ant Design `Table` reads `dataSource` rows |
| Column definition | `<TextField source="x" />` | `<TextColumn source="x" />` returns **`null`** |
| Collection | `useSubmitField` (submit set) | `useRegisterColumn` → `ListContext` |

**Why keep registration for lists?**

1. **No RHF** — columns only describe how to render each row; there is no dual “form vs inline” mode.
2. **Nice JSX** — you keep declaring `<TextColumn />` / `<TextFilter />` as children of `ResourceList` / `FilterBar`, same as Django admin.
3. **Table builds later** — `ResourceListTable` reads `columns` from context and calls `buildColumn()` when rendering the Ant Design `Table`.

Flow:

```
ResourceList
├── ListContextProvider
│     └── TextColumn → useRegisterColumn(def) → returns null
└── ResourceListTable → columns.map(c => c.buildColumn())
```

Filters work the same way via `FilterContext` + `useRegisterFilter`.

**We intentionally did not** switch lists to an explicit `columns={[...]}` prop (like tabular inlines) — that would be a breaking change with little gain, because list columns never had the confusing dual-render problem.

Custom columns: see [custom-fields.md](custom-fields.md) (`useRegisterColumn` / `useRegisterFilter`).

[← CRUD overview](overview.md) · [← Inlines](inlines.md)
