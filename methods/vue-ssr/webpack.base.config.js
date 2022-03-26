const path = require("path");
const webpack = require("webpack");
const vueConfig = require("./vue.loader.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: false,
  plugins: [new MiniCssExtractPlugin()],
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "index.js",
  },
  resolve: {
    alias: {
      public: path.resolve(__dirname, "../public")
    }
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [ 
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[name].[ext]?[hash]"
        }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      }
    ]
  },
};
