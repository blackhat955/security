const { v4: uuidv4 } = require('uuid');

class SecurityLogger {
  constructor(options = {}) {
    this.redactKeys = options.redactKeys || ['password', 'token', 'authorization', 'cookie'];
  }

  redact(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    const newObj = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      if (this.redactKeys.includes(key.toLowerCase())) {
        newObj[key] = '[REDACTED]';
      } else if (typeof obj[key] === 'object') {
        newObj[key] = this.redact(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  }

  log(type, message, meta = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      type: type, // 'rate-limit', 'csrf-failure', 'validation-error', etc.
      message: message,
      correlationId: meta.correlationId || uuidv4(),
      ...this.redact(meta)
    };
    console.log(JSON.stringify(logEntry));
  }
  
  middleware() {
    return (req, res, next) => {
      req.correlationId = req.headers['x-correlation-id'] || uuidv4();
      res.setHeader('x-correlation-id', req.correlationId);
      next();
    };
  }
}

module.exports = new SecurityLogger();
