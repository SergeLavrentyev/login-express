const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const path = require("path");
const auth = require("./auth/pasport");
const { connect } = require("mongoose");
const { DB, PORT, SECRET } = require("./config");

const indexRoute = require("./routes/index.js");
const userRoute = require("./routes/users");
const userAdminRoute = require("./routes/userAdmin");

// auth

auth(passport);

// DB connection

connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo db connected"))
  .catch((err) => console.log(err));

// template engine
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
app.use("/", indexRoute);
app.use("/users", userRoute);
app.use("/useradmin", userAdminRoute);

// start app

app.listen(PORT, () => console.log(`Serve at http://localhost:${PORT}`));
