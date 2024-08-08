const path = require("path");

module.exports = {
  mode: "production",
  devtool: "source-map",
  target: "node",
  externals: [], // removes node_modules from your final bundle
  entry: "./build/main.js", // make sure this matches the main root of your code
  resolve: {
    extensions: ["", ".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  output: {
    path: path.join(__dirname, "build"), // this can be any path and directory you want
    filename: "server.bundle.js",
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ["ts-loader"],
      },
    ],
  },
};