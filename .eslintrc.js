module.exports = {
  root: true,
  env: {
    node: true,
    webextensions: true,
  },
  extends: ["plugin:vue/vue3-strongly-recommended", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
  plugins: ["cypress"],
  overrides: [
    {
      files: [
        "./jest.setup.js",
        "*.config.js",
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
        "**/__mocks__/*.js",
      ],
      env: {
        node: true,
        jest: true,
      },
    },
    {
      files: ["**/tests/cypress/**/*.spec.{j,t}s?(x)"],
      env: {
        "cypress/globals": true,
      },
    },
  ],
};
