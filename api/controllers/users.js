const User = require("../models/User");
const bcrypt = require("bcrypt");

//Get All Users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.getAllUsers = getAllUsers;

//Update User
const getUpdateUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json("User not found !");
  }
  if (req.params.id !== req.user._id) {
    return res.status(401).json("You can't update another user !");
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  try {
    await User.findByIdAndUpdate(req.user._id, {
      $set: req.body,
    });
    res.status(200).json("User updated !");
  } catch (err) {
    res.status(404).json(err);
  }
};
module.exports.getUpdateUser = getUpdateUser;

// Delete User
const getDeleteUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json("User not found !");
  }
  if (!user || req.params.id !== req.user._id) {
    return res.status(401).json("You can't delete another user !");
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json(`${user.username} has been deleted`);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getDeleteUser = getDeleteUser;

// Get User
const getUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json("User not found !");
  }
  if (req.params.id !== req.user._id) {
    return res.status(401).json("You can't see another user !");
  }

  try {
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.getUser = getUser;

// Follow User
const followUser = async (req, res) => {
  const me = await User.findById(req.user._id);
  const otherUser = await User.findById(req.params.id);

  if (!me || !otherUser) {
    return res.status(404).json("User not found !");
  }

  if (req.params.id === req.user._id) {
    return res.status(403).json("You can't follow yourself !");
  }

  if (otherUser.followers.includes(req.user._id)) {
    return res.status(403).json("You are already following this user !");
  }
  await otherUser.updateOne({ $push: { followers: req.user._id } });
  await me.updateOne({ $push: { following: req.params.id } });

  res.status(200).json("You are now following this user !");
};
module.exports.followUser = followUser;

// Unfollow User

const unfollowUser = async (req, res) => {
  const me = await User.findById(req.user._id);
  const otherUser = await User.findById(req.params.id);

  if (!me || !otherUser) {
    return res.status(404).json("User not found !");
  }

  if (req.params.id === req.user._id) {
    return res.status(403).json("You can't unfollow yourself !");
  }
  if (!otherUser.followers.includes(req.user._id)) {
    return res.status(403).json("You are not already following this user !");
  }
  await otherUser.updateOne({ $pull: { followers: req.user._id } });
  await me.updateOne({ $pull: { following: req.params.id } });

  res.status(200).json("You are not following this user !");
};
module.exports.unfollowUser = unfollowUser;
