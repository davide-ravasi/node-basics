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
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/blogs/create', (req, res) => {
    res.render('create');
})

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
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