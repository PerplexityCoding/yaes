import alias from "rollup-plugin-alias";
import commonjs from "rollup-plugin-commonjs";
import VuePlugin from "rollup-plugin-vue";
import styles from "rollup-plugin-styles";

export default {
  input: "src/content-main.js",
  output: {
    file: "dist/js/content-main.esm.js",
    format: "es"
  },
  plugins: [
    commonjs(),
    VuePlugin(),
    styles(),
    alias({
      resolve: [".js", ".ts"],
      entries: [
        {
          find: "vue",
          replacement: "node_modules/vue/dist/vue.runtime.esm-browser.js"
        }
      ]
    })
  ],
  watch: {
    include: "src/**",
    exclude: "node_modules/**"
  }
};
