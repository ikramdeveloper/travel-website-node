const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const auth = require("../controllers/auth");

router.post("/login", async (req, resp) => {
  const email = req.body.email;
  const password = req.body.password;

  const users = await User.find().where({ email });
  if (users.length) {
    const result = await bcrypt.compare(password, users[0].password);
    if (result) {
      const token = auth.generateWebToken(users[0]);
      resp.cookie("auth_token", token);
      resp.send({
        redirectUrl: "admin",
        message: "Success",
      });
    } else {
      resp.send({
        message: "rejected",
      });
    }
  } else {
    resp.send({
      message: "rejected",
    });
  }
});

router.post("/register", async (req, resp) => {
  const email = req.body.email;
  const password = req.body.password;

  const users = await User.find().where({ email });
  if (!users.length) {
    const encryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      password: encryptedPassword,
    });
    await newUser.save().then(() => resp.send({ message: "registered" }));
  } else {
    resp.send({ message: "rejected" });
  }
});

module.exports = router;
