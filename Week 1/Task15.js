//Define an object called calculator with properties x and y. Add a method named calculate to the object, which takes an operation string ("add", "subtract", "multiply", "divide") and uses an arrow function to perform the corresponding operation on x and y. Inside the arrow function, use the "this" keyword to access the object properties. Test the calculator with different operations.


const calculator = {
  x: 27,
  y: 9,
  calculate: function(operation){
    switch (operation){
      case "add": return this.x + this.y;
      case "subtract": return this.x - this.y;
      case "multiply": return this.x * this.y;
      case "divide": return this.x / this.y;
    }
  },
  calculateWithArrow: (operation) => {
    switch (operation) {
      case "add": return this.x + this.y;
      case "subtract": return this.x - this.y;
      case "multiply": return this.x * this.y;
      case "divide": return this.x / this.y;
    }
  }
}

console.log("== By Using Simple Function =="); //Log all the result of simple calculator function.

console.log("Afetr Addition: ", calculator.calculate("add"));
console.log("After Substract: ",calculator.calculate("subtract"));
console.log("After Multiplication: ",calculator.calculate("multiply"));
console.log("After Devision: ",calculator.calculate("divide"));


console.log("== By Using Arrow Function ==");  //Log all the result of Arrow calculator function.
console.log("Afetr Addition: ", calculator.calculateWithArrow("add"));
console.log("After Substract: ",calculator.calculateWithArrow("subtract"));
console.log("After Multiplication: ",calculator.calculateWithArrow("multiply"));
console.log("After Devision: ",calculator.calculateWithArrow("divide"));

// Arrow function doesn't have their own this. They inherit this from the outer lexical scope. In this case outer scope will be global.
// While using simple function it can be easily implemented.