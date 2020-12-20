import path from "path";
import alias from "@rollup/plugin-alias";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import injectProcessEnv from "rollup-plugin-inject-process-env";

const projectRootDir = path.resolve(__dirname);

const sentryRelease = `yaes@${process.env.npm_package_version}`;

module.exports = {
  input: "src/background.js",
  output: {
    dir: "dist",
    format: "es",
  },
  plugins: [
    alias({
      entries: [{ find: "@", replacement: path.resolve(projectRootDir, "src") }],
    }),
    commonjs(),
    injectProcessEnv({
      SENTRY_RELEASE: sentryRelease,
      NODE_ENV: process.env.NODE_ENV,
    }),
    nodeResolve({
      preferBuiltins: false,
    }),
  ],
};
