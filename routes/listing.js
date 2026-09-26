const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const asyncWrap = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expresserror.js");
const { validSchema } = require("../schema.js");
const passport = require("passport");
const { isLoggedIn, isOwner, validListing } = require("../middleware.js");
const listingcontroller = require("../controller/listing.js");
const {storage}=require("../cloudConfig.js")
const multer = require("multer");
const upload = multer({storage });

//index route and the post the newform
router
  .route("/")
  .get(listingcontroller.index)
  .post(isLoggedIn, validListing, upload.single('listing[image][url]'), asyncWrap(listingcontroller.postform));


//new route
router.get("/new", isLoggedIn, asyncWrap(listingcontroller.newform));

//update route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  asyncWrap(listingcontroller.updatelisting),
);

//update and delete and show route;
router
  .route("/:id")
  .put(isOwner, upload.single('listing[image][url]'),validListing, asyncWrap(listingcontroller.updatedPostForm))
  .delete(isLoggedIn, isOwner, asyncWrap(listingcontroller.destroyRoute))
  .get(asyncWrap(listingcontroller.showListing));

  
module.exports = router;
