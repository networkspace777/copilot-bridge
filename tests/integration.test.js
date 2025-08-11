const { CopilotLSPBridge } = require('../client-lsp');
const { LanguageClient } = require('vscode-languageclient/node');

jest.mock('vscode-languageclient/node', () => ({
  LanguageClient: jest.fn().mockImplementation(() => ({
    start: jest.fn()
  }))
}));

test('Initialisation minimale du bridge', () => {
  const bridge = new CopilotLSPBridge();
  expect(bridge).toBeDefined();
});
