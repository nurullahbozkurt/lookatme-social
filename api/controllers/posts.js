const Post = require("../models/Post");
const User = require("../models/User");

//Create Post
const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.createPost = createPost;

//Update Post
const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.userId === req.body.userId) {
    try {
      await Post.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Post Güncellendi !");
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
module.exports.updatePost = updatePost;

//Delete Post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("Post Başarıyla Silindi !");
    } else {
      res.status(401).json("Bu postu silme yetkiniz yok !");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.deletePost = deletePost;

//Get Post
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.getPost = getPost;

//Get User All Posts
const userAllPosts = async (req, res) => {
  const user = await User.findById(req.params.id);
  const userPosts = await Post.findOne({ userId: req.params.id });

  if (user) {
    if (userPosts) {
      try {
        const userPosts = await Post.find({ userId: req.params.id });
        res.status(200).json(userPosts);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Kullanıcıya ait post yok !");
    }
  } else {
    res.status(404).json("Kullanıcı Bulunamadı !");
  }
};
module.exports.userAllPosts = userAllPosts;

//Like and Dislike Post
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Postu Beğendin !");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post beğenmekten vazgeçtin !");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.likePost = likePost;

//Get Timeline Posts
const timeline = async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPost = await Post.find({ userId: currentUser._id });
    const userFriends = currentUser.following;

    const friendsPosts = await Promise.all(
      userFriends.map((friend) => {
        return Post.find({ userId: friend });
      })
    );

    res.status(200).json(userPost.concat(...friendsPosts));
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.timeline = timeline;
