const User=require("../models/user.js");

module.exports.signupDefaultPage=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup=async(req,res)=>{
    try{
    console.log('Request body:', req.body);   
    let{username,email,password}=req.body;
    if (!username) {
        req.flash("error", "Username is required");
        return res.redirect("/signup");
    }
    if (!email) {
        req.flash("error", "Email is required");
        return res.redirect("/signup");
    }
    if (!password) {
        req.flash("error", "Password is required");
        return res.redirect("/signup");
    }
    const newUser = new User({ username, email });
    const registeredUser =await User.register(newUser, password); // Ensure this method exists and works
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        };
        req.flash("success", "Account created successfully");
        res.redirect("/listings");
    })
      } catch(e){
        console.error("Error during signup:", e);
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.loginDefaultPage=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome to Wanderlust you login successfully");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","user logged out successfully");
        res.redirect("/listings");
    });
};