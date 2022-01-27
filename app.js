const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const postsRouter = require("./routes/posts.route");
const callRequestsRouter = require("./routes/call-request.route");
const emailsRouter = require("./routes/email.route");
const Post = require("./models/post.model");
const usersRouter = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const auth = require("./controllers/auth");
const formatDate = require("date-fns/formatDistanceToNow");

// mongoose.connect("mongodb://localhost/travels");
mongoose.connect(
  "mongodb+srv://ikram:ikramtariq24@mycluster.otksj.mongodb.net/travels"
);
app.use(express.json());
app.set("view engine", "ejs");

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/images"),
  filename: (req, file, cb) => cb(null, file.originalname),
});
app.use(multer({ storage: imageStorage }).single("imageFile"));

app.use(express.static("public"));
app.use(cookieParser());
app.use("/posts", postsRouter);
app.use("/call-requests", callRequestsRouter);
app.use("/emails", emailsRouter);
app.use("/users", usersRouter);

app.get("/landmark", async (req, resp) => {
  const id = req.query.id;
  const post = await Post.findOne({ id });
  resp.render("landmark", {
    title: post.title,
    imageUrl: post.imageUrl,
    date: formatDate(post.date, { addSuffix: true }),
    text: post.text,
  });
});

app.get("/admin", (req, resp) => {
  const token = req.cookies["auth_token"];
  if (token && auth.checkToken(token)) {
    resp.render("admin");
  } else {
    resp.redirect("/login");
  }
});

app.get("/login", (req, resp) => {
  const token = req.cookies["auth_token"];
  if (token && auth.checkToken(token)) {
    resp.redirect("/admin");
  } else {
    resp.render("login");
  }
});

let port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening ${port}...`));
