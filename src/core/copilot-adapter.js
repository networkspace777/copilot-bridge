/**
 * Adapteur principal pour l'API GitHub Copilot
 * @class
 * @param {LanguageClient} languageClient - Client LSP initialisé
 * @param {ApiAdapter} apiAdapter - Adapteur API pour les requêtes
 */
import { PerformanceObserver, performance } from 'perf_hooks';
import diagnostics_channel from 'diagnostics_channel';

export default class CopilotAdapter {
  constructor(languageClient, apiAdapter) {
    if (!languageClient) throw new Error('LanguageClient required');
    this.languageClient = languageClient;
    this.apiAdapter = apiAdapter || null;
  }

  /**
   * Vérifie le statut de connexion
   * @returns {Promise<{connected: boolean, version: string}>}
   */
  async checkStatus() {
    if (!this.languageClient) return { connected: false, version: '0.0.0' };
    
    try {
      const status = await this.languageClient.sendRequest('copilot/status');
      return { 
        connected: status?.connected || false,
        version: status?.version || '0.0.0'
      };
    } catch (error) {
      return { connected: false, version: '0.0.0' };
    }
  }

  /**
   * Envoie une requête à Copilot
   * @param {string} type - Type de requête
   * @returns {Promise<string>} Réponse de Copilot
   */
  async sendRequest(type) {
    performance.mark('sendRequest-start');
    console.log('[DEBUG] languageClient:', this.languageClient);
    if (!this.languageClient || !this.languageClient.isInitialized) {
      console.log('[DEBUG] Client non initialisé');
      throw new Error('Client non initialisé');
    }
    const response = await this.languageClient.sendRequest({ type });
    performance.mark('sendRequest-end');
    performance.measure('sendRequest', 'sendRequest-start', 'sendRequest-end');
    return response;
  }

  /**
   * Récupère des suggestions de code depuis Copilot
   * @param {string} context - Contexte du code
   * @param {string} language - Langage de programmation 
   * @returns {Promise<Array<string>>} Suggestions de code
   */
  async getCodeSuggestions(context, language) {
    if (!context || !language) {
      this._handleError(new Error('Paramètres manquants'));
      throw new Error('Erreur Copilot: Context et language requis');
    }

    try {
      const response = await this.languageClient.sendRequest(
        'textDocument/completion',
        {
          textDocument: { uri: 'file:///temp.' + language },
          position: { line: 0, character: context.length }
        }
      );
      return response.items.map(item => item.insertText);
    } catch (error) {
      this._handleError(error);
      throw new Error(`Erreur Copilot: ${error.message}`);
    }
  }

  /**
   * Initialise le client
   * @async
   */
  async initialize() {
    if (!this.languageClient || typeof this.languageClient.initialize !== 'function') {
      throw new Error('Client invalide - méthode initialize manquante');
    }
    await this.languageClient.initialize();
  }

  /**
   * Gère les erreurs d'API
   * @private
   * @async
   * @param {Error} error 
   * @todo Implémenter la logique de retry/fallback
   */
  async _handleError(error) {
    if (this.apiAdapter) {
      await this.apiAdapter.sendRequest('/errors', { 
        message: error.message,
        stack: error.stack 
      });
    }
    console.error(`[CopilotAdapter] ${error.message}`);
  }
}
