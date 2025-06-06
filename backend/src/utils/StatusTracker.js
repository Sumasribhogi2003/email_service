class StatusTracker {
  constructor() {
    this.statuses = new Map();
  }

  track(key, status) {
    this.statuses.set(key, status);
  }

  getStatus(key) {
    return this.statuses.get(key);
  }
}

module.exports = StatusTracker;
