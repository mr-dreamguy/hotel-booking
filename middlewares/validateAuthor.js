const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId).populate("author");

  if (!res.locals.user || !review.author._id.equals(res.locals.user._id)) {
    req.flash("error", "You're not the owner of this Review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
