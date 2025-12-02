// src/config/rateLimit.ts
import rateLimit from 'express-rate-limit';

// Global API rate limiter, created ONCE at startup
const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true, // return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // disable `X-RateLimit-*` headers
  message: {
    error: 'Too many requests, please try again later.',
  },
});

export default apiRateLimiter;
