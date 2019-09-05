const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "adversarial-search.min.js",
    path: path.resolve(__dirname, "dist"),
    library: "adversarialsearch",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
};
