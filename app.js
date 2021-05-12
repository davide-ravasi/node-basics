const express = require('express');
// create an instance for express
const app = express();
const port = 3000;

// listen for requests
app.listen(port, () => {
    console.log('i\'m listening motherfucker');
});

app.get('/', (req, res) => {
    res.sendFile( './views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname});
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
    res.status(404).sendFile('./views/404.html', { root: __dirname });
})