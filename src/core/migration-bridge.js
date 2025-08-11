export default class MigrationBridge {
  constructor() {
    this.migrationMode = 'dual-run';
  }

  async initialize() {
    this.legacyAdapter = await import('./copilot-adapter');
    this.newAdapter = await import('./new-adapter');
  }

  async execute(method, ...args) {
    if (this.migrationMode === 'dual-run') {
      const [legacyResult, newResult] = await Promise.all([
        this.legacyAdapter[method](...args).catch(e => e),
        this.newAdapter[method](...args).catch(e => e)
      ]);
      return this.validateResults(legacyResult, newResult);
    }
    return this.newAdapter[method](...args);
  }

  validateResults(legacy, current) {
    if (JSON.stringify(legacy) !== JSON.stringify(current)) {
      console.warn('Migration warning: results divergence');
    }
    return current;
  }
}
