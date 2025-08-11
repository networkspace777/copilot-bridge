export default class CopilotLSPBridge {
  constructor() {
    this.initialized = false;
  }

  async initialize() {
    this.initialized = true;
    return true;
  }

  async sendRequest(request) {
    if (!this.initialized) throw new Error('Client not initialized');
    if (!request?.type) throw new Error('Request type required');
    
    return { 
      response: `Mock response for ${request.type}`,
      items: [{ insertText: 'sample code' }] 
    };
  }

  async checkStatus() {
    return {
      connected: this.initialized,
      version: '1.0.0'
    };
  }
}
