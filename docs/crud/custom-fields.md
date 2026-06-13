# Adding a custom field type

The CRUD system uses three parallel component families that share props (`source`, `label`, …) from `src/crud/types.ts`:

1. **Form fields** — `*Field.tsx` in `src/crud/fields/`
2. **Table columns** — `*Column.tsx` in `src/crud/columns/`
3. **List filters** — `*Filter.tsx` in `src/crud/filters/`

You only need the pieces you use (e.g. a read-only column might skip the form field).

## 1. Form field

Use `FieldWrapper` (react-hook-form + Ant Design `Form.Item`) and `useInlineOrFormField` so the same field works in normal forms and inside `InlineFormSet`:

```tsx
// src/crud/fields/ColorField.tsx
import { ColorPicker } from "antd";
import type { BaseSourceProps, FieldRules } from "../types";
import { useInlineOrFormField } from "./useInlineOrFormField";

export type ColorFieldProps = BaseSourceProps & {
  required?: boolean;
  rules?: FieldRules;
};

export function ColorField({ source, label, required, rules }: ColorFieldProps) {
  const field = useInlineOrFormField(
    source,
    label,
    required,
    rules,
    ({ value, onChange, disabled }) => (
      <ColorPicker
        value={value as string | undefined}
        onChange={(_, hex) => onChange(hex)}
        disabled={disabled}
      />
    ),
  );

  if (field.mode === "inline") return null;
  return field.element;
}
```

Export it from `src/crud/index.ts` and `src/index.ts`.

Fields registered through **`FieldWrapper`** (or **`useInlineOrFormField`**, which uses it in normal forms) are also tracked inside **`FormTabs`** / **`FormSteps`** for error highlighting and jumping to the first invalid section on Save. If you wire **`Controller`** yourself, call **`useRegisterFormSource(source)`** so submit, tab/step errors, and section grouping all work.

## 2. Table column

Register with `useRegisterColumn` inside a null-rendering component:

```tsx
// src/crud/columns/ColorColumn.tsx
import { useMemo } from "react";
import { useRegisterColumn } from "../context/ListContext";

export function ColorColumn({ source, label }: { source: string; label?: string }) {
  const def = useMemo(
    () => ({
      key: source,
      source,
      label,
      sortable: false,
      buildColumn: () => ({
        title: label ?? source,
        dataIndex: source,
        key: source,
        render: (v: string) => (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 16,
                height: 16,
                background: v,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
            {v}
          </span>
        ),
      }),
    }),
    [source, label],
  );
  useRegisterColumn(def);
  return null;
}
```

Use inside `<ResourceList>`: `<ColorColumn source="color" label="Color" />`.

## 3. List filter

Register with `useRegisterFilter`:

```tsx
// src/crud/filters/ColorFilter.tsx
import { Input } from "antd";
import { useMemo } from "react";
import { useRegisterFilter } from "../context/FilterContext";

export function ColorFilter({ source, label }: { source: string; label?: string }) {
  const def = useMemo(
    () => ({
      key: source,
      source,
      label,
      render: ({ value, onChange }) => (
        <Input
          allowClear
          placeholder={label ?? source}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value || undefined)}
        />
      ),
    }),
    [source, label],
  );
  useRegisterFilter(def);
  return null;
}
```

Use inside `<FilterBar>` on a list page.

## 4. Fully custom column

For one-off renderers, use `CustomColumn`:

```tsx
<CustomColumn
  source="__actions_extra"
  label="Links"
  render={(row) => <Link to={`/items/${row.id}/preview`}>Preview</Link>}
/>
```

## Tips

- **Reference data:** reuse `useChoices(choices, reference, optionLabel)` from `src/crud/utils/useChoices.ts`.
- **Nested paths:** `display="brand.name"` on columns uses `getByPath`.
- **Permissions:** `ResourceList` respects `usePermissions()` for New / Edit / Delete / bulk delete. Use `actions={{ delete: false }}` etc. to hide built-in buttons even when permitted; use `headerExtra`, `rowActions`, and `bulkActions` for custom controls.
- **Playground:** see `examples/playground/src/pages/` for full examples.

[← CRUD overview](overview.md) · [← README](../../README.md)
