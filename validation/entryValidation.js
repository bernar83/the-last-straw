const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEntryInput(data) {
  let errors = {};

  data.date = !isEmpty(data.date) ? data.date : "";
  data.venue = !isEmpty(data.venue) ? data.venue : "";
  data.amount = !isEmpty(data.amount) ? data.amount : "";

  if (Validator.isEmpty(data.date)) {
    errors.date = "Date can't be blank.";
  }

  if (Validator.isEmpty(data.venue)) {
    errors.venue = "Venue can't be blank.";
  }

  if (Validator.isEmpty(data.amount)) {
    errors.amount = "Amount can't be blank.";
  }

  if (Validator.isAlpha(data.amount)) {
    errors.amount = "Amount should be a number";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
