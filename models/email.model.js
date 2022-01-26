const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  id: String,
  name: String,
  email: String,
  message: String,
  date: Date,
});

const Email = mongoose.model("Email", emailSchema, "emails");

module.exports = Email;
