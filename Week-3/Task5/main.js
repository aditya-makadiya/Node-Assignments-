// Add two files in your project folder. source.txt and destination.txt  Read source file data using fs module and console it, also store in destination.txt.  Use path module to read and write file from your folder location.

const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'source.txt');
const destinationPath = path.join(__dirname, 'destination.txt');

// Create readable and writable streams
const readStream = fs.createReadStream(sourcePath, 'utf8');
const writeStream = fs.createWriteStream(destinationPath, 'utf8');

// Pipe data from source.txt to destination.txt
readStream.pipe(writeStream);

writeStream.on('finish', () => {
    console.log("Data has been successfully written to destination.txt");
});

writeStream.on('error', (err) => {
    console.error("Write Error:", err.message);
});