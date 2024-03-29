const router = require("express").Router();
const Users = require("../controllers/users");
const validateLogin = require("../middlewares/verifyToken");

//Get All Users
router.get("/all-users", Users.getAllUsers);

//Update User
router.put("/:id", validateLogin.verifyToken, Users.getUpdateUser);

// Post Profile Picture
router.post(
  "/:id/profile-picture",
  validateLogin.verifyToken,
  Users.postProfilePicture
);

// Post Cover Picture
router.post(
  "/:id/cover-picture",
  validateLogin.verifyToken,
  Users.postCoverPicture
);

//Delete User
router.delete("/:id", validateLogin.verifyToken, Users.getDeleteUser);

//Get User
router.get("/:id", validateLogin.verifyToken, Users.getUser);

//Follow User
router.put("/:id/follow", validateLogin.verifyToken, Users.followUser);

//Unfollow User
router.put("/:id/unfollow", validateLogin.verifyToken, Users.unfollowUser);

module.exports = router;
