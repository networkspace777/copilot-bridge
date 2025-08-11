module.exports = {
  LanguageClient: jest.fn().mockImplementation(() => ({
    start: jest.fn(),
    sendRequest: jest.fn()
  }))
};
