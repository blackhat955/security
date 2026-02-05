/**
 * Validate redirect URL (Open Redirect Guard).
 * @param {string} urlString
 * @param {Array<string>} allowedHosts
 * @returns {boolean}
 */
const isSafeRedirect = (urlString, allowedHosts = []) => {
  if (!urlString) return false;
  
  // Allow relative URLs
  if (urlString.startsWith('/') && !urlString.startsWith('//')) return true;

  try {
    const url = new URL(urlString);
    return allowedHosts.includes(url.hostname);
  } catch (e) {
    return false; // Invalid URL
  }
};

/**
 * Middleware to protect against open redirects.
 * @param {Object} options
 * @returns {Function} Express middleware
 */
const safeRedirect = (options = {}) => {
  const { allowedHosts = [] } = options;
  return (req, res, next) => {
    // Monkey-patch res.redirect
    const originalRedirect = res.redirect;
    res.redirect = function (url) {
      if (isSafeRedirect(url, allowedHosts)) {
        return originalRedirect.apply(this, arguments);
      }
      console.warn(`[Security] Blocked open redirect to: ${url}`);
      res.status(400).send('Invalid redirect URL');
    };
    next();
  };
};

module.exports = {
  isSafeRedirect,
  safeRedirect
};
