const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {
  isLoggedIn,
  validateListing,
  validateOwner,
} = require("../middlewares");
const controller = require("../controllers/listings.js");

router
  .route("/")
  .get(wrapAsync(controller.index))
  .post(isLoggedIn, validateListing, wrapAsync(controller.createListing));

// New Route
router.get("/new", isLoggedIn, controller.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(controller.showListing))
  .put(
    isLoggedIn,
    validateOwner,
    validateListing,
    wrapAsync(controller.updateListing)
  )
  .delete(isLoggedIn, validateOwner, wrapAsync(controller.destroyListing));

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  validateOwner,
  wrapAsync(controller.editListing)
);

module.exports = router;
