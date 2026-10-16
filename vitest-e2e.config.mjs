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
    include: ["e2e/**/*.e2e-spec.ts"],
    fileParallelism: false,
    testTimeout: 30000,
    hookTimeout: 30000
  },
  plugins: [
    swc.vite({
      module: { type: "es6" }
    })
  ]
});
