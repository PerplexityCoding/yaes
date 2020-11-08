module.exports = {
  pages: {
    popup: {
      title: "YAES - Popup",
      entry: "src/popup.js",
      template: "public/popup.html",
      filename: "popup.html",
      chunks: ["chunk-common", "chunk-popup-vendors", "popup"]
    },
    options: {
      title: "YAES - Options",
      entry: "src/options.js",
      template: "public/options.html",
      filename: "options.html",
      chunks: ["chunk-common", "chunk-options-vendors", "options"]
    },
    content: {
      title: "YAES - Background Page",
      entry: "src/background.js",
      template: "public/background.html",
      filename: "background.html",
      chunks: ["chunk-common", "chunk-content-vendors", "content"]
    }
  },
  configureWebpack: {
    devtool: "cheap-module-source-map"
  },
  chainWebpack: config => {
    // config.module.rule("js").uses.delete("babel-loader");

    config.optimization.splitChunks({
      cacheGroups: {
        options: {
          name: `chunk-options-vendors`,
          priority: -11,
          chunks: chunk => chunk.name === "options",
          test: /[\\/]node_modules[\\/]/,
          enforce: true
        },
        popup: {
          name: `chunk-popup-vendors`,
          priority: -11,
          chunks: chunk => chunk.name === "popup",
          test: /[\\/]node_modules[\\/]/,
          enforce: true
        },
        content: {
          name: `chunk-content-vendors`,
          priority: -11,
          chunks: chunk => chunk.name === "content",
          test: /[\\/]node_modules[\\/]/,
          enforce: true
        },
        common: {
          name: "chunk-common",
          priority: -20,
          chunks: "initial",
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    });
  }
};
