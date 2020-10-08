import alias from "rollup-plugin-alias";
import commonjs from "rollup-plugin-commonjs";
import VuePlugin from "rollup-plugin-vue";
import scss from 'rollup-plugin-scss'

export default {
  input: "src/content-main.js",
  output: {
    file: "dist/js/content-main.esm.js",
    format: "es"
  },
  plugins: [
    commonjs(),
    VuePlugin({
      css: false
    }),
    scss(),
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
