const webpack = require("webpack");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";
const isReleasing = !!process.env.VERSION;
const cypress = process.env.CYPRESS;

const sentryRelease = `yaes@${process.env.npm_package_version}`;

const webpackPlugins = [
  new webpack.EnvironmentPlugin({
    SENTRY_RELEASE: sentryRelease,
  }),
];

if (isReleasing) {
  webpackPlugins.push(
    new SentryWebpackPlugin({
      // sentry-cli configuration
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "magl",
      project: "yaes",

      // webpack specific configuration
      release: sentryRelease,
      include: "./dist",
      ignore: ["node_modules", "vue.config.js"],
    })
  );
}

module.exports = {
  pages: {
    popup: {
      title: "YAES - Popup",
      entry: "src/popup.js",
      template: cypress ? "public/popup-cypress.html" : "public/popup.html",
      filename: "popup.html",
      chunks: ["chunk-popup-vendors", "popup"],
    },
    options: {
      title: "YAES - Options",
      entry: "src/options.js",
      template: cypress ? "public/options-cypress.html" : "public/options.html",
      filename: "options.html",
      chunks: ["chunk-options-vendors", "options"],
    },
    "options-privacy": {
      title: "YAES - Options",
      entry: "src/options.js",
      template: "public/options-privacy.html",
      filename: "options-privacy.html",
      chunks: ["chunk-options-vendors", "options"],
    },
    content: {
      title: "YAES - Background Page",
      entry: "src/background.js",
      template: "public/background.html",
      filename: "background.html",
      chunks: ["chunk-content-vendors", "content"],
    },
  },
  configureWebpack: {
    devtool: isDevelopment ? "cheap-module-source-map" : "source-map",
    plugins: webpackPlugins,
  },
  chainWebpack: (config) => {
    // config.module.rule("js").uses.delete("babel-loader");

    config.optimization.splitChunks({
      cacheGroups: {
        options: {
          name: `chunk-options-vendors`,
          priority: -11,
          chunks: (chunk) => chunk.name === "options" || chunk.name === "options-privacy",
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
        },
        popup: {
          name: `chunk-popup-vendors`,
          priority: -11,
          chunks: (chunk) => chunk.name === "popup",
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
        },
        content: {
          name: `chunk-content-vendors`,
          priority: -11,
          chunks: (chunk) => chunk.name === "content",
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
        },
      },
    });

    if (config.plugins.has("prefetch-popup")) {
      config.plugin("prefetch-popup").tap((options) => {
        options[0].fileBlacklist = [/\.map$/, /sentry/];
        return options;
      });
    }
  },
};
