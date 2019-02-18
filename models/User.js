const userValidator = require("mongoose-validator"),
  mongoose = require("mongoose");

require("../config/mongoose");

const nameValidator = [
  userValidator({
    validator: "matches",
    arguments: /^[a-zA-Z\-]+$/i,
    message: "Please only use alphanumeric characters"
  })
];

const emailValidator = [
  userValidator({
    validator: email => {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    message: "Not a valid email address"
  })
];

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [2, "First name is too short"],
      validate: nameValidator
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [2, "Last name is too short"],
      validate: nameValidator
    },
    userName: {
      type: String,
      required: [true, "Please select a Username"],
      minlength: [2, "Username is too short"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: emailValidator
    },
    password: {
      type: String,
      required: [true, "A password is required"],
      minlength: [6, "Password must be at least six characters"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
