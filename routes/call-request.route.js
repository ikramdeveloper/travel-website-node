const express = require("express");
const router = express.Router();
const uniqId = require("uniqid");
const CallRequest = require("../models/call-request.model");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, async (req, resp) => {
  resp.send(await CallRequest.find());
});

router.post("/", async (req, resp) => {
  const data = req.body;
  const newRequest = new CallRequest({
    id: uniqId(),
    phone: data.phone,
    date: new Date(),
  });
  await newRequest.save().then(() => resp.send("created"));
});

router.delete("/:id", authMiddleware, async (req, resp) => {
  await CallRequest.deleteOne({ id: req.params.id });
  resp.send("deleted");
});

module.exports = router;
