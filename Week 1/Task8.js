//Create a document outlining best practices for variable declaration in modern JavaScript. Include guidelines on when to use let, var, or const, taking into consideration block scoping, hoisting, and the immutability of constants. Provide code examples to illustrate each best practice.

//1. Const variable:

//Use const for variables that should not be reassigned. This is useful for immutable values like
//numbers, strings, and objects. It also helps to prevent accidental reassignment.
//Objects declared with const can have their properties modified, but the variable cannot be reassigned.
const PI = 3.14;
const name = "Aditya";
const user = { name: "Aditya", age: 21 };


//2. Let variable:
//Use let when you need to reassign a variable but want to keep block scoping. This is useful for variables that are used in loops, conditional statements, or functions where their value may change.
let x = 10;
for(let i=0; i<10; i++){
  //statements
}


//3. Var variable:
//Avoid it in modern JavaScript, Var has function scope, which can lead to unexpected behavior and bugs.
var z = 30;