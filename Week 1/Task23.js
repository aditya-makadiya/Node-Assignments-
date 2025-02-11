// Create a constructor function called Person that takes name and age as parameters and assigns them as properties. Add a method greet to the prototype of the constructor, which logs a greeting message using the person's name. Instantiate two objects using the Person constructor and call the greet method on both.

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.greet = function() {
  console.log(`Hello, my name is ${this.name} and I am ${this.age}`);
};

// Create instances.
let person1 = new Person('Aditya', 21);
let person2 = new Person('Vraj', 22);

// Call method for both instances
person1.greet();
person2.greet(); 

