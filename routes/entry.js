const express = require("express");
const router = express.Router();
const passport = require("passport");

const Entry = require("../models/Entry");
const validateEntryInput = require("../validation/entryValidation");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEntryInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { date, venue, amount } = req.body;

    const dateObj = new Date(date);

    const entry = new Entry({
      user: req.user._id,
      date: dateObj.toDateString(),
      venue: venue,
      amount: amount
    });

    entry
      .save()
      .then(entry => res.json(entry))
      .catch(err => console.log(err));
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Entry.find({ user: req.user._id }, (err, entries) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json(entries);
      }
    });
  }
);

router.delete(
  "/:entry_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Entry.findOneAndDelete({ _id: req.params.entry_id })
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
