const _ = require(`lodash`);

const db = require(`./database/Database`);
const HTTPError = require(`../helpers/HTTPError`);
const pfs = require(`../helpers/PromisifiedFs`);

class User {
  constructor(id, firstName = undefined, lastName = undefined, email = undefined) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  async get() {
    let user;
    try {
      user = await db.query(`SELECT * FROM users WHERE id = '${this.id}'`).then((x) => x[0]);
    }
    catch (err) {
      throw new HTTPError(500, err, `Internal Server Error.`);
    }

    // If the user with the given id wasn't found: Throw an error.
    if (user === undefined || _.isEmpty(user)) {
      throw new HTTPError(409, `Invalid user id: ${this.id}.`,
        `The server was unable to find a user with the given id.`);
    }

    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
  }

  async delete() {
    try {
      await db.query(`DELETE FROM users WHERE id = '${this.id}'`);
    }
    catch (err) {
      throw new HTTPError(500, err, `Internal Server Error.`);
    }
  }

  // Write the user to a JSON-file with the userId as the filename
  // Returns the data which was written to the file
  async writeToFile(filePath) {
    try {
      await pfs.writeFile(filePath, JSON.stringify(this));
      return await pfs.readFile(filePath)
        .then((x) => JSON.parse(x))
        .then((x) => new User(x.id, x.firstName, x.lastName, x.email));
    }
    catch (err) {
      throw new HTTPError(500, err, `Internal Server Error.`);
    }
  }

  isEqual(user) {
    return _.isEqual(this, user);
  }
}

module.exports = User;
