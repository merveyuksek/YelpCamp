const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const campgrounds= [
    {name: 'Salmon Creek', image:'https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f3c370afefbdba_340.jpg'},
    {name: 'Granite Hill', image:'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
    {name: 'Mountain Goat\'s Rest', image:'https://farm4.staticflickr.com/3509/3918025429_b79f40468c.jpg'},
    {name: 'Salmon Creek', image:'https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f3c370afefbdba_340.jpg'},
    {name: 'Granite Hill', image:'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
    {name: 'Mountain Goat\'s Rest', image:'https://farm4.staticflickr.com/3509/3918025429_b79f40468c.jpg'},
];

app.get('/', (req,res) => res.render('landing'));

app.get('/campgrounds', (req,res) => {


    res.render('campgrounds', {campgrounds: campgrounds});
});

app.get('/campgrounds/new', (req,res) => res.render('new.ejs'));

app.post('/campgrounds', (req,res) => {
    // get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = {name:name, image:image};
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect('/campgrounds');
});

app.listen(3000, () => console.log('The YelpCamp Server Has Started'));

