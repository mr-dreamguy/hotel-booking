const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : String,
    descrtiption : String,
    image : {
        type : String,
        default : 'https://images.unsplash.com/photo-1719403278702-f1c375a2f55e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        set : (v) => v.url,
    },
    price : Number,
    location : String,
    country : String
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;