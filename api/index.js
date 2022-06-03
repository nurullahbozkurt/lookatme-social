const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");

// it fixes express's error handler to work with async/await
// we should remove this package and this line when Express v5 is released.
// https://www.npmjs.com/package/express-async-errors
// https://dev.to/pr0gramista/fix-your-express-error-handling-now-4h2l
require("express-async-errors");

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
app.use(helmet({ crossOriginEmbedderPolicy: false }));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
//app.use("/public", express.static(path.join(__dirname, "/public")));

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
const storage = multer.diskStorage({
  destination: "public/uploads",
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 },
}).single("file");

app.post("/api/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
    return res.json({
      filePath: `/uploads/${req.file.filename}`,
    });
  });
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json("error");
});

const PORT = process.env.PORT || 5000;
