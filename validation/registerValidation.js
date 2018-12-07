const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirmation = !isEmpty(data.passwordConfirmation)
    ? data.passwordConfirmation
    : "";

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = "Username must be between 2 and 30 characters.";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username can't be blank.";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters.";
  }

  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = "Password confirmation can't be blank.";
  }

  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "Passwords must match.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
