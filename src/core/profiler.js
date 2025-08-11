const { PerformanceObserver, performance } = require('perf_hooks');
const diagnostics_channel = require('diagnostics_channel');

module.exports = {
  startTracking: () => {
    const obs = new PerformanceObserver((items) => {
      items.getEntries().forEach(entry => {
        console.log(`[Perf] ${entry.name}: ${entry.duration}ms`);
      });
    });
    obs.observe({ entryTypes: ['measure'] });
    
    // Exemple de suivi de canal
    const channel = diagnostics_channel.channel('my-channel');
    channel.subscribe(({ message }) => {
      console.log(`[Diagnostics] ${message}`);
    });
  }
};
