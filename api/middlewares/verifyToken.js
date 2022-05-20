const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res.status(401).json("Token is not valid");
      }

      req.user = data.payload.user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};
module.exports.verifyToken = verifyToken;
