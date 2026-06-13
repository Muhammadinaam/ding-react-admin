# Install

`ding-react-admin` ships as a prebuilt library (`dist/index.js`). **No Vite alias or other bundler config is required** when installing from GitHub or npm — import it like any other package.

## One-shot install (recommended)

Your app must install **peer dependencies** yourself. Yarn 1 and many setups do **not** install peers automatically when you add only this package.

If you already have a React app (`react`, `react-dom`), run:

```bash
yarn add https://github.com/Muhammadinaam/ding-react-admin.git \
  antd@^6.0.0 \
  @ant-design/icons@^6.0.0 \
  dayjs@^1.11.13 \
  react-hook-form@^7.56.4 \
  react-router-dom@^7.14.2
```

New app (includes React):

```bash
yarn add https://github.com/Muhammadinaam/ding-react-admin.git \
  react@^19.2.5 \
  react-dom@^19.2.5 \
  antd@^6.0.0 \
  @ant-design/icons@^6.0.0 \
  dayjs@^1.11.13 \
  react-hook-form@^7.56.4 \
  react-router-dom@^7.14.2
```

These versions match the [playground](../examples/playground/package.json) and are the versions this repo is tested against. Newer versions within the ranges below usually work; if something breaks, align with the playground first.

Pin a release tag or commit:

```bash
yarn add https://github.com/Muhammadinaam/ding-react-admin.git#v0.1.0 \
  antd@^6.0.0 \
  @ant-design/icons@^6.0.0 \
  dayjs@^1.11.13 \
  react-hook-form@^7.56.4 \
  react-router-dom@^7.14.2
```

npm equivalent:

```bash
npm install https://github.com/Muhammadinaam/ding-react-admin.git \
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

## Installing from a fork

Commit `dist/` in your fork, or run `yarn && yarn build` in the repo before installing. Consumers resolve `exports` → `dist/index.js` + types.

[← Back to README](../README.md)
