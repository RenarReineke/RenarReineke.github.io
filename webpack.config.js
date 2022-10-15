const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const buildPath = path.resolve(__dirname, "dist");
const contentPath = path.resolve(__dirname, "pages/main");
const assetsPath = path.resolve(__dirname, "assets");
const pagesPath = path.resolve(__dirname, "pages");

const isProd = process.env.NODE_ENV === "production";

const getSettingsForStyles = () => {
  return [
    "style-loader",
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["autoprefixer"],
        },
      },
    },
    "sass-loader",
  ];
};

module.exports = {
  entry: {
    main: path.join(contentPath, "script.js"),
    donate: path.join(pagesPath, "donate/script.js"),
  },
  target: process.env.NODE_ENV ? "web" : "browserslist",
  devtool: isProd ? "hidden-source-map" : "eval-source-map",
  output: {
    filename: "[name]bundle.js",
    path: buildPath,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,

        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(contentPath, "index.html"),
      filename: "index.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(pagesPath, "donate/index.html"),
      filename: "donate.html",
      chunks: ["donate"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css",
    }),
  ].filter(Boolean),
  resolve: {
    extensions: [".js"],
    alias: {
      "@components": path.resolve(__dirname, "components"),
      "@styles": path.join(assetsPath, "styles"),
      "@fonts": path.join(assetsPath, "fonts"),
      "@icons": path.join(assetsPath, "icons"),
      "@images": path.join(assetsPath, "images"),
      "@pages": pagesPath,
    },
  },
  devServer: {
    host: "127.0.0.1",
    port: "9000",
    hot: true,
    liveReload: true,
    historyApiFallback: true,
  },
  mode: "development",
};
