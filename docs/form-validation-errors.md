# Form validation errors (advanced)

Start with [tutorial Section D](tutorial-one-entity.md#section-d--form-validation-errors) — built-in parsers for Django REST, .NET, and Node.

Use this page when your API response is **different**, or you need nested inline errors from a single parent save.

---

## Expected API response (HTTP 400)

For create/update form saves, your backend should return:

| Part | Requirement |
|------|-------------|
| **Status code** | `400 Bad Request` (or `422 Unprocessable Entity`) |
| **Content-Type** | `application/json` |
| **Body shape** | A **JSON object** whose keys are form field names |

Each field value is a string or an array of strings:

```json
{
  "email": ["Enter a valid email address."],
  "code": ["This code is already in use."]
}
```

For errors that are not tied to one field, use a global key such as `non_field_errors` (Django REST) or `detail`:

```json
{
  "non_field_errors": ["Cannot save while this record is locked."]
}
```

Keys must match your form field `source` values — e.g. `<TextField source="email" />` expects `"email"` in the JSON body.

Top-level JSON **arrays** of strings (common in Django list-style `ValidationError`) are normalized automatically to `{ "non_field_errors": ["…"] }`.

---

## Two layers: API body vs HTTP client

Your backend returns the **same JSON** whether the frontend uses fetch, axios, or an OpenAPI client. What differs is how each library **wraps** a failed response on the thrown error.

| Layer | What it is | Example |
|-------|------------|---------|
| **API body** | The validation JSON from your server | `{ "email": ["Enter a valid email address."] }` |
| **Transport error** | How the HTTP client exposes that body | axios: `error.response.data`, fetch/OpenAPI: `error.response` (a `Response` you must `.json()`) |

`ding-react-admin` separates these:

1. **`resolveErrorBody(error)`** — reads the API JSON from any common client shape (sync + async).
2. **`parseDjangoDRFFormErrors` / `parseDotNetFormErrors` / `parseNodeFormErrors`** — map that JSON to form field paths.

On save, **`ResourceForm`** / **`ResourceFormModal`** call `applyApiErrorsToForm`, which runs `resolveErrorBody` first, then your `parseFormError` helper. You usually **do not** need middleware or manual `{ body }` throws when using fetch or OpenAPI-generated clients.

If the response is HTTP 400/422 but the JSON body is **not** in the expected object shape (plain string, unexpected keys, empty object, or non-JSON body), the form shows a **non-standard validation response** message at the top of the form and in the save toast. This helps developers and support see what was received versus the expected `{ "field_name": ["message"] }` format.

---

## Wire a built-in parser

```ts
import {
  combineResourceHandlers,
  parseDjangoDRFFormErrors, // Django REST
  // parseDotNetFormErrors,   // ASP.NET Core ValidationProblemDetails
  // parseNodeFormErrors,     // Express / Joi-style bodies
} from "ding-react-admin";

export function createDataProvider() {
  return combineResourceHandlers(
    { [USER_RESOURCE]: createUserHandlers() },
    { can, parseFormError: parseDjangoDRFFormErrors },
  );
}
```

That is enough for field-level errors to appear under `<TextField source="email" />` when the API returns `{ "email": ["…"] }`.

---

## Supported HTTP client error shapes

`resolveErrorBody` (used automatically on save) and `getErrorBody` (sync, for custom code) understand:

| Client / pattern | Error shape | Notes |
|------------------|-------------|-------|
| Explicit handler throw | `{ body: { email: ["…"] } }` | Playground / in-memory APIs |
| axios | `{ response: { data: { email: ["…"] } } }` | Parsed JSON on `response.data` |
| Some HTTP wrappers | `{ data: { email: ["…"] } }` | Parsed JSON attached directly |
| fetch / OpenAPI generator | `{ response: Response }` | e.g. `ResponseError` — body read via `response.json()` |

If your client uses one of the above, **no extra setup** is required beyond wiring `parseFormError`.

### When you might throw `{ body }` yourself

Optional — only if your client does not expose the shapes above (e.g. a thin wrapper that swallows the response):

```ts
if (!res.ok) {
  throw { body: await res.json() };
}
```

Do **not** add fetch middleware solely to reshape errors for `parseDjangoDRFFormErrors`; use the built-in resolution instead.

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
| **`global`** | Not tied to one field — shown in a persistent error alert at the top of the form, plus the same text in the save error toast when present. |

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

## Custom `parseFormError`

Custom parsers receive an error that `applyApiErrorsToForm` has already normalized when possible (via `resolveErrorBody`). In most cases, `getErrorBody(error)` is enough:

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

If you call `resolveErrorBody` yourself (e.g. outside `ResourceForm`), use the async helper:

```ts
import { resolveErrorBody } from "ding-react-admin";

const body = await resolveErrorBody(caughtError);
if (body) {
  const parsed = parseDjangoDRFFormErrors({ body }, ctx);
}
```

Wire custom parsers the same way:

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

### Helper exports

| Function | Use when |
|----------|----------|
| `resolveErrorBody(error)` | You need the raw API JSON from any client shape (async) |
| `getErrorBody(error)` | Body is already parsed on the error (sync) |
| `describeNonStandardValidationBody(body)` | Build the user-visible hint when the API body is not in the expected shape |
| `asStringMessages`, `finalizeFormErrors`, `flattenNestedArrayErrors` | Building custom parsers |

---

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| Toast only, no field errors | `parseFormError` not passed to `combineResourceHandlers`, or API body keys do not match field `source` |
| "Non-standard validation response…" alert | HTTP 400/422 body is not a JSON object with field keys and string messages — fix the backend response shape |
| Generic client error toast (not handled as validation) | Error is not HTTP 400/422, or the client does not expose one of the supported error shapes |
| Error on wrong field | Backend key differs from form `source`; use a custom `parseFormError` with a field map |
| Duplicate email shows as alert, not under Email | Django model `ValidationError("…")` without a field → `non_field_errors`; raise `ValidationError({"email": "…"})` on the backend |
| Error for a field not on the form | API key has no matching `<TextField source="…" />` — promoted to the form-top alert automatically |

---

## See also

- [tutorial-one-entity.md](tutorial-one-entity.md) — wire `parseFormError` in your data provider
- [crud/inlines.md](crud/inlines.md) — inline forms
- [data-layer-advanced.md](data-layer-advanced.md) — manual handlers

[← Back to README](../README.md)
