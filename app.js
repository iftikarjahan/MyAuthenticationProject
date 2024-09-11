const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const allRoutes = require("./routes/allRoutes");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./model/user");
const MongodbStore=require("connect-mongodb-session")(session);  //this is a function that returns a constructor so that we can create a new object using it

const port = 3330;

app.use(express.urlencoded({ extended: true }));  // Parses application/x-www-form-urlencoded content
// serving the static files
app.use(express.static(path.join(__dirname, "public")));


const store=new MongodbStore({
  uri:"mongodb+srv://iftikarjahan22:vLGkuypRMw76H9TO@cluster0.ogyqd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  collection:"sessions"
})

// setting up the session middleware
app.use(session({
  secret: 'papa',            // A secret key to sign the session ID cookie
  resave: false,                    // Don't save session if unmodified
  saveUninitialized: false,         // Don't create a session until something is stored
  cookie: { secure: false },         // Set to true if using HTTPS
  store:store
}));

app.set("view engine", "ejs");
app.set("views", "views");



app.use(allRoutes);


mongoConnect((client) => {
  app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
  });
});
