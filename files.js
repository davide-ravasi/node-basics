const fs = require('fs');

// reading files
// the call is asynchronous
// whene is finished it call the callback
fs.readFile('./docs/doc.txt', (err, data) => {
    if(err) {
        console.log(err);
    }

    console.log(data.toString());
});

// writing files
fs.writeFile('./docs/doc.txt', 'Hello Davide', (err) => {
    if(err) {
        console.log(err);
    }

    console.log('file succesfully written');
})

// create file
fs.appendFile('docs/docs3.txt','Hello mercoledì! ', (err) => {
    if(err) {
        console.log(err);
    }
})

// deleting files
fs.unlink('docs/docs3.txt', (err) => {
    if(err) console.log(err);
})

// create directories
fs.mkdir('./experiment', (err) => {
    if(err) console.log(err);
})

// remove directories
fs.rmdir('./experiment', (err) => {
    if(err) console.log(err);
})

console.log('last line');

// https://www.w3schools.com/nodejs/nodejs_filesystem.asp
