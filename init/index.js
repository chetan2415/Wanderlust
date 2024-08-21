const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing= require("../models/listing.js");

main().then(()=>{
    console.log("working db");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Wanderlust1");
};

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj,owner:"66b73cd1384809220ae6d1ac"}));
    await Listing.insertMany(initData.data);
    console.log("data was init");
}
initDB();