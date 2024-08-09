const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const {
  isLoggedIn,
  validateListing,
  validateOwner,
} = require("../middlewares");
const controller = require("../controllers/listings.js");

router
  .route("/")
  .get(wrapAsync(controller.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(controller.createListing)
  );

// New Route
router.get("/new", isLoggedIn, controller.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(controller.showListing))
  .put(
    isLoggedIn,
    upload.single("listing[image]"),
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
