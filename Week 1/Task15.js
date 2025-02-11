//Define an object called calculator with properties x and y. Add a method named calculate to the object, which takes an operation string ("add", "subtract", "multiply", "divide") and uses an arrow function to perform the corresponding operation on x and y. Inside the arrow function, use the "this" keyword to access the object properties. Test the calculator with different operations.


const calculator = {
  x: 27,
  y: 9,
  calculate : function (operation){
    const calculateWithArrow= (operation) => {
      switch (operation) {
        case "add": return this.x + this.y;
        case "subtract": return this.x - this.y;
        case "multiply": return this.x * this.y;
        case "divide": return this.x / this.y;
      }
    }
    return calculateWithArrow(operation)
  }
}


console.log("Afetr Addition: ", calculator.calculate("add")); //output: 36
console.log("After Substract: ",calculator.calculate("subtract")); //output:18
console.log("After Multiplication: ",calculator.calculate("multiply"));  //output: 243
console.log("After Devision: ",calculator.calculate("divide"));  //output: 3

// Arrow function doesn't have their own this. They inherit this from the outer lexical scope. In this case Arrow method is nested therefor outer scope will be object and therefor we can access those variable.