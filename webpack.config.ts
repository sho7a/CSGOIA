import path from "path";
import webpack from "webpack";
import Plugin from "./src/plugin";
import ESLintWebpackPlugin from "eslint-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const config: webpack.Configuration = {
  entry: {
    server: path.resolve(__dirname, "src", "main.ts"),
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js",
  },
  resolve: {
    extensions: [ ".js", ".ts" ],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new ESLintWebpackPlugin({
      extensions: [ "js", "ts" ]
    }),
    new CopyWebpackPlugin({
      patterns: [
        { context: path.resolve(__dirname, "assets"), from: "logo.png", to: "." },
        { context: path.resolve(__dirname, "node_modules", "webextension-polyfill", "dist"), from: "browser-polyfill.js", to: "." },
        { context: path.resolve(__dirname, "src"), from: "background.js", to: "." }
      ]
    }),
    new Plugin()
  ]
};

export default config;