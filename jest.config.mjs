export default {
  testRegex: "/tests/unit/.*\\.(test|spec)\\.(jsx?|js?|tsx?|ts?|mjs)$",
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.mjs$": "babel-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
  },
  setupFilesAfterEnv: ["./jest.setup.mjs"],
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
  moduleFileExtensions: ["js", "mjs", "vue", "json", "node"],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/src/$1",
  }
};
