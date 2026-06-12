# Form validation errors (advanced)

Start with [tutorial Section D](tutorial-one-entity.md#section-d--form-validation-errors) — built-in parsers for Django REST, .NET, and Node.

Use this page when your API response is **different**, or you need nested inline errors from a **single** parent save.

---

## What `parseFormError` must return

```ts
{
  fields?: {
    [fieldPath: string]: string | string[];
  };
  global?: string | string[];
}
```

| Part | Meaning |
|------|---------|
| **`fields`** | One key per form field. Value is one message or an array. |
| **`global`** | Not tied to one field — shown as toast. |

**Main form** — keys match field `source`:

```tsx
<TextField source="username" />
```

→ `fields: { username: "Already taken" }`

**Inline rows** — flat dot paths (not nested objects):

```ts
{
  fields: {
    "__inline_invoice_lines.0.quantity": "Must be greater than zero",
    "__inline_invoice_lines.1.label": "Label is required",
  },
}
```

---

## Inline prefix (`__inline_invoice_lines`)

You usually **do not memorize it**.

When **one inline row** fails, `parseFormError` receives **`context.inlineArrayName`** and **`context.rowIndex`**. Built-in parsers use them automatically.

```ts
// context when row 2 failed:
// { inlineArrayName: "__inline_invoice_lines", rowIndex: 2, ... }
```

If your API returns `{ quantity: "Too small" }` for that row, built-in parsers prepend the row path so the form shows the error on the right cell.

When you map a **nested API response yourself** (many rows in one payload), compute the prefix:

```ts
import { inlineArrayName } from "ding-react-admin";

inlineArrayName("invoice-lines"); // → "__inline_invoice_lines"
inlineArrayName("invoice-lines", "myLines"); // InlineFormSet name="myLines"
```

Default: `__inline_` + resource with `-` / `/` → `_`. Custom `name` on `InlineFormSet` overrides that.

---

## Pass the API body on the error

Handlers should attach JSON so parsers can read it:

```ts
if (!res.ok) {
  throw { body: await res.json() };
}
```

Also works with axios-style `error.response.data` via `getErrorBody`.

---

## Custom `parseFormError`

```ts
import type {
  FormValidationErrors,
  ParseFormErrorContext,
} from "ding-react-admin";
import {
  applyInlineFieldPaths,
  asStringMessages,
  finalizeFormErrors,
  getErrorBody,
} from "ding-react-admin";

export function parseFormError(
  error: unknown,
  ctx: ParseFormErrorContext,
): FormValidationErrors | null {
  const body = getErrorBody(error);
  if (!body) return null;

  const fields: Record<string, string | string[]> = {};
  const global: string[] = [];

  for (const [key, value] of Object.entries(body)) {
    if (key === "form" || key === "detail") {
      global.push(...asStringMessages(value));
      continue;
    }
    const msgs = asStringMessages(value);
    if (msgs.length) {
      fields[key] = msgs.length === 1 ? msgs[0] : msgs;
    }
  }

  return finalizeFormErrors(fields, global, ctx);
}
```

Wire it:

```ts
combineResourceHandlers(handlers, { can, parseFormError });
```

### Nested inline errors in one response

If the API returns an array of row errors:

```json
{
  "invoice_lines": [
    { "quantity": ["Must be positive"] },
    {},
    { "label": ["Required"] }
  ]
}
```

Flatten in your parser:

```ts
import { inlineArrayName } from "ding-react-admin";

const prefix = inlineArrayName("invoice-lines");
const rows = body.invoice_lines as unknown[];
if (Array.isArray(rows)) {
  rows.forEach((row, index) => {
    if (!row || typeof row !== "object") return;
    for (const [source, value] of Object.entries(row as Record<string, unknown>)) {
      const msgs = asStringMessages(value);
      if (msgs.length) {
        fields[`${prefix}.${index}.${source}`] =
          msgs.length === 1 ? msgs[0] : msgs;
      }
    }
  });
}
```

---

## Built-in parsers (reference)

| Function | Typical API body |
|----------|------------------|
| `parseDjangoDRFFormErrors` | `{ "email": ["…"], "non_field_errors": ["…"] }` |
| `parseDotNetFormErrors` | `{ "errors": { "Email": ["…"] } }` — optional `fieldMap`, `camelCase` |
| `parseNodeFormErrors` | `{ errors: { email: ["…"] } }` or `[{ path, msg }]` or Joi `details` |

Options example:

```ts
parseFormError: (error, ctx) =>
  parseDotNetFormErrors(error, ctx, {
    fieldMap: { Email: "email" },
  }),
```

---

## See also

- [tutorial-one-entity.md](tutorial-one-entity.md) — wire `parseFormError` in your data provider
- [crud/inlines.md](crud/inlines.md) — inline forms
- [data-layer-advanced.md](data-layer-advanced.md) — manual handlers

[← Back to README](../README.md)
