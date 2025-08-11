const { testBridgeConnection, verifyCoreFunctionality, checkCoverageThresholds } = require('../src/utils/system-check');

module.exports = {
  run: async () => {
    await testBridgeConnection();
    verifyCoreFunctionality();
    checkCoverageThresholds();
  }
}
