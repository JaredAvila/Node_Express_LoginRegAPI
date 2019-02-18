const mongoose = require("mongoose"),
  bcrypt = require("bcryptjs"),
  User = mongoose.model("User");

module.exports = {
  // Registration Controller
  registration: (req, res) => {
    console.log(req.body);
    if (req.body.password !== req.body.password2) {
      res.json({ message: "error", error: "Passwords do not match" });
    } else {
      if (req.body.password === undefined) {
        res.json({ message: "error", error: "Password cannot be left blank" });
      }
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
  }
};
