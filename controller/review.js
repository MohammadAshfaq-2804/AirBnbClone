const Listing=require("../models/listing");
const Review=require("../models/review");

//post Review in Database
module.exports.postReview=async (req, res, next) => {
    let listing = await Listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
    newreview.author=req.user._id;

    listing.reviews.push(newreview);

    await newreview.save();
    await listing.save();
    req.flash("success", "New Review created successfully!");

    res.redirect(`/listing/${listing._id}`);
  }

module.exports.destroyReview=async (req, res, next) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listing/${id}`);
  }