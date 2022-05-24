const User = require("../models/User");
const bcrypt = require("bcrypt");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "public/uploads",
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 },
}).single("file");

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

// Post Profile Picture
const postProfilePicture = (req, res) => {
  console.log("istek geldi");
  upload(req, res, async (err) => {
    if (req.file) {
      if (err) {
        return res.status(400).json({
          error: err.message,
        });
      }

      console.log(req.user);

      await User.updateOne(
        { _id: req.user._id },
        {
          profilePicture: req.file.path.replace("public/", ""),
        }
      );

      return res.json({
        message: "File uploaded",
        file: req.file,
      });
    } else {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }
  });
};
module.exports.postProfilePicture = postProfilePicture;

// Post Cover Picture
const postCoverPicture = async (req, res) => {
  console.log("istek geldi");
  upload(req, res, async (err) => {
    if (req.file) {
      if (err) {
        return res.status(400).json({
          error: err.message,
        });
      }

      console.log(req.user);

      await User.updateOne(
        { _id: req.user._id },
        {
          coverPicture: req.file.path.replace("public/", ""),
        }
      );

      return res.json({
        message: "File uploaded",
        file: req.file,
      });
    } else {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }
  });
};
module.exports.postCoverPicture = postCoverPicture;

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
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.getUser = getUser;

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
