module.exports = {
  root: true,
  env: {
    node: true,
    webextensions: true,
  },
  extends: ["plugin:vue/vue3-strongly-recommended", "eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 2022,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",
  },
  plugins: ["cypress"],
  overrides: [
    {
      files: [
        "./jest.setup.m?js",
        "*.config.m?js",
        "**/__tests__/*.m?{j,t}s?(x)",
        "**/tests/unit/**/*.spec.m?{j,t}s?(x)",
        "**/__mocks__/*.js",
        "**/__mocks__/*.mjs",
      ],
      env: {
        node: true,
        jest: true,
      },
    },
    {
      files: ["**/tests/cypress/**/*.spec.m?{j,t}s?(x)"],
      env: {
        "cypress/globals": true,
      },
    },
  ],
};
