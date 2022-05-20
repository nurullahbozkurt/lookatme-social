const express = require("express");
const app = express();

const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");

const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");

//middleware
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoose connected");
    app.listen(PORT, () => {
      console.log(`Listening port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

const PORT = process.env.PORT || 5000;
