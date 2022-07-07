const router = require("express").Router();
const Conversations = require("../controllers/conversations");
const validateLogin = require("../middlewares/verifyToken");

// Create a new conversation
router.post("/", validateLogin.verifyToken, Conversations.createMessage);

// Get conversations
router.get("/", validateLogin.verifyToken, Conversations.getConversation);

module.exports = router;
