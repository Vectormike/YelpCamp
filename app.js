const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const bootstrap = require('bootstrap');
const Campground = require('./models/campground');
//Connect Mongoose to DB
mongoose.connect("mongodb://localhost/camp_app", { useNewUrlParser: true });

// View engine setup
app.set("view engine", "ejs");
app.use(express.static('public'));
// Support json encoded bodies
// app.use(bodyParser.json());
// Support encoded bodies
app.use(bodyParser.urlencoded({extended: true}));


//Create a Schema for a data
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});


// Campground.create({
//     name: "Abuja",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmzqM3npo6EGztFfa0cM4OskBcZJdRphYq_oW7hD2I71-yPGLGSA"
// }),function(err, newly){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(newly);
//     }
// }

// Route for homepage
app.get("/", function(req, res){
    res.render("home");
});
// Route for camps page
app.get("/camps", function(req, res){
    //Find data in the DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("camps", {campgrounds:allCampgrounds});
        }
    });
    
});
// Route for adding friends page
app.get("/camps/add", function(req, res){
    res.render("add");
});
// Route for adding (post request)
app.post("/camps", function(req, res){
    // get data from the form
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;

    const newCampground = {name:name, image:image, description:desc};
    
    // redirect the data to the campgrounds
    Campground.create(newCampground, function(err, newly){
        if(err){
            console.log(err);
        } else {
            res.redirect("camps");
        }
    })
});

// Route for more info about a particular campground
app.get("/camps/:id", function(req, res){
    //find the campround with the particular params
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            //render template with particular campground
            res.render("info", {campground:foundCampground});

        }
    }); 
});

// // Route for deleting all camps
// app.delete("/camps/:id/delete", function(req, res){
// //Find Id and remove
// Campground.findOneAndDelete(req.params.id, (err, deleted) => {
//         if(err) {
//             res.render('camps');
//         } else {
//             res.render('camps');
//         }
//     });
// });

app.get("*", function(req, res){
    res.send("Error page");
});

app.listen(3000, function(){
    console.log("YelpCamp is running!");
});