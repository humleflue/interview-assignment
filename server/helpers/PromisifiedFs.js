const fs = require(`fs`);

// This calss is used to avoid callback hell.
// The class is an adapter,
// which turns functions from the fs library into promises
class PromisifiedFs {
  async writeFile(filePath, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, data, (err) => {
        if (err) {
          reject(err);
        }
        else {
          resolve();
        }
      });
    });
  }

  async readFile(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = new PromisifiedFs();
