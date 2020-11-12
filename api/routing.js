// const path = require(`path`);

// const HTTPError = require(`./helpers/HTTPError`);

const checkDatabaseConnection = require(`./models/checkDatabaseConnection`);
const users = require(`./controllers/UserController`);

module.exports = (express, app) => {
  app.get(`/api`,       (req, res) => checkDatabaseConnection(req, res));
  app.get(`/api/users`, (req, res) => users.getAll(req, res));

  app.delete(`/api/users/id/:userId`, (req, res) => users.deleteById(req, res));
};
