const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const callRequestSchema = new Schema({
  id: String,
  phone: Number,
  date: Date,
});

const CallRequest = mongoose.model(
  "CallRequest",
  callRequestSchema,
  "call-requests"
);

module.exports = CallRequest;
