const path = require(`path`);

const User = require(`../models/User`);
const db = require(`../models/database/Database`);
const HTTPError = require(`../helpers/HTTPError`);

const deletedUsersFilesDir = path.join(__dirname, `..`,  `logs`, `deleted_users`);

class UserController {
  async getAll(req, res) {
    try {
      const users = await db.query(`SELECT * FROM users`);
      res.json(users);
    }
    catch (err) {
      throw new HTTPError(500, err, `Internal Server Error.`);
    }
  }

  async deleteById(req, res) {
    const { userId } = req.params;

    // Get user from db
    const user = new User(userId);
    await user.get();

    // Write the user to a file and check if data integrety has been maintained.
    const filePath = path.join(deletedUsersFilesDir, `${user.id}.json`);
    const userInFile = await user.writeToFile(filePath);
    // Throw an error if data integrety isn't maintained.
    if (!user.isEqual(userInFile)) {
      throw new HTTPError(500, `Unable to retain data integrety. Delete aborted.`,
        `The server was unable to maintain data integrety when trying to log the user to a file. Delete aborted.`);
    }

    // If everything went well up untill now we can safely delete the user from the database.
    await user.delete();
    res.json(user);
  }
}

module.exports = new UserController();
