const ExpressError = require("../utils/ExpressError.js");
const listingSchema = require("../models/listingJoi.js");

module.exports = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};
