// - Explore commonJS and ES6 modules.
// - Create file name `main.js` , `sum.js` and `multiply.js`
// - Implement function to sum of two numbers in `sum.js` file. Use that function in `main.js`  (Use commonJS module)
// - Create a file named `multiply.js`. Create a function to multiply two number and use it `main.js` (Using ES6 module)


// main.js
import sum from './sum.cjs';  //Import Commonjs with import.
import { multiply } from "./multiply.mjs"; // Import ES6 module

// We have set "type": "module" in package.json that's why require is not working in this file if you comment out that line and uncomment below line it will be working require().
//const sum = require('./sum.cjs'); //Import commonjs using require.

console.log("Sum:", sum(5, 3));           // Output: Sum: 8
console.log("Multiply:", multiply(5, 3)); // Output: Multiply: 15
