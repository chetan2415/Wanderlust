const Listing=require("../models/listing.js");

module.exports.index=async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.newRoute=(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showRoute=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    }).populate("owner");
    if(!listing){
        req.flash("error","The listing you are trying to access is not exist");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
};

module.exports.createRoute=async (req,res)=>{ 
    let filename=req.file.filename;
    let url=req.file.path;

    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;  
    newListing.image={filename,url};
    await newListing.save();

    req.flash("success","New listing is created successfully");
    res.redirect("/listings");
};

module.exports.editRoute=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
       req.flash("error","The listing you are trying to access is not exist");
       return res.redirect("/listings");
   }
   let originalImage=listing.image.url;
   originalImageUrl=originalImage.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
};

module.exports.updateRoute=async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});

    let filename=req.file.filename;
    let url=req.file.path;
    listing.image={filename,url};
    await listing.save();

    req.flash("success","listing updated successfully");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteRoute=async (req,res)=>{
    let {id}=req.params;
    let deleteListing=await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success","listing was deleted successfully");
    res.redirect("/listings");
};