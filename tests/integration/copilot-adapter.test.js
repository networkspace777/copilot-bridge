import CopilotAdapter from '../../src/core/copilot-adapter.js';
import StableMockClient from '../../src/core/stable-mock-client.js';

describe('CopilotAdapter Integration - sendRequest', () => {
  test('should return response for valid request', async () => {
    const mockClient = new StableMockClient();
    mockClient.sendRequest = jest.fn().mockResolvedValue('mocked response');
    
    const adapter = new CopilotAdapter(mockClient);
    const response = await adapter.sendRequest('test');
    
    expect(response).toBe('mocked response');
  });
});
