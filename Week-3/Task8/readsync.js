// this script should read file in sync and doing other operations with other timing functions & promises.

const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, 'source.txt');

console.log("1. Start of script");


try {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log("Synchronous file content:\n", data);
} catch (err) {
    console.error("Error reading file:", err.message);
}


setTimeout(() => console.log("setTimeout executed after 1s"), 1000);

Promise.resolve().then(() => console.log("Promise resolved"));

console.log("2. End of script");
