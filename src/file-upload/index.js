const fileType = require('file-type');

/**
 * Validate uploaded file content type (MIME sniffing).
 * @param {Buffer} buffer
 * @param {Array<string>} allowedMimes
 * @returns {Promise<boolean>}
 */
const validateFileContent = async (buffer, allowedMimes = ['image/jpeg', 'image/png']) => {
  const type = await fileType.fromBuffer(buffer);
  if (!type) return false;
  return allowedMimes.includes(type.mime);
};

/**
 * Validate file extension.
 * @param {string} filename
 * @param {Array<string>} allowedExtensions
 * @returns {boolean}
 */
const validateExtension = (filename, allowedExtensions = ['.jpg', '.jpeg', '.png']) => {
  const ext = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();
  return allowedExtensions.includes('.' + ext);
};

module.exports = {
  validateFileContent,
  validateExtension
};
