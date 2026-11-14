import { defineConfig } from "oxfmt";

export default defineConfig({
  overrides: [
    {
      files: ["**/*.{js,cjs,mjs,ts,cts,mts}"],
      options: {
        printWidth: 120,
        quoteProps: "consistent",
        singleQuote: false,
        sortImports: true,
        trailingComma: "none"
      }
    },
    {
      files: ["**/*.{json,jsonc}"],
      options: {
        printWidth: 120,
        sortPackageJson: false,
        trailingComma: "none"
      }
    },
    {
      files: ["**/*.md"],
      options: {
        printWidth: 120,
        proseWrap: "preserve"
      }
    }
  ]
});
