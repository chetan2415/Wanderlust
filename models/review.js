const mongoose=require("mongoose");
const Schema= mongoose.Schema;

const ReviewSchema=new Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
    },
   comment:{
    type:String,
   },
    create_At:{
        type:Date,
        default:Date.now(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', // References the User model
        required: true,
    },
});

const Review=mongoose.model("Review",ReviewSchema);

module.exports=Review;