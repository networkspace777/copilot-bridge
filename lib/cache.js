class SmartCache {
  constructor() {
    this.cache = new Map();
    this.hits = new Map();
    this.ttl = 30000; // Réduction à 30s
  }

  get(key) {
    const entry = this.cache.get(key);
    if (entry) this.hits.set(key, (this.hits.get(key) || 0) + 1);
    return entry;
  }
}

module.exports = SmartCache;
