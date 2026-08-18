const express = require("express");
const app = express();
const mongoose = require("mongoose");

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

app.get("/",(req,res) => {
    res.send("I am root");
});

app.listen(8080,() =>{
    console.log("Server is listening on port 8080");
});