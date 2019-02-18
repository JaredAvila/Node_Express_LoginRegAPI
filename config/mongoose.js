const mongoose = require("mongoose");
module.exports = mongoose.connect("mongodb://localhost/boilerPlate_LoginReg", {
  useNewUrlParser: true
});
