const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const{ ValidateReview,isLoggedIn, isReviewAuthor }=require("../middleware.js")

const reviewControllers=require("../controllers/reviews.js");

///review
//models listing
///post route
router.post("/",isLoggedIn,wrapAsync(reviewControllers.reviewRoute));
 
 ///delete review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,
     wrapAsync(reviewControllers.deleteReview));

 module.exports=router;