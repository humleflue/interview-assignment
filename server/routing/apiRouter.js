const express = require(`express`);
const router = express.Router();

const checkDatabaseConnection = require(`../models/checkDatabaseConnection`);
const userRouter = require(`./userRouter`);

router.get(`/`, checkDatabaseConnection);
router.use(`/users`, userRouter); // IA: Handles all URI requests relating users

module.exports = router;
