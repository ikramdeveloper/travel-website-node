const express = require("express");
const router = express.Router();
const uniqId = require("uniqid");
const { findOne } = require("../models/post.model");
const Post = require("../models/post.model");
const authMiddleware = require("../middleware/auth");

router.get("/", async (req, resp) => {
  const posts = await Post.find();
  resp.send(posts);
});

router.get("/:id", async (req, resp) => {
  const id = req.params.id;
  const post = await Post.findOne({ id });
  resp.send(post);
});

router.post("/", authMiddleware, async (req, resp) => {
  const data = req.body;
  let imgPath;
  if (data.imageUrl) {
    imgPath = data.imageUrl;
  } else {
    imgPath = req.file.path.substring(
      req.file.path.indexOf(`\\`),
      req.file.path.length
    );
  }

  const newPost = new Post({
    id: uniqId(),
    title: data.title,
    date: new Date(),
    description: data.description,
    text: data.text,
    country: data.country,
    imageUrl: imgPath,
  });
  //   console.log(req.file);
  await newPost.save().then(() => resp.send("post created"));
});

router.delete("/:id", authMiddleware, async (req, resp) => {
  const id = req.params.id;
  await Post.deleteOne({ id });
  resp.send("deleted");
});

router.put("/:id", authMiddleware, async (req, resp) => {
  const id = req.params.id;
  await Post.updateOne({ id }, req.body);
  resp.send("updated");
});

module.exports = router;
