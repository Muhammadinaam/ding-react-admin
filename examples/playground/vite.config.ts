import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Pin shared deps so aliased `../../src` lib code does not resolve a second copy from the repo root. */
const reactRoot = path.resolve(__dirname, "node_modules/react");
const reactDomRoot = path.resolve(__dirname, "node_modules/react-dom");
const dayjsRoot = path.resolve(__dirname, "node_modules/dayjs");

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom", "dayjs"],
    alias: {
      "ding-react-admin": path.resolve(__dirname, "../../src"),
      react: reactRoot,
      "react-dom": reactDomRoot,
      dayjs: dayjsRoot,
    },
  },
});
