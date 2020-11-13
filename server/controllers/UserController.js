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

    // Get user from db
    const user = await new User(id).get();

    // Write the user to a file and check if data integrety has been maintained
    const filePath = path.join(deletedUsersFilesDir, `${user.id}.json`);
    await user.writeToFile(filePath);

    // If everything went well up untill now we can safely delete the user from the database.
    await user.delete();
    // According to https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
    // we should respond with a status 204 and an empty response on a DELETE-request.
    res.status(204).send();
  }
}

module.exports = new UserController();
