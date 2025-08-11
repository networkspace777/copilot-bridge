import apiClient from '../external/api-client';

export default class AdapterApi {
  constructor() {
    this.config = null;
    this.connected = false;
  }

  init(config) {
    if (!config?.baseUrl) throw new Error('Base URL required');
    this.config = config;
    return Promise.resolve(true);
  }

  async sendRequest(endpoint, data = {}) {
    if (!this.config) throw new Error('Adapter not initialized');
    return { data: {} }; // Réponse mockée de base
  }

  async connect() {
    try {
      const response = await this.sendRequest('/connect');
      this.connected = response.success;
      return this.connected;
    } catch (error) {
      this.connected = false;
      throw error;
    }
  }
}
