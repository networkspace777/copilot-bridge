/**
 * Adapteur pour l'API externe
 * @class
 * @description Gère la communication avec l'API tierce via des requêtes HTTP
 * @example
 * const adapter = new ApiAdapter();
 * await adapter.initialize();
 */
export default class ApiAdapter {
  constructor() {
    /**
     * @private
     * @type {Object} Configuration de l'API
     */
    this.config = {};
    /**
     * @private
     * @type {Object} Métriques de l'API
     */
    this.metrics = {
      requestCount: 0,
      errorCount: 0,
      avgResponseTime: 0
    };
  }

  /**
   * Initialise la connexion à l'API
   * @async
   * @returns {Promise<void>}
   * @throws {Error} Si la connexion échoue
   */
  async initialize() {
    this.config = {
      baseUrl: process.env.API_BASE_URL || 'https://api.example.com',
      timeout: 5000
    };
  }

  /**
   * Envoie une requête à l'API
   * @async
   * @param {string} endpoint - Point de terminaison de l'API
   * @param {Object} [data={}] - Données à envoyer avec la requête
   * @param {number} [retries=3] - Nombre de tentatives en cas d'échec
   * @throws {Error} Si l'adaptateur n'est pas initialisé
   */
  async sendRequest(endpoint, data = {}, retries = 3) {
    if (!this.config?.baseUrl) {
      throw new Error('Adapter not initialized');
    }
    
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
          method: 'POST',
          body: JSON.stringify(data),
          timeout: this.config.timeout
        });
        return await response.json();
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(res => setTimeout(res, 1000 * (i + 1)));
      }
    }
  }

  /**
   * Récupère le statut de l'API
   * @async
   * @returns {Promise<boolean>} - Statut de l'API (true si OK, false sinon)
   */
  async getStatus() {
    try {
      const response = await this.sendRequest('/status');
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}
