const mongoose = require("mongoose");

const LikesSchema = new mongoose.Schema(
  {
    userId: { type: String, default: "" },
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
LikesSchema.virtual("likedUser", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: false,
});
const Likes = mongoose.model("Likes", LikesSchema);
module.exports = Likes;
