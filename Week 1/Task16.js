//Create a constructor function named Car that takes a brand parameter. Inside the constructor, create an object property carInfo with a nested method named displayInfo. The displayInfo method should use the "this" keyword to access both the brand property of the object and a parameter passed to the displayInfo method. Instantiate a Car object and call the displayInfo method.


function Car(brand) {
  this.brand = brand;
  this.carInfo = {
    displayInfo: (year) => { //creates arrow fn to access variable of object by using this.
      this.year = year;
      console.log(this.brand + " was made in the year " + this.year);
    }
  }
}

var myCar = new Car("Honda");
myCar.carInfo.displayInfo(2017);

