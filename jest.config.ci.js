module.exports = {
  ...require('./jest.config.js'),
  testPathIgnorePatterns: [
    '/node_modules/',
    '/poc-feature/',
    '/__tests__/problematic/'
  ]
}
