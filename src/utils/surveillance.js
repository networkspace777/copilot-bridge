class MigrationMonitor {
  constructor() {
    this.divergenceLog = [];
    this.checkInterval = setInterval(() => this.checkDivergences(), 3600000);
  }

  async checkDivergences() {
    const results = await migrationBridge.compareAllMethods();
    this.logDivergences(results);
    if (results.errors.length > 0) {
      this.alertTeam();
    }
  }
}
