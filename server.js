const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {

    // to send back and write directly an html page
    // res.setHeader('Content-Type', 'text/html');
    // res.write('<h1>Hello you all</h1>');
    // res.end();
    let path = './views/';

    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about': 
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;    
        default:
            path += '404.html';
            res.statusCode = 404;       
            break;
    }

    fs.readFile(path, null, (err, data) => {
        if(err) {
            res.write('ooopppsss...error');
            res.end();
        } else {
            res.end(data);
        }
    });

});

server.listen(3000, 'localhost', () => {
    console.log('i\'m listening.....what do you want?');
})