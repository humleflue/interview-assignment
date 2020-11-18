/* eslint no-console: 0 */

/* External modules */
const express    = require(`express`); // For running the server
const app        = express();          // For running the server
require(`express-async-errors`);       // With this we don't have to pass errors like next(err) but can just throw them instead
const path    = require(`path`);

/* Internal modules */
const apiRouter        = require(`./server/routing/apiRouter`);
const handleErrors     = require(`./server/error_handler`);
const middleware       = require(`./server/middleware`);
const consoleLogToFile = require(`./server/helpers/consol_log_file`);
const Database         = require(`./server/models/database/Database`);

/* Setup */
global.conf = require(`./server_settings`); // Load settings into grobal variable (available across all scripts)
consoleLogToFile(); // Modifies the console, such that it writes logs into the server/logs dir

// IA: Make sure that the mock data has been loaded to the db
const mockDataPath = path.join(__dirname, `server`, `models`, `database`, `sqldump.sql`);
const db = new Database();
db.connect();
db.execute(mockDataPath);
db.close();

/* Middleware */
if (global.conf.LOG) {
  app.use(middleware.logger); // Logs requests to console
}

/* Routing */
app.use(`/api`, apiRouter); // IA: Handles all routing. Contains all api end-points
handleErrors(express, app);
app.use((req, res) => res.sendStatus(404)); // Handles non-existing URI-requests. Has to be the last line before app.listen.

app.listen(global.conf.PORT, () => console.log(`Server is listening at http://localhost:${global.conf.PORT}`));
