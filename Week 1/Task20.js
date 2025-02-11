//Create an object called originalPerson with properties name, age, and an array hobbies. Use both shallow copy and deep copy techniques to create a new object called shallowCopyPerson and deepCopyPerson. Modify the hobbies array in one of the copies and observe how it affects the original object. Log the properties of all three objects. 

let originalPerson = {
  name: 'Raj',
  age: 30,
  hobbies: ['reading', 'swimming', 'cycling']
}

let shallowCopyPerson = {...originalPerson}; // shallow copy using spread operator.
let deepCopyPerson = JSON.parse(JSON.stringify(originalPerson)); // deep copy using json methods.

//Modifications in original object.
originalPerson.name = "Aditya";
originalPerson.age= 20;
originalPerson.hobbies.push('gaming')

console.log("== Original object ==");
console.log(originalPerson);

console.log("== Shallow object ==");
console.log(shallowCopyPerson);

console.log("== Deep object ==");
console.log(deepCopyPerson);


