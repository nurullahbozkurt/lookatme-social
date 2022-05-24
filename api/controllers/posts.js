const Post = require("../models/Post");
const User = require("../models/User");
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

//Create Post
const createPost = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json("User not found !");
  }

  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.createPost = createPost;

//Add Post Image
const addPostImg = async (req, res) => {
  console.log("istek geldi");
  upload(req, res, async (err) => {
    if (req.file) {
      if (err) {
        return res.status(400).json({
          error: err.message,
        });
      }

      console.log(req.user);

      await Post.updateOne(
        { _id: req.params.id },
        {
          img: req.file.path.replace("public/", ""),
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
module.exports.addPostImg = addPostImg;

//Update Post
const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json("Post not found !");
  }

  if (post.userId !== req.user._id) {
    return res.status(401).json("You are not authorized !");
  }

  try {
    await post.updateOne(req.body);
    res.status(200).json("Post updated !");
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.updatePost = updatePost;

//Delete Post
const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json("Post not found !");
  }

  if (post.userId !== req.user._id) {
    return res.status(401).json("You are not authorized !");
  }

  try {
    await post.remove();
    res.status(200).json("Post deleted !");
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
  const user = await User.findById(req.user._id);
  const userPosts = await Post.find({ userId: req.params.id });

  if (!user) {
    return res.status(404).json("User not found !");
  }
  if (req.params.id !== req.user._id) {
    return res.status(401).json("You are not authorized !");
  }
  try {
    res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.userAllPosts = userAllPosts;

//Like and Dislike Post
const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  try {
    if (!post.likes.includes(req.user._id)) {
      await post.updateOne({ $push: { likes: req.user._id } });
      res.status(200).json("Post liked !");
    } else {
      await post.updateOne({ $pull: { likes: req.user._id } });
      res.status(200).json("Post disliked !");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.likePost = likePost;

//Get My Timeline Posts
const myTimeline = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json("User not found !");
  }
  try {
    const me = await User.findById(req.user._id);
    const mePost = await Post.find({ userId: me.id });
    const myfriends = me.following;

    const friendsPosts = await Promise.all(
      myfriends.map((friend) => {
        return Post.find({ userId: friend });
      })
    );
    if (mePost) {
      res.status(200).json(mePost.concat(...friendsPosts));
    }
    res.status(200).json(friendsPosts);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.myTimeline = myTimeline;

//Get All Posts
const getAllPosts = async (req, res) => {
  const postsCount = await Post.find().countDocuments();

  try {
    const posts = await Post.find();
    res.status(200).json({ posts, postsCount });
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.getAllPosts = getAllPosts;
