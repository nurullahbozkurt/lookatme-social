const Message = require("../models/message");

// Create a new message
const createMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.json({ message: "Message created successfully" });
  } catch (err) {
    console.log(err);
  }
};
module.exports.createMessage = createMessage;

// Get all messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
  }
};
module.exports.getMessages = getMessages;
