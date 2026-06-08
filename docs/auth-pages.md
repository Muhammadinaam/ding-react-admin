# Login & registration layout

Shared UI for guest/public auth screens:

- **`AuthPageLayout`** — full-height shell, optional **`ThemeToolbar`** top-right, **`brand`** centered above the card, **`footer`** below the card.
- **`AuthAlternateLink`** — “Don’t have an account? **Register**” style row (React Router `Link`).
- **`LoginPage`** — sign-in card; pass **`brand`** and **`alternateAuth`** for the register link. On submit, the full form values are passed to **`useAuth().login`** as **`LoginCredentials`** (`username`, `password`, plus any fields from **`extraFields`**).

## Custom login fields

Add fields with **`extraFields`** on **`LoginPage`**, or build your own page with **`AuthPageLayout`**. Read extra keys in your **`AuthAdapter.login`** implementation:

```tsx
import type { AuthAdapter, LoginCredentials } from "ding-react-admin";

const authAdapter: AuthAdapter = {
  async login(credentials: LoginCredentials) {
    const businessId = String(credentials.businessId ?? "");
    // call your API with businessId, credentials.username, credentials.password
  },
  logout() { /* ... */ },
  getToken() { /* ... */ },
};
```

## Example

```tsx
import { Typography } from "antd";
import { LoginPage, AuthPageLayout, AuthAlternateLink } from "ding-react-admin";

const brand = <Typography.Title level={3} style={{ margin: 0 }}>My App</Typography.Title>;

const routes = [
  {
    path: "login",
    access: "guest",
    element: (
      <LoginPage
        brand={brand}
        alternateAuth={{
          prompt: "Don't have an account?",
          linkText: "Create account",
          to: "/register",
        }}
      />
    ),
  },
  {
    path: "register",
    access: "public",
    element: (
      <YourRegisterPage
        brand={brand}
        alternateAuth={{
          prompt: "Already have an account?",
          linkText: "Sign in",
          to: "/login",
        }}
      />
    ),
  },
];
```

Custom registration pages can wrap their form in **`AuthPageLayout`** the same way as `LoginPage`.

[← Back to README](../README.md)
