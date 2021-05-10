const fs = require('fs');

const readStream = fs.createReadStream('./docs/docs2.txt');
const writeStream = fs.createWriteStream('./docs/docs3.txt');

readStream.setEncoding('utf8');

readStream.on('data', (chunk) => {
    console.log('------------new chunk');
    console.log(chunk);

    writeStream.write('---------copied chunk :) --------------------------');
    writeStream.write(chunk);
})

