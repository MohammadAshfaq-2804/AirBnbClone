const Listing=require("./models/listing");
const Review=require("./models/review");
const { validReview,validSchema } = require("./schema.js");
const ExpressError = require("./utils/expresserror.js");

//User loged in or not
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Login to access");
    return res.redirect("/login");
  }
  next();
};

//save the original url to local
module.exports.saveredirecturl=(req,res,next)=>
{
       if(req.session.redirectUrl)
       {
              res.locals.redirectUrl=req.session.redirectUrl;
       }
       next();
};

//check the owner
module.exports.isOwner= async (req,res,next)=>
{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.curruser._id))
    {
        req.flash("error","You are not the owner of this listing");
         return res.redirect(`/listing/${id}`);
    }
    next();
}


//validation of the schema
module.exports.validListing = (req, res, next) => {
  let result = validSchema.validate(req.body);
  console.log(result);
  if (result.error) {
    throw new ExpressError(400, result.error);
  } else {
    next();
  }
};

//validation for review schema
module.exports.validReviewSchema=(req,res,next)=>
{
  let result=validReview.validate(req.body);
  if(result.error)
  {
    throw new ExpressError(400,result.error);
  }else
  {
    next();
  }
}

//check the review owner
module.exports.isReviewOwner= async (req,res,next)=>
{
    let { id,reviewId  } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.curruser._id))
    {
        req.flash("error","You are not the author of this Review");
         return res.redirect(`/listing/${id}`);
    }
    next();
}





