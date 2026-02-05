/**
 * Basic SQL escaping (Note: Use parameterized queries instead!).
 * This helps escape strings if you absolutely must concatenate.
 * @param {string} val
 * @returns {string}
 */
const escapeSQL = (val) => {
  if (typeof val !== 'string') return val;
  return val.replace(/[\0\x08\x09\x1a\n\r"'\\%]/g, function (char) {
    switch (char) {
      case "\0": return "\\0";
      case "\x08": return "\\b";
      case "\x09": return "\\t";
      case "\x1a": return "\\z";
      case "\n": return "\\n";
      case "\r": return "\\r";
      case "\"": return "\\\"";
      case "'": return "\\'";
      case "\\": return "\\\\";
      case "%": return "\\%";
    }
  });
};

/**
 * Sanitize NoSQL query input (remove $ operators).
 * @param {Object} input
 * @returns {Object} Sanitized object
 */
const sanitizeNoSQL = (input) => {
  if (input instanceof Object) {
    for (const key in input) {
      if (/^\$/.test(key)) {
        delete input[key];
      } else {
        sanitizeNoSQL(input[key]);
      }
    }
  }
  return input;
};

module.exports = {
  escapeSQL,
  sanitizeNoSQL
};
