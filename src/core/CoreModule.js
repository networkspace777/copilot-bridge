export default class CoreModule {
  constructor() {
    // Initialisation de base
    this.state = 'default';
  }

  // Méthodes principales
  getState() {
    return this.state;
  }
}
