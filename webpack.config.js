const path = require("path");

module.exports = {
  // mode: "development",
  watch: true,
  devtool: "inline-source-map",
  entry: "./src/index.ts",
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
    filename: "content_script.js",
    path: path.resolve(__dirname, "build"),
  },
  // devtool: "cheap-module-source-map",
};
