# CEGO job interview assignment
This is an interview assignment made by CEGO. The assignment description can be found in the readme on the original repo (https://github.com/cego/interview-assignment).

## Setup
To be able to run the program you need to...

Create a new file in the root dir named: `server_settings.js`. In this file you're required to provide the following options:
```
const settings = {
  log: *boolean*,
  logErrors: *boolean*,
  production: *boolean*,
  port: *integer*,
};

module.exports = settings;

```