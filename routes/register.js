const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  const newUser = new User({
    username: username,
    password: password
  });

  newUser.save();

  req.login(newUser, () => {
    res.json({ redirect: "/profile" });
  });
});

module.exports = router;
