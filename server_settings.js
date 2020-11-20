// Object.freeze to make the object immutable
const settings = Object.freeze({
  LOG: true,
  LOG_ERRORS: true,
  PRODUCTION: false,
  PORT: 3000,
});

module.exports = settings;
