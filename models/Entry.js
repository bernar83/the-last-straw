const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

module.exports = Entry = mongoose.model("entry", EntrySchema);
