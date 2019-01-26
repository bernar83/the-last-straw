const express = require("express");
const router = express.Router();

const History = require("../models/Entry");

router.get("/", (req, res) => {
  History.find((err, history) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(history);
    }
  });
});

module.exports = router;
