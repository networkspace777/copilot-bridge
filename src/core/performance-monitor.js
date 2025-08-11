export class PerformanceMonitor {
  constructor() {
    this.lastUpdate = 0;
    this.lastDuration = 0;
  }

  logUpdate() {
    const now = Date.now();
    this.lastDuration = now - this.lastUpdate;
    this.lastUpdate = now;
    console.log(`Plan updated in ${this.lastDuration}ms`);
    this.checkThreshold();
  }

  checkThreshold() {
    try {
      if (this.lastDuration > 500) {
        console.warn(`Performance critique: ${this.lastDuration}ms`);
        // TODO: Envoyer métrique
      }
    } catch (error) {
      console.error('Erreur monitoring', error);
    }
  }
}
