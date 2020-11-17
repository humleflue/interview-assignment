# CEGO job interview assignment
This is an interview assignment made by CEGO. The assignment description can be found in the readme on the original repo (https://github.com/cego/interview-assignment).

## Preface
I know that I have done a lot more than what the assignment suggested. I only did this to challenge myself because I found the assignment fun and entertaining. Also, I have made a node api in the past, which I used here as a template. I have tried to minimize the fluff though, and hopefully the **Reviewing my code** section will clear up, where to find the important parts :)

I have used the tag `IA:` in the comments in the code, to mark the parts of the code, which are directly related to the assignment.

## Setup
To be able to run the program you need to do the following:
* Download and install nodejs: https://nodejs.org/en/
* Clone this repo
* Navigate to the root directory of the cloned content
* Run `npm i --production` to install all necessary dependencies
* Run `npm start` to start the server
* Install Postman to be able to test the API: https://www.postman.com/

## Reviewing my code
After the setup has been completed, you can now test that the assignment has been done, by sending a HTTP DELETE-request with Postman to the server on the follwing URI:

`http://localhost:3000/api/users/id/INSERT-ID-HERE`

You can also query for all users by sending a GET-request to the following URI (Not part of the assignment, but it makes it easy to find a new ID to delete by):

`http://localhost:3000/api/users`

As I stated in the preface, I've tagged all of the code related to the assignment with the tag `IA:`.

The most essential parts of the code for solving the task can be found in the following directories:
* **User controller:** `server/controllers/UserController.js`
  * This is the controller, which handles all user related requests and communicates with the User model
* **User model:** `server/models/User.js`
  * This is the model, which communicates with the database and thereby represents the data in the database.
