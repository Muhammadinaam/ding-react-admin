import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

/** Resolve a package root whether deps are hoisted to the repo root or installed locally. */
function pkgDir(name: string) {
  return path.dirname(require.resolve(`${name}/package.json`));
}

export default defineConfig({
  plugins: [react()],
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
      "ding-react-admin": path.resolve(__dirname, "../../src"),
      react: pkgDir("react"),
      "react-dom": pkgDir("react-dom"),
      dayjs: pkgDir("dayjs"),
      "react-router-dom": pkgDir("react-router-dom"),
      "react-hook-form": pkgDir("react-hook-form"),
    },
  },
});
