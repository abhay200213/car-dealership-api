import rateLimit from 'express-rate-limit';

jest.mock('express-rate-limit', () => {
  return jest.fn((options) => ({
    __mock: true,
    options
  }));
});

import { apiLimiter } from './rateLimit';

describe('apiLimiter configuration', () => {
  it('should configure express-rate-limit with expected options', () => {
    // Ensure the limiter instance is defined
    expect(apiLimiter).toBeDefined();

    // Check that rateLimit was called with the right config
    expect(rateLimit).toHaveBeenCalledWith(
      expect.objectContaining({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false
      })
    );
  });
});
