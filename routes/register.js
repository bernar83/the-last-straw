const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body);
  req.login(req.body, () => {
    res.redirect("/profile");
  });
});

module.exports = router;
