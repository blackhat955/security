const { doubleCsrf } = require("csrf-csrf");

/**
 * Setup CSRF protection.
 * @param {Object} options - Options for csrf-csrf
 * @returns {Object} { doubleCsrfProtection, generateToken }
 */
const csrfProtection = (options = {}) => {
  const defaultOptions = {
    getSecret: () => "SecretKeyThatShouldBeChanged", // Default secret, user should override
    cookieName: "x-csrf-token",
    cookieOptions: {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    },
    size: 64,
    ignoredMethods: ["GET", "HEAD", "OPTIONS"],
  };

  const opts = { ...defaultOptions, ...options };
  
  return doubleCsrf(opts);
};

module.exports = csrfProtection;
