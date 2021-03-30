const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userControllers");

// Login Page

router.get("/login", usersController.login);

//  Register Page

router.get("/register", usersController.register);

module.exports = router;
