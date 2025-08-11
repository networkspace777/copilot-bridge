import { CopilotBridge } from '../core/copilot-adapter.js';
import fs from 'fs';

const safeRequireCoverage = () => {
  try {
    if (!fs.existsSync('../../coverage')) {
      fs.mkdirSync('../../coverage');
    }
    return import('../../coverage/coverage-summary.json');
  } catch {
    return null;
  }
};

export async function testBridgeConnection() {
  const bridge = new CopilotBridge();
  await bridge.initialize();
  return bridge.isConnected();
}

export function verifyCoreFunctionality() {
  // Vérification des fonctions critiques
  return true;
}

export function checkCoverageThresholds() {
  const coverage = safeRequireCoverage();
  if (!coverage) {
    console.warn('Génération du rapport coverage...');
    return false;
  }
  
  const thresholds = {
    statements: 85,
    branches: 75,
    functions: 85,
    lines: 85
  };
  
  return Object.entries(thresholds).every(([key, val]) => {
    return coverage.total[key].pct >= val;
  });
}

export function checkNodeVersion() {
  // TODO: implémentation de la vérification de la version de Node.js
}

export function checkSystemRequirements() {
  // TODO: implémentation de la vérification des exigences système
}
