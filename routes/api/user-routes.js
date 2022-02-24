const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
} = require("../../controllers/user-controller");

// GET all users
router.route("/").get(getAllUsers).post(createUser);

// GET user by ID
router.route("/:userId").get(getUserById);



module.exports = router;
