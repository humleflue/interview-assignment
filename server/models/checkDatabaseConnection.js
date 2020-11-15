const db = require(`./database/Database`);

// Checks if a connection to the database can be established
async function checkDatabaseConnection(req, res) {
  let status = `API is `;
  try {
    db.connect();
    status += `up and running!`;
  }
  catch (error) {
    if (global.conf.LOG_ERRORS) {
      console.log(error.stack);
    }
    status += `down. Sorry.`;
  }
  finally {
    res.json({ status });
  }
}

module.exports = checkDatabaseConnection;
