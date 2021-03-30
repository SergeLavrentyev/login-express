require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const indexRouter = require("./routes/index.js");
const userRouter = require("./routes/users");

// DB connection

const MONGO_DB_URI = process.env.MONGO_DB_URI;

mongoose
  .connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo db connected"))
  .catch((err) => console.log(err));

// template engine
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares

app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", indexRouter);
app.use("/users", userRouter);

// start app

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Serve at http://localhost:${PORT}`));
