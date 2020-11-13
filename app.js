/* eslint no-console: 0 */

/* External modules */
const express    = require(`express`); // For running the server
const app        = express();          // For running the server
require(`express-async-errors`);       // With this we don't have to pass errors like next(err) but can just throw them instead

/* Internal modules */
const api              = require(`./server/routing/apiRouter`);
const handleErrors     = require(`./server/error_handler`);
const middleWare       = require(`./server/middleware`);
const consoleLogToFile = require(`./server/helpers/consol_log_file`);
const database         = require(`./server/models/database/Database`);

/* Setup */
global.conf = require(`./server_settings`); // Load settings into grobal variable (available across all scripts)
consoleLogToFile();                         // Modifies the console, such that it writes logs into the server/logs dir
database.connect();                         // IA: Establish a connection to the db
database.loadData();                        // IA: Make sure that the mock data has been loaded to the db

/* Middleware */
if (global.conf.LOG) {
  app.use(middleWare.logger); // Logs requests to console
}

/* Routing */
app.use(`/api`, api); // IA: Handles all routing. Contains all api end-points
handleErrors(express, app);
app.use((req, res) => res.sendStatus(404)); // Handles non-existing URI-requests. Has to be the last line before app.listen.

app.listen(global.conf.PORT, () => console.log(`Server is listening at http://localhost:${global.conf.PORT}`));
