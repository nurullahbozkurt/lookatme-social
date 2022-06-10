const mongoose = require("mongoose");

const FollowersSchema = new mongoose.Schema(
  // change name followers to followersId
  {
    myId: { type: String, default: "" },
    followersId: { type: String, default: "" },
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

FollowersSchema.virtual("user", {
  ref: "User",
  localField: "followersId",
  foreignField: "_id",
  justOne: false,
});

const Followers = mongoose.model("Followers", FollowersSchema);
module.exports = Followers;
