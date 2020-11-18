const sqlite3 = require(`sqlite3`).verbose();
const fs      = require(`fs`);
const path    = require(`path`);

const dbSource = path.join(__dirname, `db.sqlite`);

// This class is an adapter/wrapper of the sqlite module
class Database {
  // Establishes a new connection to the database
  connect() {
    this.db = new sqlite3.Database(dbSource, (err) => {
      if (err) {
        throw err;
      }
    });
    return this;
  }

  // Closes the active connection to the database
  close() {
    this.db.close((err) => {
      if (err) {
        throw err;
      }
    });
  }

  // Executes an sql-script
  execute(filePath) {
    const dataSql = fs.readFileSync(filePath).toString();
    this.db.exec(dataSql, (err) => {
      // if(err) Script has already been executed once before
    });
    return this;
  }

  // Sends a query to the database
  async query(queryString) {
    return new Promise((resolve, reject) => {
      this.db.all(queryString, (err, rows) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = Database;
