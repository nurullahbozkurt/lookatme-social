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
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json(user);
      } catch (err) {
        res.status(404).json(err);
      }
    }
  } catch (err) {
    res
      .status(500)
      .json("Sadece kendi kullanıcı bilgilerinizi güncelleyebilirsiniz !");
  }
};
module.exports.getUpdateUser = getUpdateUser;

// Delete User
const getDeleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(user);
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json(`${user.username} isimli kullanıcı silindi`);
      } catch (err) {
        res.status(404).json(err);
      }
    }
  } catch (err) {
    res.status(500).json("Kullanıcı silinemez !");
  }
};

module.exports.getDeleteUser = getDeleteUser;

// Get User
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, createdAt, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(404).json(err);
  }
};
module.exports.getUser = getUser;

// Follow User
const followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("Kullanıcı takipçi listesine eklendi !");
      } else {
        res.status(200).json("Kullanıcıyı zaten takip ediyorsunuz !");
      }
    } catch (err) {
      res.status(404).json(err);
    }
  }
};
module.exports.followUser = followUser;

// Unfollow User

const unfollowUser = async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("Kullanıcı takipçi listesinden çıkarıldı !");
      } else {
        res.status(200).json("Kullanıcıyı zaten takip etmiyorsun !");
      }
    } catch (err) {
      res.status(404).json(err);
    }
  }
};
module.exports.unfollowUser = unfollowUser;
