const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = "Username must be between 2 and 30 characters.";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username can't be blank.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password can't be blank.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
