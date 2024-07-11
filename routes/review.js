const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const isLoggedIn = require("../middleware/isLoggedIn.js");
const validateReview = require("../middleware/validateReview.js");
const validateAuthor = require("../middleware/validateAuthor.js");

// Post Review Route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let review = new Review(req.body.review);
    review.author = res.locals.user;
    listing.reviews.push(review);
    await review.save();
    await listing.save();

    req.flash("success", "New review created!");
    res.redirect(`/listings/${req.params.id}`);
  })
);

// Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  validateAuthor,
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findById(reviewId);

    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
