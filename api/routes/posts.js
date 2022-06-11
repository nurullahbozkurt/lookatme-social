const router = require("express").Router();
const Posts = require("../controllers/posts");
const validateLogin = require("../middlewares/verifyToken");

//Create Post
router.post("/", validateLogin.verifyToken, Posts.createPost);

//Get All Posts
router.get("/allposts", Posts.getAllPosts);

// Add Post Img
router.post("/:id/add-post-img", validateLogin.verifyToken, Posts.addPostImg);

//Update Post
router.put("/:id", validateLogin.verifyToken, Posts.updatePost);

//Delete Post
router.delete("/:id", validateLogin.verifyToken, Posts.deletePost);

//Like Post
router.put("/:id/like", validateLogin.verifyToken, Posts.likePost);

// Comment Post
router.post("/:id/comment", validateLogin.verifyToken, Posts.commentPost);

// Delete Comment
router.delete("/:id/comment/", validateLogin.verifyToken, Posts.deleteComment);

// Like to Post's Comment
router.post("/:id/comment-like", validateLogin.verifyToken, Posts.likeComment);

//Get Post
router.get("/:id", Posts.getPost);

//Get User All Posts
router.get("/:id/user-posts", validateLogin.verifyToken, Posts.userAllPosts);

//My Time Line Post
router.get("/:id/my-timeLine", validateLogin.verifyToken, Posts.myTimeline);

module.exports = router;
