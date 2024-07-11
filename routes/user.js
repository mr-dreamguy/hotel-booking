const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const redirectUrl = require("../middleware/redirectUrl.js");

router.get("/signup", (req, res) => {
  res.render("./users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const regisetedUser = await User.register(newUser, password);
      req.login(regisetedUser, (err) => {
        if (err) next(err);
        req.flash("success", "User Registration Successful!");
        res.redirect("listings");
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("./users/login.ejs");
});

router.post(
  "/login",
  redirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome to Wanderlust, Loggin Succefull");
    let url = res.locals.redirectUrl || "/listings";
    res.redirect(url);
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "You are logged out");
    res.redirect("/listings");
  });
});

module.exports = router;
