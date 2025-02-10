//Create a program that declares variables with different data types: a number (age), a string (name), and a boolean (isStudent). Perform operations like concatenating the name with a greeting, converting the age to a string, and combining the boolean value with a string to form a sentence. Print the results.

let age = 21;
let name = "Aditya";
let isStudent = true;

// 1. Concatenate the name with a greeting
let greeting = "Hello, " + name;
console.log(greeting);
console.log("type of greetings ", typeof(greeting));


// 2. Convert the age to a string
let ageString = age.toString();
console.log("Age as a string: " + ageString);
console.log("type of ageString ", typeof(ageString));

// 3. Combine the boolean value with a string to form a sentence
let studentStatus = "Is student: " + isStudent;
console.log(studentStatus);
console.log("type of studentStatus ", typeof(studentStatus));