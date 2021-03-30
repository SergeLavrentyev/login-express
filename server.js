require("dotenv").config();
const express = require("express");
const app = express();

const indexRouter = require("./routes/index.js");
const userRouter = require("./routes/users");

// template engine

app.set("view engin", "ejs");

// routes
app.use("/", indexRouter);
app.use("/users", userRouter);

// start app

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Serve at http://localhost:${PORT}`));
