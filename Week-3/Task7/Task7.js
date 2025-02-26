// Create a script that takes 3 command line argumnets

// - First two arguments should be numeric values
// - Last argument should be the ‘operation’ like plus, minus, subtract etc.
// - Your script should execute successfully and handle all the edge cases here and should not exit intermittently**.**

const processArgs = process.argv.slice(2); 
//console.log(processArgs);


// Validate input length
if (processArgs.length !== 3) {
    console.error("Expected 3 arguments - number1, number2 and operation");
    process.exit(1);
}


const num1 = parseInt(processArgs[0]);
const num2 = parseInt(processArgs[1]);
const operation = processArgs[2];

// Validate numbers
if (isNaN(num1) || isNaN(num2)) {
    console.error("Error: First two arguments must be numeric values.");
    process.exit(1);
}

// Perform the requested operation
let result;
switch (operation) {
    case "plus":
        result = num1 + num2;
        break;
    case "minus":
        result = num1 - num2;
        break;
    case "multiply":
        result = num1 * num2;
        break;
    case "divide":
        if (num2 === 0) {
            console.error("Error: Division by zero is not allowed.");
            process.exit(1);
        }
        result = num1 / num2;
        break;
    default:
        console.error(`Error: Unsupported operation "${operation}". Use plus, minus, multiply, or divide.`);
        process.exit(1);
}

console.log(`Result: ${result}`);
