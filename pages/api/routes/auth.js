const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const Auth = require("../controllers/auth");

//REGISTER
router.post("/register", Auth.postRegister);

//LOGIN
router.post("/login", Auth.postLogin);

module.exports = router;
