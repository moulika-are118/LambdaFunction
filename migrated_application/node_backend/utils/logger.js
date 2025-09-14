const createError = require('http-errors');

function log({ level = 'info', message, meta = {} }) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  };
  // For now, just log to console. Extend to file/db as needed.
  console[level === 'error' ? 'error' : 'log'](JSON.stringify(entry));
}

module.exports = {
  log,
};
