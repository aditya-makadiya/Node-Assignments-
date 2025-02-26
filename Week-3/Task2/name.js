// - Create script named `name.js` that prints passed arguments in node command. e.g ``node name.js {Pass your name here}`` that should print your name.



const args = process.argv; // Process.argv used to convert arguments into array.

// console.log(`${args[0]}`);
// console.log(`${args[1]}`);
// console.log(`${args[2]}`);

console.log(`Hello, ${args[0]}!`);