const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { redirectUrl } = require("../middlewares");
const controller = require("../controllers/users.js");

router
  .route("/signup")
  .get(controller.renderSignUpForm)
  .post(wrapAsync(controller.createUser));

router
  .route("/login")
  .get(controller.renderLoginForm)
  .post(
    redirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    controller.loginUser
  );

router.get("/logout", controller.logoutUser);

module.exports = router;
