const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  let allListings = await Listing.find();
  res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.createListing = async (req, res) => {
  let ls = new Listing(req.body);
  let url = req.file.path;
  let filename = req.file.filename;
  ls.owner = req.user._id;
  ls.image = { filename, url };
  await ls.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
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
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Requested listing does not exist!");
    res.redirect("/listings");
    return;
  }

  let originalUrl = listing.image.url;
  originalUrl.replace("/upload", "/upload/w_250");
  res.render("./listings/edit.ejs", { listing, originalUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let ls = await Listing.findByIdAndUpdate(id, { ...req.body });

  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;
    ls.image = { filename, url };
    await ls.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
