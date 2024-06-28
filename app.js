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

app.get('/', (req, res) => {
    res.send('Root');
});

app.get('/listings', async (req, res) => {
    let allListings = await Listing.find();
    res.render('./listings/index.ejs', { allListings });
});

app.get('/listings/new', (req, res) => {
    res.render('./listings/new.ejs');
});

app.get('/listings/:id', async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id); 
    res.render('./listings/show.ejs', { listing });
});

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});