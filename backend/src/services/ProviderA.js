class ProviderA {
  constructor() {
    this.name = 'ProviderA';
  }

  async send({ to, subject, body }) {
    // Simulate success/failure randomly
    if (Math.random() < 0.7) return true;
    throw new Error('ProviderA failed');
  }
}

module.exports = ProviderA;
