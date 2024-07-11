const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const isLoggedIn = require("../middleware/isLoggedIn.js");
const validateListing = require("../middleware/validateListing.js");
const validateOwner = require("../middleware/validateOwner.js");

// Index Route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    let allListings = await Listing.find();
    res.render("./listings/index.ejs", { allListings });
  })
);

// New Route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("./listings/new.ejs");
});

// Create Route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    let ls = new Listing(req.body);
    ls.owner = req.user._id;
    await ls.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  })
);

// Show Route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");
    if (!listing) {
      req.flash("error", "Requested listing does not exist!");
      return res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listing });
  })
);

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  validateOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Requested listing does not exist!");
      res.redirect("/listings");
      return;
    }
    res.render("./listings/edit.ejs", { listing });
  })
);

// Update Route
router.put(
  "/:id",
  isLoggedIn,
  validateOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  })
);

// Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  validateOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  })
);

module.exports = router;
