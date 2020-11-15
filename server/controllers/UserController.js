const path = require(`path`);

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
    await user.writeToFile(filePath);

    await user.delete();
    res.status(204).send();
  }
}

module.exports = new UserController();
