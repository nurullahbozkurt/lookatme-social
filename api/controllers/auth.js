const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//REGISTER
const postRegister = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userEmailExists = await User.findOne({ email: req.body.email });
    const userNameExists = await User.findOne({ username: req.body.username });

    if (userEmailExists || userNameExists) {
      return res.status(409).json({
        errors: {
          message: "Email or username already exists !",
        },
      });
    }

    let user = await User.create({
      username: req.body.username,
      name: req.body.name,
      lastName: req.body.lastName,
      country: req.body.country,
      city: req.body.city,
      email: req.body.email,
      password: hashedPassword,
    });

    user = user.toJSON();

    delete user.password;

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
  if (req.body.email === "" || req.body.password === "") {
    return res.status(401).json({
      message: "Please fill all fields !",
    });
  }
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user) {
      return res.status(401).json({
        message: "Check your email and password or create an account !",
      });
    }

    const sendUser = await User.findById(user._id);
    const { password, ...others } = user._doc;
    const payload = {
      user: others,
    };
    const accessToken = generateToken(payload);

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).json({
        message: "Check your email and password or create an account !",
      });
    }

    res.status(200).json({ user: sendUser, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.postLogin = postLogin;
