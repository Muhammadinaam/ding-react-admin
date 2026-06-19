# Form validation errors (advanced)

Start with [tutorial Section D](tutorial-one-entity.md#section-d--form-validation-errors) — built-in parsers for Django REST, .NET, and Node.

Use this page when your API response is **different**, or you need nested inline errors from a single parent save.

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
| **`fields`** | One key per form field path. Value is one message or an array. |
| **`global`** | Not tied to one field — shown as toast. |

**Main form** — keys match field `source`:

```tsx
<TextField source="username" />
```

→ `fields: { username: "Already taken" }`

**Inline rows** — keys match RHF nested paths:

```ts
{
  fields: {
    "lines.0.quantity": "Must be greater than zero",
    "lines.1.label": "Label is required",
  },
}
```

---

## Nested inline errors (one response)

Django REST often returns:

```json
{
  "lines": [
    { "quantity": ["Must be positive"] },
    {},
    { "label": ["Required"] }
  ]
}
```

`parseDjangoDRFFormErrors` **auto-flattens** this to `lines.0.quantity`, `lines.2.label`, etc.

For custom APIs, use `flattenNestedArrayErrors` from the package:

```ts
import { flattenNestedArrayErrors } from "ding-react-admin";

const fields: Record<string, string | string[]> = {};
flattenNestedArrayErrors("lines", body.lines as unknown[], fields);
```

Or build paths with `nestedFieldPath`:

```ts
import { nestedFieldPath } from "ding-react-admin";

nestedFieldPath("lines", 0, "label"); // → lines.0.label
```

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

  return finalizeFormErrors(fields, global);
}
```

Wire it:

```ts
combineResourceHandlers(handlers, { can, parseFormError });
```

---

## Built-in parsers (reference)

| Function | Typical API body |
|----------|------------------|
| `parseDjangoDRFFormErrors` | `{ "email": ["…"], "non_field_errors": ["…"] }` — nested inline arrays auto-flattened |
| `parseDotNetFormErrors` | `{ "errors": { "Email": ["…"] } }` — optional `fieldMap`, `camelCase` |
| `parseNodeFormErrors` | `{ errors: { email: ["…"] } }` or `[{ path, msg }]` or Joi `details` |

---

## See also

- [tutorial-one-entity.md](tutorial-one-entity.md) — wire `parseFormError` in your data provider
- [crud/inlines.md](crud/inlines.md) — inline forms
- [data-layer-advanced.md](data-layer-advanced.md) — manual handlers

[← Back to README](../README.md)
