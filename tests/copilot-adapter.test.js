import CopilotAdapter from '../src/core/copilot-adapter.js';
import StableMockClient from '../src/core/stable-mock-client.js';

describe('CopilotAdapter', () => {
  let mockClient;
  let adapter;

  beforeEach(() => {
    mockClient = new StableMockClient();
    mockClient.isInitialized = true;
    adapter = new CopilotAdapter(mockClient);
  });

  test('should initialize without errors', () => {
    expect(adapter).toBeDefined();
  });

  describe('initialize', () => {
    test('should throw error when client is invalid', async () => {
      const invalidClient = {};
      const adapter = new CopilotAdapter(invalidClient);
      await expect(adapter.initialize()).rejects.toThrow('Client invalide - méthode initialize manquante');
    });

    test('should throw error when client initialize is not a function', async () => {
      const invalidClient = { initialize: 'not a function' };
      const adapter = new CopilotAdapter(invalidClient);
      await expect(adapter.initialize()).rejects.toThrow('Client invalide - méthode initialize manquante');
    });

    test('should not throw when client is valid', async () => {
      const mockInitialize = jest.spyOn(mockClient, 'initialize').mockResolvedValue();
      adapter = new CopilotAdapter(mockClient);
      await expect(adapter.initialize()).resolves.not.toThrow();
      mockInitialize.mockRestore();
    });
  });

  describe('checkStatus', () => {
    test('should return connected false when client not initialized', async () => {
      const adapter = new CopilotAdapter(null);
      const status = await adapter.checkStatus();
      expect(status).toEqual({ connected: false, version: '0.0.0' });
    });

    test('should return connected true when client responds', async () => {
      mockClient.sendRequest = jest.fn().mockResolvedValue({ connected: true, version: '1.0.0' });
      const status = await adapter.checkStatus();
      expect(status).toEqual({ connected: true, version: '1.0.0' });
    });

    test('should return connected false on error', async () => {
      mockClient.sendRequest = jest.fn().mockRejectedValue(new Error('Network error'));
      const status = await adapter.checkStatus();
      expect(status).toEqual({ connected: false, version: '0.0.0' });
    });
  });

  describe('sendRequest', () => {
    test('should send a request and return response', async () => {
      mockClient.sendRequest = jest.fn().mockResolvedValue('response');
      const response = await adapter.sendRequest('test');
      expect(response).toBe('response');
    });

    test('should throw error when client not initialized', async () => {
      const adapter = new CopilotAdapter(null);
      await expect(adapter.sendRequest('test')).rejects.toThrow('Client non initialisé');
    });
  });

  describe('getCodeSuggestions', () => {
    test('should throw error when context or language missing', async () => {
      await expect(adapter.getCodeSuggestions('', 'javascript')).rejects.toThrow('Paramètres manquants');
      await expect(adapter.getCodeSuggestions('context', '')).rejects.toThrow('Paramètres manquants');
    });

    test('should return suggestions on success', async () => {
      mockClient.sendRequest = jest.fn().mockResolvedValue({ items: [{ insertText: 'suggestion' }] });
      const suggestions = await adapter.getCodeSuggestions('context', 'javascript');
      expect(suggestions).toEqual(['suggestion']);
    });

    test('should throw error on failure', async () => {
      mockClient.sendRequest = jest.fn().mockRejectedValue(new Error('API error'));
      await expect(adapter.getCodeSuggestions('context', 'javascript')).rejects.toThrow('Erreur Copilot: API error');
    });
  });
});
