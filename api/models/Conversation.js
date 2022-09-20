const mongoose = require("mongoose");
const User = require("../models/User");

const ConversationSchema = new mongoose.Schema(
  {
    members: { type: Object },
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

ConversationSchema.virtual("user", {
  ref: "User",
  localField: "members",
  foreignField: "_id",
  justOne: false,
});

ConversationSchema.virtual("message", {
  ref: "Message",
  localField: "_id",
  foreignField: "conversationId",
  justOne: true,
  options: {
    sort: { createdAt: -1 },
  },
});

const Conversation = mongoose.model("Conversation", ConversationSchema);
module.exports = Conversation;
