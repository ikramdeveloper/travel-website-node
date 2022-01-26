const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  id: String,
  title: String,
  date: Date,
  description: String,
  text: String,
  country: String,
  imageUrl: String,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
