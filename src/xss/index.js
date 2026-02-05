const xss = require('xss');

/**
 * Sanitize a string to prevent XSS.
 * @param {string} input - The input string
 * @param {Object} options - XSS options
 * @returns {string} Sanitized string
 */
const sanitize = (input, options = {}) => {
  if (typeof input !== 'string') return input;
  return xss(input, options);
};

/**
 * Middleware to sanitize request body, query, and params.
 * @param {Object} options - XSS options
 * @returns {Function} Express middleware
 */
const xssMiddleware = (options = {}) => {
  return (req, res, next) => {
    if (req.body) {
      req.body = sanitizeObject(req.body, options);
    }
    if (req.query) {
      req.query = sanitizeObject(req.query, options);
    }
    if (req.params) {
      req.params = sanitizeObject(req.params, options);
    }
    next();
  };
};

const sanitizeObject = (obj, options) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = sanitize(obj[key], options);
    } else if (typeof obj[key] === 'object') {
      sanitizeObject(obj[key], options);
    }
  }
  return obj;
};

module.exports = {
  sanitize,
  xssMiddleware
};
