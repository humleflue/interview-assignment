const path = require(`path`);

const HTTPError = require(`../helpers/HTTPError`);
const User = require(`../models/User`);

// IA: The deleted users are concidered log files.
const deletedUsersFilesDir = path.join(__dirname, `..`,  `logs`, `deleted_users`);

class UserController {
  async getAll(req, res) {
    const users = await new User().getAll();
    res.json(users);
  }

  // IA: Get's user from db,
  //     Logs the user to a file and checks if data integrety is maintained,
  //     Deletes the user from db
  async deleteById(req, res) {
    const { id } = req.params;

    const user = await new User(id).get();

    const filePath = path.join(deletedUsersFilesDir, `${user.id}.json`);
    const userInFile = await user.writeToFile(filePath);
    // Validate data integrety
    if (!user.isEqualTo(userInFile)) {
      throw new HTTPError(
        500,
        `The server was unable to maintain data integrety when trying to log the user to a file.`,
        `Internal Server Error.`,
      );
    }

    await user.delete();
    res.status(204).send(); // 204: No Content
  }
}

module.exports = new UserController();
