//Write a JavaScript program with comments explaining the differences between let, var, and const in terms of variable declaration. Include examples that showcase the scope of each type of variable and any restrictions they might have.


// 1. var - Function-scoped, can be re-declared and updated
function varExample() {
    var x = 3;
    if (true) {
        var x = 15; // Re-declares x
        console.log("VAR Inside block:", x); // Output: 15
    }
    console.log("VAR Outside block:", x); // Output: 15 (var does not have block scope)
}
varExample();

// 2. let - Block-scoped, can be updated but not re-declared in the same scope
function letExample() {
    let y = 8;
    if (true) {
        let y = 14; // Creates a new y in the block scope
        console.log("LET Inside block:", y); // Output: 14
    }
    console.log("LET Outside block:", y); // Output: 8 (let has block scope)
}
letExample();

// 3. const - Block-scoped, cannot be re-assigned after declaration
function constExample() {
    const z = 6;
    console.log("CONST Initial value:", z); //Output: 6
    // z = 20; // this line will throw an error because re-assignment is not allowed
    
    if (true) {
        const z = 12; // This is allowed as it's a different scope
        console.log("CONST Inside block:", z); // Output: 12
    }
    console.log("CONST Outside block:", z); // Output: 6
}
constExample();

// Key Differences:
// - var is function-scoped and can be re-declared.
// - let is block-scoped and can be updated but not re-declared in the same scope.
// - const is block-scoped and cannot be re-assigned after declaration.
