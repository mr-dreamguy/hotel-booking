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
    data.map((obj) => ({ ...obj, owner: "66a1006d69c23ca6201565e7" }))
  );
  console.log("db was initialised");
}

initdb();
