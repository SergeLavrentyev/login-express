require("dotenv").config();

module.exports = {
  DB: process.env.MONGO_DB_URI,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET
}