module.exports = {
  ...require('./jest.config.js'),
  testMatch: ['**/tests/**/*.test.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/poc-feature/',
    '/tests/unit/',
    '/tests/integration/adapter.api.test.js',
    '/tests/isolated/'
  ]
}
