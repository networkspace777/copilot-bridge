import CoreModule from '../src/core/CoreModule.js';

describe('CoreModule Initialization', () => {
  test('should initialize without errors', () => {
    const module = new CoreModule();
    expect(module).toBeDefined();
  });
});

test('CoreModule should initialize with default state', () => {
  const instance = new CoreModule();
  expect(instance.getState()).toBe('default');
});
