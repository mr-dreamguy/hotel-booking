module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to do this operation");
    return res.redirect("/login");
  }
  next();
};
