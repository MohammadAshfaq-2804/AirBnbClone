const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAP_TOKEN });

//index
module.exports.index = async (req, res) => {
  const allistings = await Listing.find({});
  res.render("listings/index.ejs", { allistings });
};

//new form Rendering
module.exports.newform = async (req, res) => {
  res.render("listings/new.ejs");
};

//post the new form
module.exports.postform = async (req, res, next) => {

   let geocoding=await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1,
  }).send();

  let url = req.file.path;
  let filename = req.file.filename;
  const newlist = new Listing(req.body.listing);
  newlist.owner = req.user._id;
  newlist.image = { filename, url };
  newlist.geometry=geocoding.body.features[0].geometry
  let list=await newlist.save();
  req.flash("success", "New Listing created successfully!");
  res.redirect("/listing");
};

//update the listing
module.exports.updatelisting = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Cannot find the listing");
    return res.redirect("/listing");
  }
  let originalurl = listing.image.url;
  originalurl = originalurl
    .replace("/upload", "/upload/c_fill,w_300,h_100")
    .replace("w=800", "w=300")
    .replace("fit=crop", "fit=crop&h=100");

  res.render("listings/edit.ejs", { listing, originalurl });
};

//post the listing after the update
module.exports.updatedPostForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    ((listing.image = { url, filename }), await listing.save());
  }

  req.flash("success", "Listing updated successfully!");
  res.redirect("/listing");
};

//delte the listing
module.exports.destroyRoute = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted successfully!");
  res.redirect("/listing");
};

//show the listing
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const list = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!list) {
    req.flash("error", "Cannot find the listing");
    return res.redirect("/listing");
  }
  res.render("listings/show.ejs", { list });
};
