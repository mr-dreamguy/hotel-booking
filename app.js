const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./routes/listings.js");
const reviews = require("./routes/review.js");

const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("__method"));

app.engine("ejs", ejsMate);

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

async function connect() {
  mongoose.connect("mongodb://localhost:27017/wanderlust");
}

connect()
  .then((res) => console.log("connection successful"))
  .catch((err) => console.log(err));

// Root
app.get("/", (req, res) => {
  res.send("Root");
});

app.all("*", (req, res) => {
  throw new ExpressError(404, "Page Not Found!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("error.ejs", { message });
  // res.status(status).send(message);
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
