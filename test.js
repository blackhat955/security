const { 
  headers, xss, ratelimit, validation, injection, csrf,
  cors, auth, requestLimits, fileUpload, logging,
  botProtection, ssrf, openRedirect, cacheControl, securityTxt
} = require('./src/index');
const express = require('express');
const app = express();

console.log('Testing modules...');

// Test 1: Validation
if (!validation.isEmail('test@example.com')) throw new Error('Email validation failed');
console.log('Validation passed.');

// Test 2: SSRF
if (ssrf.validateUrl('http://169.254.169.254/meta')) throw new Error('SSRF failed to block metadata');
if (!ssrf.validateUrl('https://google.com')) throw new Error('SSRF blocked valid URL');
console.log('SSRF passed.');

// Test 3: Open Redirect
if (openRedirect.isSafeRedirect('http://evil.com')) throw new Error('Open Redirect failed to block external');
if (!openRedirect.isSafeRedirect('/home')) throw new Error('Open Redirect blocked relative path');
console.log('Open Redirect passed.');

// Test 4: File Upload
if (!fileUpload.validateExtension('test.jpg')) throw new Error('File extension check failed');
console.log('File Upload helpers passed.');

// Test 5: Logging Redaction
const redacted = logging.redact({ password: 'secret', user: 'admin' });
if (redacted.password !== '[REDACTED]') throw new Error('Logging redaction failed');
console.log('Logging redaction passed.');

console.log('All static tests passed. Starting server for middleware tests...');

// Middleware Setup
app.use(headers());
app.use(ratelimit({ points: 5, duration: 1 }));
app.use(cors({ allowedOrigins: ['http://localhost:3000'] })); // Self allowed
app.use(requestLimits());
app.use(botProtection());
app.use(xss.xssMiddleware());
app.use(openRedirect.safeRedirect());

app.get('/', (req, res) => {
  res.send('Hello Secure World');
});

app.get('/sensitive', cacheControl(), (req, res) => {
  res.send('Sensitive Data');
});

const server = app.listen(3000, () => {
  console.log('Server running on port 3000');
  process.exit(0);
});
