const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
// No DB connection needed — mongoose computes the collection name from the model name immediately.
console.log("Model name      :", Listing.modelName);
console.log("Collection name :", Listing.collection.name);
console.log("DB from your URL: durghar  (mongodb://127.0.0.1:27017/durghar)");
process.exit(0);
