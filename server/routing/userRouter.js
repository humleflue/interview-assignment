const express = require(`express`);
const router = express.Router();

const userController = require(`../controllers/UserController`);

router.get(`/`, userController.getAll);
router.delete(`/id/:id`, userController.deleteById); // IA

module.exports = router;
