# Developing the package next to your app (Vite)

Only needed when hacking on **this** library from another checkout. Consumers **do not** need this when installing from GitHub.

In your app’s `vite.config.ts`:

```ts
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "ding-react-admin": path.resolve(__dirname, "../../ding-react-admin/src"),
    },
  },
});
```

And in `tsconfig.json` / `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "ding-react-admin": ["../../ding-react-admin/src"] }
  }
}
```

Keep `"ding-react-admin": "file:../../ding-react-admin"` in `package.json` so types resolve from the package `dist` when aliases are off.

[← Back to README](../README.md)
