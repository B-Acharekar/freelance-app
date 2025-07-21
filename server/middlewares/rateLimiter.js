import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 10,
  message: 'Too many requests from this IP, try again later',
});
