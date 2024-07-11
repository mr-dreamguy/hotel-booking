const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {
  isLoggedIn,
  validateReview,
  validateAuthor,
} = require("../middlewares");
const controller = require("../controllers/reviews.js");

// Post Review Route
router.post("/", isLoggedIn, validateReview, wrapAsync(controller.postReview));

// Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  validateAuthor,
  wrapAsync(controller.destroyReview)
);

module.exports = router;
