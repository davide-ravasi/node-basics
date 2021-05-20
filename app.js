const express = require('express');
const morgan = require('morgan');
// create an instance for express
const app = express();
const port = 3000;

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(port, () => {
    console.log('i\'m listening motherfucker');
});


// added morgan logger as middleware
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  }));

// middleware to add folder for static files
app.use(express.static('public')); 

// called middleware
// it executes due to position and if we don't
// have a reponse before
// as params we have req, res, next
// next tells to we to go on with the
// next functions prensents in the code
// app.use((req,res,next) => {
//     console.log(req.path);
//     console.log(req.method);
//     console.log(req.hostname);
//     next();
// });

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', {title: 'Home', blogs: blogs});
});

// app.use((req,res,next) => {
//     console.log('just another middleware');
//     next();
// });

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