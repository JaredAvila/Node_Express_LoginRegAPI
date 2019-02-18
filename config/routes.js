const users = require("../controllers/users");
const path = require("path");

module.exports = app => {
  //POST -- Register User
  app.post("/api/register", (req, res) => {
    users.registration(req, res);
  });

  //POST -- Login User
  app.post("/api/login", (req, res) => {
    users.login(req, res);
  });

  //REDIRECT TO ANGULAR IF NO OTHER ROUTES ARE HIT
  app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("../client/dist/client/index.html"));
  });
};
