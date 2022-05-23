const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//REGISTER
const postRegister = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.postRegister = postRegister;

//Generate JWT
const generateToken = (payload) => {
  return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "1 days" });
};

//LOGIN
const postLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const { password, ...others } = user._doc;
    const payload = {
      user: others,
    };
    const accessToken = generateToken(payload);
    if (!user) {
      return res
        .status(404)
        .json({
          message:
            "There was a problem logging in. Check your email and password or create an account !",
        });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(404)
        .json({
          message:
            "There was a problem logging in. Check your email and password or create an account !",
        });
    }

    res.status(200).json({ user: payload.user, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.postLogin = postLogin;
