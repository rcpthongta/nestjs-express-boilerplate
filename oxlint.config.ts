import { defineConfig } from "oxlint";

export default defineConfig({
  ignorePatterns: ["**/*", "!**/", "!**/*.{js,cjs,mjs,ts,cts,mts}"],
  env: {
    node: true
  },
  plugins: ["eslint", "import", "oxc", "promise", "unicorn"],
  categories: {
    correctness: "error"
  },
  overrides: [
    {
      files: ["**/*.{ts,cts,mts}"],
      plugins: ["typescript"]
    }
  ]
});
