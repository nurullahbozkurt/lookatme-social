const Conversation = require("../models/conversation");

// Create a new conversation
const createMessage = async (req, res) => {
  const conversation = await Conversation.find({
    members: [req.user._id && req.body.receiverId],
  });
  console.log("CONVERSATION", conversation);
  if (conversation.length > 0) {
    return res.status(200).json(conversation[0]);
  }

  try {
    const newConversation = new Conversation({
      members: [req.user._id, req.body.receiverId],
    });
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    console.log(err);
  }
};
module.exports.createMessage = createMessage;

// Get conversations
const getConversation = async (req, res) => {
  const otherUser = await Conversation.find({
    members: { $in: [req.user._id] },
  });

  const otherUserId = otherUser.map((user) =>
    user.members.filter((id) => id !== req.user._id)
  );
  console.log("OTHER USER", otherUserId);

  try {
    const conversation = await Conversation.find({
      members: { $in: [req.user._id] },
    })
      .populate({ path: "message" })
      .populate({
        path: "user",
        match: {
          _id: { $in: otherUserId },
        },
      });
    res.status(200).json(conversation.reverse());

    console.log("conversation", conversation);
  } catch (err) {
    console.log(err);
  }
};
module.exports.getConversation = getConversation;
