const router = require("express").Router();
const Messages = require("../controllers/messages");
const validateLogin = require("../middlewares/verifyToken");

// Create a new message
router.post("/", validateLogin.verifyToken, Messages.createMessage);

// Get all messages
router.get("/:conversationId", validateLogin.verifyToken, Messages.getMessages);

module.exports = router;
