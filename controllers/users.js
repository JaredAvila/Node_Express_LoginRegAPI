const mongoose = require("mongoose"),
  bcrypt = require("bcryptjs"),
  User = mongoose.model("User");

module.exports = {
  // Registration Controller
  registration: (req, res) => {
    User.findOne({ userName: req.body.userName }, (err, user) => {
      if (user !== null) {
        res.json({
          message: "error",
          errors: { errors: { userName: "Username is already taken" } }
        });
      } else if (req.body.password === "") {
        res.json({
          message: "error",
          errors: { errors: { password: "Must enter a password" } }
        });
      } else if (req.body.password !== req.body.password2) {
        res.json({
          message: "error",
          errors: { errors: { password: "Passwords do not match" } }
        });
      } else {
        const hash = bcrypt.hashSync(req.body.password, 10);
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userName: req.body.userName,
          email: req.body.email,
          password: hash
        });
        newUser.save(err => {
          if (err) {
            res.json({ message: "error", errors: err });
          } else {
            res.json({ message: "success", user: newUser });
          }
        });
      }
    });
  },
  login: (req, res) => {
    User.findOne({ userName: req.body.userName }, (err, user) => {
      if (
        err ||
        user == null ||
        !bcrypt.compareSync(req.body.password, user.password)
      ) {
        res.json({
          message: "error",
          errors: { errors: { login: "Invalid login information" } }
        });
      } else {
        res.json({ message: "success", user });
      }
    });
  }
};
