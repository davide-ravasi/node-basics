const express = require('express');
// create an instance for express
const app = express();
const port = 3000;

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(port, () => {
    console.log('i\'m listening motherfucker');
});

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', {title: 'Home', blogs: blogs});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new blog'});
})

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about', {title: '404'});
})

// use this function for every incoming request
// regardless of the url
// if nothing else matches of the previous url
// it's called middleware function
// we must specify the response status
// to say that is an http error
app.use((req, res) => {
    res.status(404).render('404');
})