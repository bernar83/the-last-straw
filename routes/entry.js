const express = require("express");
const router = express.Router();

const Entry = require("../models/Entry");
const validateEntryInput = require("../validation/entryValidation");

router.post("/", (req, res) => {
  const { errors, isValid } = validateEntryInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { date, venue, amount } = req.body;

  const entry = new Entry({
    date: new Date(date),
    venue: venue,
    amount: amount
  });

  entry
    .save()
    .then(entry => res.json(entry))
    .catch(err => console.log(err));
});

module.exports = router;
