const mongoose = require('mongoose');
//Create a Schema for a data
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

// Compile Schema to a model
const Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;