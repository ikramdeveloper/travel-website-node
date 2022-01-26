const express = require("express");
const router = express.Router();
const uniqId = require("uniqid");
const Email = require("../models/email.model");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, async (req, resp) => {
  resp.send(await Email.find());
});

router.post("/", async (req, resp) => {
  const data = req.body;
  const newEmail = new Email({
    id: uniqId(),
    name: data.name,
    email: data.email,
    message: data.message,
    date: new Date(),
  });
  await newEmail.save().then(() => resp.send("created"));
});

router.delete("/:id", authMiddleware, async (req, resp) => {
  await Email.deleteOne({ id: req.params.id });
  resp.send("Deleted");
});

module.exports = router;
