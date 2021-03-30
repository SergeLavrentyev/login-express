require("dotenv").config();
const express = require("express");
const server = express();

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Serve at http://localhost:${PORT}`));
