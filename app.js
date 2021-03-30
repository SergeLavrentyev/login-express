require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

const indexRouter = require("./routes/index.js");
const userRouter = require("./routes/users");

// template engine
app.set("views", path.resolve(__dirname, "views"));
app.set('view engine', 'ejs');

// routes
app.use("/", indexRouter);
app.use("/users", userRouter);

// start app

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Serve at http://localhost:${PORT}`));
