const express        = require('express'),
      app            = express(),
      bodyParser     = require('body-parser'),
      mongoose       = require('mongoose'),
      Campground     = require('./models/campground')  ;

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');



/*Campground.create({
    name: 'Granite Hill',
    image:'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg',
    description: 'This is a huge granite hill, no bathrooms, no water.'
}, (err, campground) => {
    if(err) {
        console.log(err);
    } else {
        console.log('NEWLY CREATED CAMPGROUND');
        console.log(campground);
    }
});*/

const campgrounds= [
    {name: 'Salmon Creek', image:'https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f3c370afefbdba_340.jpg'},
    {name: 'Granite Hill', image:'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
    {name: 'Mountain Goat\'s Rest', image:'https://farm4.staticflickr.com/3509/3918025429_b79f40468c.jpg'},
    {name: 'Salmon Creek', image:'https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f3c370afefbdba_340.jpg'},
    {name: 'Granite Hill', image:'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
    {name: 'Mountain Goat\'s Rest', image:'https://farm4.staticflickr.com/3509/3918025429_b79f40468c.jpg'},
];

app.get('/', (req,res) => res.render('landing'));



//INDEX------------Show all campgrounds-------------
app.get('/campgrounds', (req,res) => {
   // res.render('campgrounds', {campgrounds: campgrounds});
    //Get all camprounds from DB:
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {campgrounds: allCampgrounds});
        }
    });
});



//CREATE------------Add new campground to DB-------------
app.post('/campgrounds', (req,res) => {
    // get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const newCampground = {name:name, image:image, description:desc};

    //create a new campground and save to database
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect('/campgrounds');
        }
    })
});



//NEW------------Show from to create new campgrounds-------------
app.get('/campgrounds/new', (req,res) => res.render('new.ejs'));



//SHOW-----------Shows more info about campground-------------
app.get('/campgrounds/:id', (req,res) => {
    //find the campground with provided id
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render('show', {campground: foundCampground});
        }
    });
});



app.listen(3000, () => console.log('The YelpCamp Server Has Started'));

