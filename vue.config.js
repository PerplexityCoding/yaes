module.exports = {
  pages: {
    popup: {
      title: "YAES - Popup",
      entry: "src/popup.js",
      template: "public/popup.html",
      filename: "popup.html"
    },
    options: {
      title: "YAES - Options",
      entry: "src/options.js",
      template: "public/options.html",
      filename: "options.html"
    },
    content: {
      title: "YAES - Background Page",
      entry: "src/background.js",
      template: "public/background.html",
      filename: "background.html"
    }
  },
  configureWebpack: {
    devtool: "cheap-module-source-map"
  }
};
