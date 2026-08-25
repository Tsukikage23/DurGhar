const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path");
const mongo_url = "mongodb://127.0.0.1:27017/durghar";
main()
    .then(() => {
        console.log("Connected to db");
    })
    .catch(() => {
        console.log(error);
    });

async function main(){
    await mongoose.connect(mongo_url);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.get("/",(req,res) => {
    res.send("I am root");
});
// index route
app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});
// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title: "Me new home",
//         description: "by the beach",
//         price: 1200,
//         location: "kota,rajasthan",
//         country: "India",
//     })
//     await sampleListing.save();
//     console.log("sample saved");
//     res.send("successful testing");
// });
app.listen(8080,() =>{
    console.log("Server is listening on port 8080");
});