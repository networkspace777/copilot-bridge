module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  coverageReporters: ['text', 'lcov'],
  collectCoverage: true,
  testTimeout: 10000,
  setupFilesAfterEnv: ['<rootDir>/tests/setupMCP.js'],
  coverageProvider: 'babel',
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 70,
      functions: 80,
      lines: 80
    }
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleNameMapper: {
    'vscode-languageclient/node': '<rootDir>/tests/mocks/vscode-languageclient.js',
    '^@api$': '<rootDir>/tests/mocks/api.js'
  },
  roots: ['<rootDir>/tests'],
  transformIgnorePatterns: []
};
