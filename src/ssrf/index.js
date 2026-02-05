const ipaddr = require('ipaddr.js');

/**
 * Validate URL to prevent SSRF.
 * @param {string} urlString
 * @param {Object} options
 * @param {Array<string>} options.allowedProtocols
 * @param {boolean} options.allowPrivateIPs
 * @returns {boolean}
 */
const validateUrl = (urlString, options = {}) => {
  const { allowedProtocols = ['http:', 'https:'], allowPrivateIPs = false } = options;

  try {
    const url = new URL(urlString);
    
    // 1. Check Protocol
    if (!allowedProtocols.includes(url.protocol)) {
      return false;
    }

    // 2. Check IP Address (if hostname is IP)
    // Note: This only checks if the *input* hostname is a private IP. 
    // Real SSRF protection requires resolving the DNS and checking the resolved IP,
    // which is async and complex to do correctly in a sync helper.
    // This is a "light" check.
    if (ipaddr.isValid(url.hostname)) {
      const addr = ipaddr.parse(url.hostname);
      if (!allowPrivateIPs && (addr.range() === 'private' || addr.range() === 'loopback' || addr.range() === 'uniqueLocal' || addr.range() === 'linkLocal')) {
        return false;
      }
    }
    
    // Metadata service check (AWS, GCP, Azure)
    if (url.hostname === '169.254.169.254') return false;

    return true;
  } catch (e) {
    return false; // Invalid URL
  }
};

module.exports = {
  validateUrl
};
