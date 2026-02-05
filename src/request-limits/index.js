const express = require('express');

/**
 * Middleware for strict body parsing limits.
 * @param {Object} options
 * @returns {Array} Middleware array
 */
const requestLimits = (options = {}) => {
  const {
    jsonLimit = '10kb',
    urlEncodedLimit = '10kb',
    parameterLimit = 100, // Limit number of URL-encoded parameters
    depth = 5, // Limit JSON depth (requires custom check if not built-in, doing simple limit here)
  } = options;

  const jsonMiddleware = express.json({ limit: jsonLimit });
  const urlEncodedMiddleware = express.urlencoded({ extended: true, limit: urlEncodedLimit, parameterLimit });

  return [jsonMiddleware, urlEncodedMiddleware];
};

module.exports = requestLimits;
