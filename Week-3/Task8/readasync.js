// this script should read file in async and doing other operations with other timing functions & promises.

const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, 'source.txt');

console.log("1. Start of script");

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err.message);
        return;
    }
    console.log("Asynchronous file content:\n", data);
});


setTimeout(() => console.log("setTimeout executed after 1s"), 1000);

Promise.resolve().then(() => console.log("Promise resolved"));

console.log("2. End of script");
