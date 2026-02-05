const validator = require('validator');

/**
 * Validate email address.
 * @param {string} email
 * @returns {boolean}
 */
const isEmail = (email) => {
  return validator.isEmail(email);
};

/**
 * Validate strong password.
 * Min length 8, 1 lowercase, 1 uppercase, 1 number, 1 symbol.
 * @param {string} password
 * @returns {boolean}
 */
const isStrongPassword = (password) => {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  });
};

/**
 * Sanitize email (normalize).
 * @param {string} email
 * @returns {string}
 */
const normalizeEmail = (email) => {
  return validator.normalizeEmail(email);
};

module.exports = {
  isEmail,
  isStrongPassword,
  normalizeEmail,
  validator // Export raw validator for advanced usage
};
