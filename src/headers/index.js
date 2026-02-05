const helmet = require('helmet');

/**
 * Configure security headers using Helmet.
 * @param {Object} options - Helmet options
 * @returns {Function} Express middleware
 */
const securityHeaders = (options = {}) => {
  return helmet(options);
};

module.exports = securityHeaders;
