const express = require("express");
const router = express.Router({ mergeParams: true });
const ExpressError = require("../utils/expresserror.js");
const { validReview } = require("../schema.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { validReviewSchema, isLoggedIn ,isReviewOwner} = require("../middleware.js");
const reviewController=require("../controller/review.js");

//post the reviews in db
router.post(
  "/",
  isLoggedIn,
  validReviewSchema,
  wrapAsync(reviewController.postReview)
);

//detele review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewOwner,
  wrapAsync(reviewController.destroyReview),
);

module.exports = router;
