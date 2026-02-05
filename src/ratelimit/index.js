const { RateLimiterMemory } = require('rate-limiter-flexible');

/**
 * Create a rate limiter middleware.
 * @param {Object} options - Options for rate-limiter-flexible
 * @returns {Function} Express middleware
 */
const rateLimit = (options = {}) => {
  const defaultOptions = {
    points: 10, // 10 requests
    duration: 1, // Per 1 second by IP
  };
  
  const opts = { ...defaultOptions, ...options };
  const rateLimiter = new RateLimiterMemory(opts);

  return (req, res, next) => {
    rateLimiter.consume(req.ip)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(429).send('Too Many Requests');
      });
  };
};

module.exports = rateLimit;
