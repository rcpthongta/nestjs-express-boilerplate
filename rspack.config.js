const fs = require("node:fs");
const path = require("node:path");

const { CopyRspackPlugin, SwcJsMinimizerRspackPlugin } = require("@rspack/core");

const { jsc } = JSON.parse(fs.readFileSync(path.resolve(__dirname, ".swcrc"), "utf8"));

module.exports = function compile(initial) {
  return {
    ...initial,
    output: {
      ...initial.output,
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
      clean: true
    },
    target: "node",
    mode: process.env.NODE_ENV === "development" ? "development" : "production",
    devtool: "source-map",
    module: {
      ...initial.module,
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: "builtin:swc-loader",
            options: {
              jsc,
              sourceMaps: true,
              minify: false
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
            to: "resources"
          }
        ]
      })
    ]
  };
};
