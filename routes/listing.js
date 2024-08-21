const express = require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const multer  = require('multer');
const{storage}=require("../cloudConfig.js");
const upload = multer({ storage });

const listingControllers=require("../controllers/listings.js");

//index route
router.get("/", wrapAsync(listingControllers.index));

///new route
router.get("/new",isLoggedIn,listingControllers.newRoute);


///show route
router.get("/:id",isLoggedIn,
    wrapAsync(listingControllers.showRoute));

///create route
router.post("/",isLoggedIn,
    upload.single("listing[image]"),
    wrapAsync(listingControllers.createRoute));

///edit route
router.get("/:id/edit",isLoggedIn,isOwner,
    validateListing,wrapAsync(listingControllers.editRoute));

////update route
router.put("/:id",isLoggedIn,isOwner,upload.single("listing[image]"),
    wrapAsync(listingControllers.updateRoute));

///delete route
router.delete("/:id",isLoggedIn,isOwner,
    validateListing,wrapAsync(listingControllers.deleteRoute));

module.exports=router;