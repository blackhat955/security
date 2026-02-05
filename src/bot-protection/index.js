/**
 * Basic Bot Protection Middleware.
 * @param {Object} options
 * @param {Array<string>} options.blockUserAgents - Regex strings or substrings to block
 * @param {Function} options.onBlock - Callback when blocked
 * @returns {Function} Express middleware
 */
const botProtection = (options = {}) => {
  const { blockUserAgents = ['curl', 'wget', 'python-requests'], onBlock } = options;

  return (req, res, next) => {
    const ua = req.headers['user-agent'] || '';
    const isBot = blockUserAgents.some(agent => ua.toLowerCase().includes(agent.toLowerCase()));

    if (isBot) {
      if (onBlock) onBlock(req.ip, ua);
      return res.status(403).json({ error: 'Access Denied: Bot detected' });
    }
    next();
  };
};

module.exports = botProtection;
