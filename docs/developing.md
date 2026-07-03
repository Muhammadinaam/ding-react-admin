# Developing the package next to your app (Vite)

Only needed when hacking on **this** library from another checkout. Consumers **do not** need this when installing from GitHub.

When you alias `ding-react-admin` to `src`, Vite may resolve peers (`react`, `react-router-dom`, `react-hook-form`, …) from the library folder’s `node_modules` as well as your app’s. Pin them to a single copy so router and form context work (otherwise `<Navigate>` and `useFormContext()` break at runtime).

In your app’s `vite.config.ts`:

```ts
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);

function pkgDir(name: string) {
  return path.dirname(require.resolve(`${name}/package.json`));
}

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
      react: pkgDir("react"),
      "react-dom": pkgDir("react-dom"),
      dayjs: pkgDir("dayjs"),
      "react-router-dom": pkgDir("react-router-dom"),
      "react-hook-form": pkgDir("react-hook-form"),
    },
  },
});
```

`pkgDir` finds each peer wherever your package manager installed it (app `node_modules` or a hoisted monorepo root), so you do not hard-code `node_modules` paths.

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
