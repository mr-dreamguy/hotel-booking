const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const { data } = require("./data.js");

async function connect() {
  mongoose.connect("mongodb://localhost:27017/wanderlust");
}

connect()
  .then((res) => console.log("connected to db"))
  .catch((err) => console.log(err));

async function initdb() {
  await Listing.deleteMany({});
  await Listing.insertMany(
    data.map((obj) => ({ ...obj, owner: "668f8149d958c82b8a8ee62c" }))
  );
  console.log("db was initialised");
}

initdb();
