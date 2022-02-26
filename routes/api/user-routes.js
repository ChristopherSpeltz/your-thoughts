const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

// GET all users
router.route("/").get(getAllUsers).post(createUser);

// GET user by ID
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

//POST/DELETE friends
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
