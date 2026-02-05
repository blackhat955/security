/**
 * Middleware to set strict Cache-Control headers for sensitive routes.
 * @returns {Function} Express middleware
 */
const noCache = () => {
  return (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    next();
  };
};

module.exports = noCache;
