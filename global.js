// console.log(global);

global.setTimeout(function() {
    console.log('yeah');
}, 1000);


// like window in the browser
// in node you don't have to specify the global object
setTimeout(function() {
    console.log('yeah2');
}, 2000);

// absolute path of the folder of the file
console.log(__dirname);

// absolute path of the file
console.log(__filename);