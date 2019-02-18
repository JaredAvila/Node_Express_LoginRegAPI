const users = require("../controllers/users");
const path = require("path");

module.exports = app => {
  //REDIRECT TO ANGULAR IF NO OTHER ROUTES ARE HIT
  //   app.all("*", (req, res, next) => {
  //     res.sendFile(path.resolve("./testApp/dist/testApp/index.html"));
  //   });
};
