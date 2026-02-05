# Ultimate Security Pack

A comprehensive security package for Node.js applications, aggregating best-in-class security features.

## Installation

```bash
npm install ultimate-security-pack
```

## Features

- **Security Headers**: Wrapper around `helmet`.
- **XSS Protection**: Input sanitization and middleware using `xss`.
- **Rate Limiting**: Configurable rate limiter using `rate-limiter-flexible`.
- **Input Validation**: Common validators (email, strong password, etc.) using `validator`.
- **Injection Protection**: SQL and NoSQL sanitization helpers.
- **CSRF Protection**: Token generation and validation using `csrf-csrf`.
- **CORS Hardening**: Allowlist support and strict defaults.
- **Auth Hardening**: Cookie and JWT helpers.
- **Request Limits**: Strict body parsing limits.
- **File Upload Security**: MIME sniffing and extension validation.
- **Logging/Audit**: Security-focused logger with redaction.
- **Bot Protection**: Basic user-agent blocking.
- **SSRF Protection**: URL validation and private IP blocking.
- **Open Redirect Guard**: Safe redirect middleware.
- **Cache Control**: Strict headers for sensitive routes.
- **Security.txt**: Serve well-known security files.

## Usage

### 1. Security Headers (Helmet)

```javascript
const express = require('express');
const { headers } = require('ultimate-security-pack');
const app = express();

app.use(headers());
```

### 2. XSS Protection

```javascript
const { xss } = require('ultimate-security-pack');
app.use(xss.xssMiddleware());
```

### 3. Rate Limiting

```javascript
const { ratelimit } = require('ultimate-security-pack');
app.use(ratelimit({ points: 10, duration: 1 }));
```

### 4. CORS Hardening

```javascript
const { cors } = require('ultimate-security-pack');

app.use(cors({
  allowedOrigins: ['https://example.com'],
  onBlock: (origin) => console.log(`Blocked origin: ${origin}`)
}));
```

### 5. Auth Hardening

```javascript
const { auth } = require('ultimate-security-pack');

// Cookie options
res.cookie('session', 'value', auth.secureCookieOptions());

// JWT Validation
try {
  const decoded = auth.validateToken(token, 'secret');
} catch (err) {
  // invalid token
}
```

### 6. Request Limits

```javascript
const { requestLimits } = require('ultimate-security-pack');

// Applies strict json/urlencoded limits
app.use(requestLimits({ jsonLimit: '10kb' }));
```

### 7. File Upload Security

```javascript
const { fileUpload } = require('ultimate-security-pack');

// Check buffer mime type
const isValid = await fileUpload.validateFileContent(fileBuffer);

// Check extension
const isExtValid = fileUpload.validateExtension('image.jpg');
```

### 8. Logging (Audit)

```javascript
const { logging } = require('ultimate-security-pack');

app.use(logging.middleware()); // Adds correlation ID

logging.log('login-failed', 'Invalid password for user', { 
  user: 'admin', 
  password: 'secret_password_redacted' 
});
```

### 9. Bot Protection

```javascript
const { botProtection } = require('ultimate-security-pack');

app.use(botProtection({ 
  blockUserAgents: ['curl', 'python'],
  onBlock: (ip, ua) => console.log(`Blocked bot ${ua} from ${ip}`)
}));
```

### 10. SSRF Protection

```javascript
const { ssrf } = require('ultimate-security-pack');

if (ssrf.validateUrl(userInputUrl)) {
  // Safe to fetch
}
```

### 11. Open Redirect Guard

```javascript
const { openRedirect } = require('ultimate-security-pack');

app.use(openRedirect.safeRedirect({ allowedHosts: ['example.com'] }));

// Now res.redirect() checks the URL
res.redirect(userInputUrl);
```

### 12. Cache Control (Sensitive Routes)

```javascript
const { cacheControl } = require('ultimate-security-pack');

app.get('/profile', cacheControl(), (req, res) => {
  res.json({ user: 'data' });
});
```

### 13. Security.txt & Robots.txt

```javascript
const { securityTxt } = require('ultimate-security-pack');

app.use(securityTxt.securityTxt({ contact: 'mailto:sec@example.com' }));
app.use(securityTxt.robotsTxt());
```

## License

ISC
