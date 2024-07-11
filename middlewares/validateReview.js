const ExpressError = require("../utils/ExpressError.js");
const reviewSchema = require("../models/reviewJoi.js");

module.exports = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};
