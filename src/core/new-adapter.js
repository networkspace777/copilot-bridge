export default class NewAdapter {
  constructor() {
    this.initialized = false;
  }

  async initialize() {
    this.initialized = true;
    return { status: 'ready' };
  }
}
