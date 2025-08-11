const fs = require('fs');
const path = require('path');

class CIMonitor {
  constructor() {
    this.logFile = path.join(__dirname, '../ci-monitor.log');
  }

  async checkBuildStability() {
    // Implémentation à compléter
    return { stable: true };
  }

  logResults(results) {
    fs.appendFileSync(this.logFile, 
      `${new Date().toISOString()} - ${JSON.stringify(results)}\n`);
  }
}

module.exports = CIMonitor;
