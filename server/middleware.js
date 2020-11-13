/* eslint no-console: 0 */

const pad = require(`./helpers/pad`);

// This class contains custom meta-related middleware functionality
class Middleware {
  // Logs all incoming requests in the server's console
  logger(req, res, next) {
    const clientIP  = global.conf.PRODUCTION ? `${pad(req.headers[`x-real-ip`], 15, ` `)} | ` : ``;
    const reqMethod = pad(req.method, -7, ` `);
    const reqUrl    = `${req.protocol}://${req.get(`host`)}${req.originalUrl}`;
    const log       = `${clientIP}GOT ${reqMethod}: ${reqUrl}`;

    console.log(log);
    next();
  }
}

module.exports = new Middleware();
