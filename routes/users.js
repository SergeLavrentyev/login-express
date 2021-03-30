const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const usersController = require("../controllers/userControllers");
const User = require("../models/User");

// Login Page

router.get("/login", usersController.login);

//  Register Page

router.get("/register", usersController.register);

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  // Validation

  // Check required fields
  const errors = [];
  if (!name || !email || !password || !password2)
    errors.push({ msg: "Fill in all fields please" });

  // Check passwords match
  if (password !== password2) errors.push({ msg: "Passwords don't match" });

  // Check passwords length

  if (password.length < 6)
    errors.push({ msg: "Your passwords must be at least 6 characters long" });

  if (errors.length > 0)
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  else {
    // Check if user exists
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "User already exists" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        // Hash password
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(res.redirect("/users/login"))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

module.exports = router;
