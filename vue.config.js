module.exports = {
  pages: {
    popup: {
      title: "Book-Keeper",
      entry: "src/popup.js",
      template: "public/popup.html",
      filename: "popup.html"
    }
  },
  configureWebpack: {
    devtool: "cheap-module-source-map"
  }
};
