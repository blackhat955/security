const headers = require('./headers');
const xss = require('./xss');
const ratelimit = require('./ratelimit');
const validation = require('./validation');
const injection = require('./injection');
const csrf = require('./csrf');
const cors = require('./cors');
const auth = require('./auth');
const requestLimits = require('./request-limits');
const fileUpload = require('./file-upload');
const logging = require('./logging');
const botProtection = require('./bot-protection');
const ssrf = require('./ssrf');
const openRedirect = require('./open-redirect');
const cacheControl = require('./cache-control');
const securityTxt = require('./security-txt');

module.exports = {
  headers,
  xss,
  ratelimit,
  validation,
  injection,
  csrf,
  cors,
  auth,
  requestLimits,
  fileUpload,
  logging,
  botProtection,
  ssrf,
  openRedirect,
  cacheControl,
  securityTxt
};
