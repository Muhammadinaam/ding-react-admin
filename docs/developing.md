# Developing the package next to your app (Vite)

Only needed when hacking on **this** library from another checkout. Consumers **do not** need this when installing from GitHub.

When you alias `ding-react-admin` to `src`, Vite may resolve peers (`react`, `react-router-dom`, `react-hook-form`, …) from the library folder’s `node_modules` as well as your app’s. Pin them to a single copy so router and form context work (otherwise `<Navigate>` and `useFormContext()` break at runtime).

In your app’s `vite.config.ts`:

```ts
import path from "node:path";

export default defineConfig({
  resolve: {
    dedupe: [
      "react",
      "react-dom",
      "dayjs",
      "react-router",
      "react-router-dom",
      "react-hook-form",
    ],
    alias: {
      "ding-react-admin": path.resolve(__dirname, "../../ding-react-admin/src"),
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      dayjs: path.resolve(__dirname, "node_modules/dayjs"),
      "react-router-dom": path.resolve(__dirname, "node_modules/react-router-dom"),
      "react-hook-form": path.resolve(__dirname, "node_modules/react-hook-form"),
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
