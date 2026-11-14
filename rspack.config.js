import fs from "node:fs";
import passes from "node:process";
import url from "node:url";

import { CopyRspackPlugin, SwcJsMinimizerRspackPlugin } from "@rspack/core";

const swcOptions = JSON.parse(fs.readFileSync(new URL("./.swcrc", import.meta.url), "utf8"));

export default function compile(initial) {
  return {
    ...initial,
    target: "node26",
    mode: ["local", "development"].includes(passes.env.NODE_ENV) ? "development" : "production",
    devtool: "source-map",
    experiments: {
      ...initial.experiments,
      outputModule: true
    },
    output: {
      ...initial.output,
      filename: "main.js",
      path: url.fileURLToPath(new URL("./dist", import.meta.url)),
      module: true,
      library: {
        type: "module"
      },
      chunkFormat: "module",
      chunkLoading: "import",
      clean: true
    },
    module: {
      ...initial.module,
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          type: "javascript/esm",
          use: {
            loader: "builtin:swc-loader",
            options: {
              ...swcOptions,
              swcrc: false
            }
          }
        }
      ]
    },
    optimization: {
      ...initial.optimization,
      minimizer: [
        new SwcJsMinimizerRspackPlugin({
          extractComments: false,
          minimizerOptions: {
            compress: {
              passes: 2,
              keep_classnames: true,
              keep_fnames: true
            },
            format: {
              comments: false
            },
            mangle: {
              keep_classnames: true,
              keep_fnames: true
            }
          }
        })
      ]
    },
    plugins: [
      ...initial.plugins,
      new CopyRspackPlugin({
        patterns: [
          {
            from: "resources",
            to: "resources",
            noErrorOnMissing: true
          }
        ]
      })
    ]
  };
}
