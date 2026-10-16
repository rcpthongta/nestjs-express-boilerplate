import swc from "unplugin-swc";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["reflect-metadata"],
    root: "./",
    include: ["src/**/*.spec.ts"],
    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage",
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.module.ts", "src/**/*.spec.ts", "src/**/index.ts", "src/**/main.ts"],
      thresholds: {
        statements: 85,
        branches: 85,
        functions: 85,
        lines: 85
      }
    }
  },
  plugins: [
    swc.vite({
      module: { type: "es6" }
    })
  ]
});
