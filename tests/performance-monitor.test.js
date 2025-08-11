import { PerformanceMonitor } from '../src/core/performance-monitor.js';

describe('PerformanceMonitor', () => {
  let monitor;

  beforeEach(() => {
    monitor = new PerformanceMonitor();
  });

  test('should initialize with default values', () => {
    expect(monitor.lastUpdate).toBe(0);
    expect(monitor.lastDuration).toBe(0);
  });

  test('logUpdate should update lastUpdate and lastDuration', () => {
    const start = Date.now();
    monitor.logUpdate();
    expect(monitor.lastUpdate).toBeGreaterThanOrEqual(start);
    expect(monitor.lastDuration).toBeGreaterThan(0);
  });

  test('checkThreshold should log warning when duration exceeds threshold', () => {
    monitor.lastDuration = 600;
    console.warn = jest.fn();
    monitor.checkThreshold();
    expect(console.warn).toHaveBeenCalledWith('Performance critique: 600ms');
  });

  test('checkThreshold should not log warning when duration is below threshold', () => {
    monitor.lastDuration = 400;
    console.warn = jest.fn();
    monitor.checkThreshold();
    expect(console.warn).not.toHaveBeenCalled();
  });

  test('should not throw error when no error occurs', () => {
    monitor.lastDuration = 600;
    console.warn = jest.fn();
    expect(() => monitor.checkThreshold()).not.toThrow();
    expect(console.warn).toHaveBeenCalled();
  });

  test('checkThreshold should catch errors', () => {
    monitor.checkThreshold = jest.fn().mockImplementation(() => {
      throw new Error('Test error');
    });
    console.error = jest.fn();
    monitor.checkThreshold();
    expect(console.error).toHaveBeenCalledWith('Erreur monitoring', expect.any(Error));
  });

  test('should track update duration', () => {
    monitor.trackUpdate(100);
    expect(monitor.getLastUpdateDuration()).toBe(100);
  });

  test('should log error when an exception occurs', () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    // Simuler une erreur en modifiant la condition pour provoquer une exception
    const originalIf = global.if;
    global.if = null;
    
    monitor.checkThreshold();
    expect(console.error).toHaveBeenCalledWith('Erreur monitoring', expect.any(Error));
    
    // Restaurer
    global.if = originalIf;
    console.error = originalConsoleError;
  });
});
