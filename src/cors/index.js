const cors = require('cors');

/**
 * Configure CORS with security best practices.
 * @param {Object} options - CORS options
 * @param {Array|string} options.allowedOrigins - Whitelist of allowed origins
 * @param {Function} options.onBlock - Callback when origin is blocked
 * @returns {Function} Express middleware
 */
const corsProtection = (options = {}) => {
  const { allowedOrigins = [], onBlock } = options;
  
  const corsOptions = {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
        callback(null, true);
      } else {
        if (onBlock) onBlock(origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies
    maxAge: 86400, // 24 hours
    optionsSuccessStatus: 204
  };

  // If user passed other standard cors options, merge them (but logic above overrides origin)
  const finalOptions = { ...corsOptions, ...options, origin: corsOptions.origin };

  return cors(finalOptions);
};

module.exports = corsProtection;
