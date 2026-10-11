import js from "@eslint/js";
import markdown from "@eslint/markdown";

import jsonc from "eslint-plugin-jsonc";
import prettier from "eslint-plugin-prettier/recommended";
import promise from "eslint-plugin-promise";
import sonarjs from "eslint-plugin-sonarjs";
import yml from "eslint-plugin-yml";
import eslint from "eslint/config";
import globals from "globals";
import typescript from "typescript-eslint";

const jsFiles = ["**/*.js", "**/*.cjs", "**/*.mjs"];
const tsFiles = ["**/*.ts", "**/*.cts", "**/*.mts"];
const sourceFiles = [...jsFiles, ...tsFiles];

export default eslint.defineConfig(
  eslint.globalIgnores(["**/node_modules/*", "**/.npmrc", "**/package-lock.json"]),
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2023
      }
    }
  },
  {
    files: jsFiles,
    plugins: {
      js
    },
    extends: [js.configs.recommended]
  },
  {
    files: tsFiles,
    plugins: {
      "@typescript-eslint": typescript.plugin
    },
    extends: [typescript.configs.recommended],
    languageOptions: {
      parser: typescript.parser,
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: import.meta.dirname
      },
      sourceType: "module"
    }
  },
  {
    ...sonarjs.configs.recommended,
    files: sourceFiles
  },
  {
    files: sourceFiles,
    plugins: {
      promise
    },
    extends: [promise.configs["flat/recommended"]],
    rules: {
      "promise/always-return": [
        "error",
        {
          ignoreLastCallback: true
        }
      ],
      "promise/no-callback-in-promise": "error",
      "promise/no-multiple-resolved": "error",
      "promise/no-nesting": "error",
      "promise/no-promise-in-callback": "error",
      "promise/no-return-in-finally": "error",
      "promise/spec-only": "error",
      "promise/valid-params": "error"
    }
  },
  {
    files: ["**/*.json"],
    plugins: {
      jsonc
    },
    extends: [jsonc.configs["recommended-with-json"]],
    language: "jsonc/json"
  },
  {
    files: ["**/*.yaml", "**/*.yml"],
    plugins: {
      yml
    },
    extends: [yml.configs.recommended],
    language: "yml/yaml",
    languageOptions: {
      parserOptions: {
        defaultYAMLVersion: "1.2"
      }
    },
    rules: {
      "yml/block-mapping": "error",
      "yml/block-mapping-question-indicator-newline": "error",
      "yml/block-sequence-hyphen-indicator-newline": "error",
      "yml/block-sequence": "error",
      "yml/file-extension": [
        "error",
        {
          extension: "yml"
        }
      ],
      "yml/flow-mapping-curly-newline": "error",
      "yml/flow-mapping-curly-spacing": "error",
      "yml/flow-sequence-bracket-newline": "error",
      "yml/flow-sequence-bracket-spacing": "error",
      "yml/indent": "error",
      "yml/key-spacing": "error",
      "yml/no-multiple-empty-lines": "error",
      "yml/no-trailing-zeros": "error",
      "yml/plain-scalar": "error",
      "yml/quotes": "error",
      "yml/spaced-comment": "error"
    }
  },
  {
    files: ["**/*.md"],
    plugins: {
      markdown
    },
    extends: [markdown.configs.recommended],
    language: "markdown/gfm"
  },
  {
    ...prettier,
    files: sourceFiles
  }
);
