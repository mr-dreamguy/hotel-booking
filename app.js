const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./routes/listings.js");
const reviews = require("./routes/review.js");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();
const port = 8080;
const sessionConfig = {
  secret: "mysecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("__method"));
app.use(session(sessionConfig));
app.use(flash());

app.engine("ejs", ejsMate);

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

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
