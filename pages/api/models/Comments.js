const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
  {
    userWhoCommentedId: { type: String, default: "" }, //User who commented the post
    comment: { type: String, default: "" },
    postId: { type: String, default: "" },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

CommentsSchema.virtual("commentLikes", {
  ref: "CommentLikes",
  localField: "_id",
  foreignField: "commentId",
  justOne: false,
});

CommentsSchema.virtual("user", {
  ref: "User",
  localField: "userWhoCommentedId",
  foreignField: "_id",
  justOne: false,
});
const Comments = mongoose.model("Comments", CommentsSchema);
module.exports = Comments;
