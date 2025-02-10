//Create an object called person with properties name and age. Add a method named introduce to the object, which logs a message using the "this" keyword to reference the name and age properties. Call the introduce method to introduce the person.

class Person{
  constructor(name, age){
    this.name = name;
    this.age = age;
  }
  introduce(){
    console.log(`Hello, my name is ${this.name} and I am ${this.age}`)
  }
}

const p1 = new Person("Aditya",21)
p1.introduce();