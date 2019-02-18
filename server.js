const express = require("express"),
  bodyparser = require("body-parser"),
  app = express(),
  port = 8000;

app.use(bodyparser.json());
app.use(express.static(__dirname + "../../client/dist/client"));

require("./models/User");
require("./config/routes")(app);

app.listen(port, () => console.log(`listening on port ${port}`));
