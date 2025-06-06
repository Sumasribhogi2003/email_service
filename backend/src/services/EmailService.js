const ProviderA = require('./ProviderA');
const ProviderB = require('./ProviderB');
const IdempotencyStore = require('../utils/IdempotencyStore');
const RateLimiter = require('../utils/RateLimiter');
const StatusTracker = require('../utils/StatusTracker');

class EmailService {
  constructor() {
    this.providers = [new ProviderA(), new ProviderB()];
    this.idempotencyStore = new IdempotencyStore();
    this.rateLimiter = new RateLimiter(5); // 5 emails/min
    this.statusTracker = new StatusTracker();
  }

  async sendEmail(emailRequest) {
    const { idempotencyKey, to, subject, body } = emailRequest;

    if (this.idempotencyStore.has(idempotencyKey)) {
      return { status: 'duplicate' };
    }

    if (!this.rateLimiter.allow()) {
      return { status: 'rate_limited' };
    }

    for (let i = 0; i < this.providers.length; i++) {
      const provider = this.providers[i];
      try {
        await this.retry(() => provider.send({ to, subject, body }), 3);
        this.idempotencyStore.add(idempotencyKey);
        this.statusTracker.track(idempotencyKey, 'success');
        return { status: 'sent', provider: provider.name };
      } catch (error) {
        this.statusTracker.track(idempotencyKey, `failed with ${provider.name}`);
      }
    }

    return { status: 'failed_all_providers' };
  }

  async retry(fn, attempts, delay = 500) {
    let attempt = 0;
    while (attempt < attempts) {
      try {
        return await fn();
      } catch (err) {
        await new Promise(res => setTimeout(res, delay * Math.pow(2, attempt)));
        attempt++;
      }
    }
    throw new Error('All retries failed');
  }
}

module.exports = EmailService;
