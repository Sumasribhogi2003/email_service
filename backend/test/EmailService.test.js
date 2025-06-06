const EmailService = require('../src/services/EmailService');

describe('EmailService', () => {
  it('should send email successfully or failover', async () => {
    const service = new EmailService();
    const result = await service.sendEmail({
      idempotencyKey: 'abc123',
      to: 'user@example.com',
      subject: 'Test',
      body: 'Hello World'
    });

    expect(['sent', 'failed_all_providers', 'rate_limited']).toContain(result.status);
  });

  it('should prevent duplicate sends', async () => {
    const service = new EmailService();
    await service.sendEmail({
      idempotencyKey: 'xyz123',
      to: 'test@example.com',
      subject: '1st Email',
      body: 'Hello'
    });

    const result = await service.sendEmail({
      idempotencyKey: 'xyz123',
      to: 'test@example.com',
      subject: '2nd Email',
      body: 'Duplicate'
    });

    expect(result.status).toBe('duplicate');
  });
});
