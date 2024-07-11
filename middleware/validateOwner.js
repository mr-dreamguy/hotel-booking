const Listing = require("../models/listing.js");

module.exports = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  if (!res.locals.user || !listing.owner._id.equals(res.locals.user._id)) {
    req.flash("error", "You're not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }

  next();
};
