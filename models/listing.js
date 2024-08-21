const mongoose=require("mongoose");
const Schema= mongoose.Schema;
const Review=require("./review.js");
const { required } = require("joi");



const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required: true // This makes 'description' a required field
    },
    image:{
        filename:String,
        url:String, 
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review",
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",     // References the User model
        required: true,  // Ensures that every listing has an owner
    },
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
}});

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;
