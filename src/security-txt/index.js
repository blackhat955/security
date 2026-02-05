/**
 * Middleware to serve /.well-known/security.txt
 * @param {Object} options
 * @param {string} options.contact - Contact info (e.g., mailto:security@example.com)
 * @param {string} options.encryption - Link to PGP key
 * @param {string} options.acknowledgments - Link to Hall of Fame
 * @param {string} options.policy - Link to Security Policy
 * @param {string} options.hiring - Link to hiring page
 * @returns {Function} Express middleware
 */
const securityTxt = (options = {}) => {
  const lines = [];
  if (options.contact) lines.push(`Contact: ${options.contact}`);
  if (options.encryption) lines.push(`Encryption: ${options.encryption}`);
  if (options.acknowledgments) lines.push(`Acknowledgments: ${options.acknowledgments}`);
  if (options.policy) lines.push(`Policy: ${options.policy}`);
  if (options.hiring) lines.push(`Hiring: ${options.hiring}`);
  
  // Default expiration: 1 year from now
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  lines.push(`Expires: ${expires.toISOString()}`);

  const content = lines.join('\n');

  return (req, res, next) => {
    if (req.path === '/.well-known/security.txt') {
      res.setHeader('Content-Type', 'text/plain');
      return res.send(content);
    }
    next();
  };
};

/**
 * Middleware to serve robots.txt
 * @param {string} content - Custom robots.txt content
 * @returns {Function} Express middleware
 */
const robotsTxt = (content = 'User-agent: *\nDisallow: /') => {
  return (req, res, next) => {
    if (req.path === '/robots.txt') {
      res.setHeader('Content-Type', 'text/plain');
      return res.send(content);
    }
    next();
  };
};

module.exports = {
  securityTxt,
  robotsTxt
};
