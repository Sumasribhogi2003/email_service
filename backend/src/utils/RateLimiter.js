class RateLimiter {
  constructor(limitPerMinute) {
    this.limit = limitPerMinute;
    this.timestamps = [];
  }

  allow() {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(ts => now - ts < 60000);
    if (this.timestamps.length < this.limit) {
      this.timestamps.push(now);
      return true;
    }
    return false;
  }
}

module.exports = RateLimiter;
