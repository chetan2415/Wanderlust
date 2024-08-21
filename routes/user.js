const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userControllers=require("../controllers/users.js");

///user signup defaultPage
router.get("/signup",userControllers.signupDefaultPage);


///user signup
router.post("/signup",wrapAsync(userControllers.signup));


///user login defaultPage
router.get("/login",userControllers.loginDefaultPage);


///user login
router.post("/login",saveRedirectUrl,
    passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
}),userControllers.login);
 
///user logout
router.get("/logout",userControllers.logout);


module.exports=router;