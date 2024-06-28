const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require('method-override');

const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('__method'));

async function connect() {
    mongoose.connect('mongodb://localhost:27017/wanderlust');
};

connect()
.then(res => console.log('connection successful'))
.catch(err => console.log(err));

// Root
app.get('/', (req, res) => {
    res.send('Root');
});

// Index Route
app.get('/listings', async (req, res) => {
    let allListings = await Listing.find();
    res.render('./listings/index.ejs', { allListings });
});

// New Route
app.get('/listings/new', (req, res) => {
    res.render('./listings/new.ejs');
});

// Create Route
app.post('/listings', async (req, res) => {
    let ls = new Listing(req.body);
    await ls.save();
    res.redirect('/listings');
});

// Show Route
app.get('/listings/:id', async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id); 
    res.render('./listings/show.ejs', { listing });
});

// Edit Route
app.get('/listings/:id/edit', async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render('./listings/edit.ejs', { listing });
});

// Update Route
app.put('/listings/:id', async (req, res) => {
    let { id } = req.params;
    console.log(req.body);
    await Listing.findByIdAndUpdate(id, { ...req.body });
    res.redirect('/listings');
});

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});