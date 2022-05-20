const router = require("express").Router();
const Posts = require("../controllers/posts");

//Create Post
router.post("/", Posts.createPost);

//Update Post
router.put("/:id", Posts.updatePost);

//Delete Post
router.delete("/:id", Posts.deletePost);

//Like Post
router.put("/:id/like", Posts.likePost);

//Get Post
router.get("/:id", Posts.getPost);

//Timeline Post
router.get("/timeline/all", Posts.timeline);

//Get User All Posts
router.get("/user-posts/:id", Posts.userAllPosts);

module.exports = router;
