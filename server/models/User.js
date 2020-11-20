const _ = require(`lodash`);

const Database  = require(`./database/Database`);
const HTTPError = require(`../helpers/HTTPError`);
const pfs       = require(`../helpers/PromisifiedFs`);

// IA: The user model, which handles all comunication with the db concerning users
class User {
  constructor(id, firstName, lastName, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  // A second way to construct this object.
  // Constructs 'this' from a generic object
  constructFromObject(genericUserObject) {
    Object.assign(this, genericUserObject);
    return this;
  }

  // Returns an array of all users in the db
  async getAll() {
    const db = new Database();

    try {
      const dataArray = await db.connect().query(`SELECT * FROM users`);
      const users = dataArray.map((x) => new User().constructFromObject(x));
      return users;
    }
    catch (err) {
      throw new HTTPError(503, err, `Service Unavailable.`);
    }
    finally {
      db.close();
    }
  }

  // IA: Get's this instance of the user from the db
  async get() {
    let userData;
    const db = new Database();

    try {
      userData = await db.connect().query(`SELECT * FROM users WHERE id = '${this.id}'`)
        .then((x) => x[0]);
    }
    catch (err) {
      throw new HTTPError(503, err, `Service Unavailable.`);
    }
    finally {
      db.close();
    }

    // If the user with the given id wasn't found: Throw an error.
    if (userData === undefined) {
      throw new HTTPError(409, `Invalid user id: ${this.id}.`,
        `The server was unable to find a user with id: ${this.id}.`);
    }

    // Construct this object
    this.constructFromObject(userData);
    return this;
  }

  // IA: Deletes this instance of the user from the db
  async delete() {
    const db = new Database();

    try {
      await db.connect().query(`DELETE FROM users WHERE id = '${this.id}'`);
    }
    catch (err) {
      throw new HTTPError(503, err, `Service Unavailable.`);
    }
    finally {
      db.close();
    }
  }

  // IA: Writes the user to a JSON-file.
  //     Returns the written data as a new User object
  async writeToFile(jsonFilePath) {
    try {
      await pfs.writeFile(jsonFilePath, JSON.stringify(this));
      return await pfs.readFile(jsonFilePath)
        .then((x) => JSON.parse(x))
        .then((x) => new User().constructFromObject(x));
    }
    catch (err) {
      throw new HTTPError(500, err, `Internal Server Error.`);
    }
  }

  // IA: Determines whether a given user is identical by value to an instance of this class,
  //     Returns true if they are identical, returns false if they are not.
  isEqualTo(user) {
    return _.isEqual(this, user);
  }
}

module.exports = User;
