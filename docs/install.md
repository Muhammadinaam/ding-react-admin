# Install

[`ding-react-admin` on npm](https://www.npmjs.com/package/ding-react-admin) ships as a prebuilt library (`dist/index.js`). **No Vite alias or other bundler config is required** — import it like any other package. Component styles (scrollbars, nav menu labels) are bundled automatically when you import from `ding-react-admin`; your bundler must process CSS imports from `node_modules` (Vite and webpack do this by default). If styles are missing, add `import "ding-react-admin/style.css"` once in your app entry.

Your app must install **peer dependencies** yourself. Yarn 1 and many setups do **not** install peers automatically when you add only this package. Pick the command that matches your package manager and whether `react` / `react-dom` are already in your project.

The versions below match the [playground](../examples/playground/package.json) — what this repo is tested against. Newer versions within the [peer ranges](#peer-dependencies-minimum-versions) usually work; if something breaks, align with the playground first.

## Yarn

### New project (no React yet)

```bash
yarn add ding-react-admin@^2.0.0 \
  react@^19.2.5 \
  react-dom@^19.2.5 \
  antd@^6.0.0 \
  @ant-design/icons@^6.0.0 \
  dayjs@^1.11.13 \
  react-hook-form@^7.56.4 \
  react-router-dom@^7.14.2
```

### Existing project (React already installed)

```bash
yarn add ding-react-admin@^2.0.0 \
  antd@^6.0.0 \
  @ant-design/icons@^6.0.0 \
  dayjs@^1.11.13 \
  react-hook-form@^7.56.4 \
  react-router-dom@^7.14.2
```

## npm

### New project (no React yet)

```bash
npm install ding-react-admin@^2.0.0 \
  react@^19.2.5 \
  react-dom@^19.2.5 \
  antd@^6.0.0 \
  @ant-design/icons@^6.0.0 \
  dayjs@^1.11.13 \
  react-hook-form@^7.56.4 \
  react-router-dom@^7.14.2
```

### Existing project (React already installed)

```bash
npm install ding-react-admin@^2.0.0 \
  antd@^6.0.0 \
  @ant-design/icons@^6.0.0 \
  dayjs@^1.11.13 \
  react-hook-form@^7.56.4 \
  react-router-dom@^7.14.2
```

## Peer dependencies (minimum versions)

| Package | Minimum | Tested in playground |
|---------|---------|----------------------|
| `react` | 18+ | `^19.2.5` |
| `react-dom` | 18+ | `^19.2.5` |
| `react-router-dom` | 6+ | `^7.14.2` |
| `react-hook-form` | 7+ | `^7.56.4` |
| `dayjs` | 1+ | `^1.11.13` |
| `antd` | 6+ | `^6.0.0` |
| `@ant-design/icons` | 6+ | `^6.0.0` |

Ant Design is a **peer**, not bundled inside this library — your app installs one copy of `antd` and shares it with `ding-react-admin`. That avoids duplicate React/Ant Design instances and keeps bundle size down.

**Ant Design 6** requires React 18+ and includes native React 19 support (no compatibility patch needed).

## What you do **not** need

- **Vite alias** to library source — only for [developing the package next to your app](developing.md).
- **Separate Ant Design install workaround** — just add `antd` and `@ant-design/icons` as shown above.

## Next steps

- **Full CRUD walkthrough:** [tutorial-one-entity.md](tutorial-one-entity.md) — create a Vite app, install this package, add a Users page step by step.
- **Minimal shell only:** [quick-start.md](quick-start.md).

## Installing from GitHub

Use this for an unreleased commit, a fork, or when npm is unavailable.

**Existing project (React already installed):**

```bash
yarn add https://github.com/Muhammadinaam/ding-react-admin.git \
  antd@^6.0.0 \
  @ant-design/icons@^6.0.0 \
  dayjs@^1.11.13 \
  react-hook-form@^7.56.4 \
  react-router-dom@^7.14.2
```

Pin a release tag or commit:

```bash
yarn add https://github.com/Muhammadinaam/ding-react-admin.git#v2.0.6 \
  antd@^6.0.0 \
  @ant-design/icons@^6.0.0 \
  dayjs@^1.11.13 \
  react-hook-form@^7.56.4 \
  react-router-dom@^7.14.2
```

For a fork, commit `dist/` or run `yarn && yarn build` in the repo before installing. Consumers resolve `exports` → `dist/index.js` + types.

[← Back to README](../README.md)
