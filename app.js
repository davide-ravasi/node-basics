const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log('i\'m listening motherfucker');
});

app.get('/', (req, res) => {
    res.sendFile( './views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname});
})

app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

// use this function for every incoming request
// regardless of the url
// if nothing else matches of the previous url
app.use((req, res) => {
    res.sendFile('./views/404.html', { root: __dirname });
})