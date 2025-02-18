//Create Car constructor function that takes parameters such as name, brand, and year. Include a method displayInfo that prints the car details. Create an instance using the constructor function and call the displayInfo method.


function Car(name, brand, year) {
  this.name = name;
  this.brand = brand;
  this.year = year;
  this.displayInfo = function() {
    console.log(`Name: ${this.name}, Brand: ${this.brand}, Year: ${this.year}`);
      }
}

// Create an instance of the Car class
let carOne = new Car('Honda', 'City', 2015);
// Call the displayInfo method on the instance
carOne.displayInfo();
