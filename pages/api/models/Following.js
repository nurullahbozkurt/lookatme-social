const mongoose = require("mongoose");

const FollowingSchema = new mongoose.Schema(
  // change name following to followingId
  {
    myId: { type: String, default: "" },
    followingId: { type: String, default: "" },
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

FollowingSchema.virtual("user", {
  ref: "User",
  localField: "followingId",
  foreignField: "_id",
  justOne: false,
});

const Following = mongoose.model("Following", FollowingSchema);
module.exports = Following;
