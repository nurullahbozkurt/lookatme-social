const router = require("express").Router();
const Users = require("../controllers/users");

//Get All Users
router.get("/all-users", Users.getAllUsers);

//Update User
router.put("/:id", Users.getUpdateUser);

//Delete User
router.delete("/:id", Users.getDeleteUser);

//Get User
router.get("/:id", Users.getUser);

//Follow User
router.put("/:id/follow", Users.followUser);

//Unfollow User
router.put("/:id/unfollow", Users.unfollowUser);

module.exports = router;
