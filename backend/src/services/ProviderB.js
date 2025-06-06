class ProviderB {
  constructor() {
    this.name = 'ProviderB';
  }

  async send({ to, subject, body }) {
    if (Math.random() < 0.7) return true;
    throw new Error('ProviderB failed');
  }
}

module.exports = ProviderB;
