import rateLimit from 'express-rate-limit';

/**
 * Global API rate limiter.
 *
 * Limits each IP to 100 requests per 15-minute window for /api routes.
 * This helps protect the API from abuse and accidental flooding.
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // limit each IP to 100 requests per window
  standardHeaders: true,    // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false      // Disable the X-RateLimit-* headers
});
