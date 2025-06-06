class IdempotencyStore {
  constructor() {
    this.keys = new Set();
  }

  has(key) {
    return this.keys.has(key);
  }

  add(key) {
    this.keys.add(key);
  }
}

module.exports = IdempotencyStore;
