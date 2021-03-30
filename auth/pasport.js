const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "name" }, (email, password, done) => {
      // Match User
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "Such user is not registered",
            });
          }
          // Compare password
          bcrypt.compare(password, user.password, hash, (err, isMatched) => {
            if (err) throw err;
            if (isMatched) return done(null, user);
            else
              return done(null, false, {
                message: "Passwords don't match",
              });
          });
        })
        .catch((err) => console.log(err));
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
