const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const allRoutes = require("./routes/allRoutes");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./model/user");

const port = 3330;

app.use(express.urlencoded({ extended: true }));  // Parses application/x-www-form-urlencoded content
// serving the static files
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");


app.use(allRoutes);


mongoConnect((client) => {
  app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
  });
});
