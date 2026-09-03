const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override")
const mongo_url = "mongodb://127.0.0.1:27017/durghar";
main()
    .then(() => {
        console.log("Connected to db");
    })
    .catch((error) => {
        console.log(error);
    });

async function main(){
    await mongoose.connect(mongo_url);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.get("/",(req,res) => {
    res.send("I am root");
});
// index route
app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

app.get("/listings/new" ,(req,res)=>{
    res.render("listings/new.ejs")
})

app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

app.post("/listings",async(req,res)=>{
    // let{title,decription,image,price,location,country} = req.body;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})

app.put("/listings/:id" ,async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});


app.delete("/listings/:id" ,async (req,res)=>{
    let {id} = req.params;
    let Deleted = await Listing.findByIdAndDelete(id);
    console.log(Deleted);
    res.redirect("/listings");
})

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