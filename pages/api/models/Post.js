const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    // likes: [
    //   { id: { type: String, default: "" }, img: { type: String, default: "" } },
    // ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.img = process.env.APP_URL + "/uploads/" + ret.img;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

PostSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

PostSchema.virtual("likes", {
  ref: "Likes",
  localField: "_id",
  foreignField: "postId",
  justOne: false,
});

PostSchema.virtual("comments", {
  ref: "Comments",
  localField: "_id",
  foreignField: "postId",
  justOne: false,
});

const Post = mongoose.model("Post", PostSchema, "posts");
module.exports = { Post };
