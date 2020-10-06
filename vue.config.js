module.exports = {
  pages: {
    popup: {
      title: "Book-Keeper",
      entry: "src/popup.js",
      template: "public/popup.html",
      filename: "popup.html"
    },
    options: {
      title: "Book-Keeper",
      entry: "src/options.js",
      template: "public/options.html",
      filename: "options.html"
    }
  },
  configureWebpack: {
    devtool: "cheap-module-source-map"
  }
};
