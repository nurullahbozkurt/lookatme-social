const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: { type: String },
    senderId: { type: String },
    receiverId: { type: String },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
