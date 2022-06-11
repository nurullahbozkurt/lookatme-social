const mongoose = require("mongoose");

const CommentLikesSchema = new mongoose.Schema({
  userId: { type: String, default: "" }, //User who liked this comment
  commentId: { type: String, default: "" },
});

const CommentLikes = mongoose.model("CommentLikes", CommentLikesSchema);
module.exports = CommentLikes;
