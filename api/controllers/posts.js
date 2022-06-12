const { Post } = require("../models/Post");
const Following = require("../models/Following");
const Likes = require("../models/Likes");
const User = require("../models/User");
const multer = require("multer");
const { updateOne } = require("../models/Likes");
const Comments = require("../models/Comments");
const CommentLikes = require("../models/CommentLikes");

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
  upload(req, res, async (err) => {
    if (req.file) {
      if (err) {
        return res.status(400).json({
          error: err.message,
        });
      }

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
    const post = await Post.findById(req.params.id)
      .populate({
        path: "user",
        select: { isAdmin: 0, createdAt: 0, updatedAt: 0, _id: 0 },
      })
      .populate([{ path: "likes" }])
      .populate({
        path: "comments",
        populate: [
          {
            path: "commentLikes",
            model: "CommentLikes",
          },
          {
            path: "user",
            model: "User",
          },
        ],
      });

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.getPost = getPost;

//Get User All Posts
const userAllPosts = async (req, res) => {
  const user = await User.findById(req.user._id);
  const userPosts = await Post.find({ userId: req.params.id })
    .populate({
      path: "user",
      select: { isAdmin: 0, createdAt: 0, updatedAt: 0 },
    })
    .populate({
      path: "likes",
      populate: {
        path: "likedUser",
        select: {
          coverPicture: 0,
          createdAt: 0,
          updatedAt: 0,
          isAdmin: 0,
        },
      },
    })
    .populate({
      path: "comments",
      populate: [
        {
          path: "commentLikes",
          model: "CommentLikes",
        },
        {
          path: "user",
          model: "User",
        },
      ],
    });
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
  const Like = await Likes.find({ postId: post.id });

  const likedControl = Like.some((like) => like.userId === req.user._id);
  // const posts = post.likes.map((like) => like.id).includes(req.user._id);

  if (Like.length === 0 || !likedControl) {
    try {
      const newLikes = new Likes({
        userId: req.user._id,
        postId: req.params.id,
      });
      await newLikes.save();

      res.status(200).json("Post liked !");
      // const whoLikedThePost = await User.findById(req.user._id);
      // await post.updateOne({
      //   $push: {
      //     likes: [{ id: req.user._id, img: whoLikedThePost.profilePicture }],
      //   },
      // });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    try {
      await Likes.findOneAndDelete({
        userId: req.user._id,
        postId: req.params.id,
      });
      res.status(200).json("Post disliked !");
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports.likePost = likePost;

//Comment Post
const commentPost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  try {
    const newComment = new Comments({
      userWhoCommentedId: req.user._id,
      postId: post._id,
      comment: req.body.comment,
    });
    await newComment.save();
    res.status(200).json("Comment added !");
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.commentPost = commentPost;

// Delete Comment
const deleteComment = async (req, res) => {
  const comment = await Comments.findById(req.params.id);
  if (!comment) {
    return res.status(404).json("Comment not found !");
  }
  try {
    await Comments.findOneAndDelete({
      userWhoCommentedId: req.user._id,
      _id: req.params.id,
    });
    res.status(200).json("Comment deleted !");
  } catch (err) {
    res.status(500).json(err);
  }
  try {
    await CommentLikes.findOneAndDelete({
      userId: req.user._id,
      commentId: req.params.id,
    });
    res.status(200).json("Comment disliked !");
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.deleteComment = deleteComment;

// Like to Post's Comment
const likeComment = async (req, res) => {
  const comment = await Comments.findById(req.params.id);
  const Like = await CommentLikes.find({ commentId: comment._id });
  console.log("Like", Like);
  console.log("comment", comment);

  if (Like.length === 0) {
    try {
      const newLikes = new CommentLikes({
        userId: req.user._id,
        commentId: comment._id,
      });
      await newLikes.save();

      res.status(200).json("Comment liked !");
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (Like.length !== 0) {
    try {
      await CommentLikes.findOneAndDelete({
        userId: req.user._id,
        commentId: req.params.id,
      });
      res.status(200).json("Comment disliked !");
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
module.exports.likeComment = likeComment;

//Get My Timeline Posts
const myTimeline = async (req, res) => {
  const user = await User.findById(req.params.id);
  const following = await Following.find({ myId: req.user._id });

  if (!user) {
    return res.status(404).json("User not found !");
  }
  if (user.id !== req.user._id) {
    return res.status(401).json("You are not authorized !");
  }

  try {
    const me = await User.findById(req.user._id);
    const mePost = await Post.find({ userId: me.id })
      .populate({
        path: "user",
        select: { isAdmin: 0, createdAt: 0, updatedAt: 0 },
      })
      .populate({
        path: "likes",
        populate: {
          path: "likedUser",
          select: {
            coverPicture: 0,
            createdAt: 0,
            updatedAt: 0,
            isAdmin: 0,
          },
        },
      })
      .populate({
        path: "comments",
        populate: [
          {
            path: "commentLikes",
            model: "CommentLikes",
          },
          {
            path: "user",
            model: "User",
          },
        ],
      });

    const friendsPosts = await Promise.all(
      following.map((follow) => {
        return Post.find({ userId: follow.followingId })
          .populate({
            path: "user",
            select: { isAdmin: 0, createdAt: 0, updatedAt: 0 },
          })
          .populate({
            path: "likes",
            populate: {
              path: "likedUser",
              select: {
                coverPicture: 0,
                createdAt: 0,
                updatedAt: 0,
                isAdmin: 0,
              },
            },
          })
          .populate({
            path: "comments",
            populate: [
              {
                path: "commentLikes",
                model: "CommentLikes",
              },
              {
                path: "user",
                model: "User",
              },
            ],
          });
      })
    );
    if (mePost) {
      res.status(200).json(mePost.concat(...friendsPosts).reverse());
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
