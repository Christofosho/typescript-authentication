import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

import { fileURLToPath } from "url";
import path from "path";

const __basePath = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: "development",
  entry: "./client/client.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.join(__basePath, "public"),
    filename: "bundle.[contenthash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./templates/index.html",
      inject: "body",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__basePath, "templates", "index.css"),
          to: path.join(__basePath, "public", "index.css"),
        }
      ]
    }),
  ],
};