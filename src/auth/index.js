const jwt = require('jsonwebtoken');

/**
 * Get secure cookie options.
 * @param {boolean} isProduction
 * @returns {Object} Cookie options
 */
const secureCookieOptions = (isProduction = process.env.NODE_ENV === 'production') => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: 'Strict',
  maxAge: 3600000, // 1 hour
});

/**
 * Validate JWT with strict checks.
 * @param {string} token
 * @param {string} secret
 * @param {Object} options - JWT verify options
 * @returns {Object} Decoded token
 */
const validateToken = (token, secret, options = {}) => {
  const defaultOptions = {
    algorithms: ['HS256'],
    maxAge: '1h', // Enforce expiry
  };
  return jwt.verify(token, secret, { ...defaultOptions, ...options });
};

module.exports = {
  secureCookieOptions,
  validateToken
};
