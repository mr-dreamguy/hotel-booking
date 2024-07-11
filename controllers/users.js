const User = require("../models/user.js");

module.exports.renderSignUpForm = (req, res) => {
  res.render("./users/signup.ejs");
};

module.exports.createUser = async (req, res) => {
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
};

module.exports.renderLoginForm = (req, res) => {
  res.render("./users/login.ejs");
};

module.exports.loginUser = async (req, res) => {
  req.flash("success", "Welcome to Wanderlust, Loggin Succefull");
  let url = res.locals.redirectUrl || "/listings";
  res.redirect(url);
};

module.exports.logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "You are logged out");
    res.redirect("/listings");
  });
};
