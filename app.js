const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Blog = require('./models/blog');

// create an instance for express
const app = express();
const port = 3000;

// connect to mongodb
const dbURI = 'mongodb+srv://davidepelo:pelosone75@cluster0.ijrdt.mongodb.net/node-tuts?retryWrites=true&w=majority';

// mongoose connection
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((response) => {
        console.log('connected to mongodb');
        
        // listen for requests only
        // when connection to mongodb 
        // is established
        app.listen(port, () => {
            console.log('i\'m listening motherfucker');
        });
    })
    .catch((err) => {
        console.log(err);
    });


// register view engine
app.set('view engine', 'ejs');

// add body parser to manipulate
// form data as an object
app.use(express.json());
// encode all the request parameters in the url
// and parse them as objects
app.use(express.urlencoded({
  extended: true
}));


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
    res.redirect('/blogs');
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

app.get('/blogs', (req, res) => {
    Blog.find().sort({'createdAt': 1})
        .then(results => {
            res.render('index', {title: 'All your blogs', blogs: results})
        })
        .catch(err => {
            console.log(err);
        })
})

app.post('/blogs', (req, res) => {
    console.log(req.body);

    const blog = new Blog({
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body
    })

    blog.save()
        .then(results => {
            console.log('element saved');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })
})

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about', {title: '404'});
})

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'prova snippet 2',
//         body: 'prova body 2'
//     });

//     blog.save()
//     .then((saveDoc) => {
//         console.log(saveDoc);
//         res.send(saveDoc);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then(results => {
//             res.send(results);
//         })
//         .catch(err => {
//             console.log(err);
//         })
// })

// app.get('/one-blog', (req, res) => {
//     Blog.findById("60abb38bfc22a1bb919a178d")
//         .then((results) => {
//             res.send(results);
//         })
//         .catch(err => {
//             console.log(err);
//         })
// })

// use this function for every incoming request
// regardless of the url
// if nothing else matches of the previous url
// it's called middleware function
// we must specify the response status
// to say that is an http error
app.use((req, res) => {
    res.status(404).render('404');
})