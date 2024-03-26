/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/__test__/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  coveragePathIgnorePatterns: ["/node_modules/", ".spec.js$", ".test.js$"],
  coverageDirectory: "./coverage",
  coverageReporters: ["text", "text-summary", "lcov"],
};
