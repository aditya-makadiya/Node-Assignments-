//Create an object called person with properties name and age. Add a method named introduce to the object, which logs a message using the "this" keyword to reference the name and age properties. Call the introduce method to introduce the person.

let person = {
  name : "Aditya",
  age : 21,
  introduce : function(){
    console.log(`Hello, my name is ${this.name} and I am ${this.age}`);
  }
}

person.introduce();