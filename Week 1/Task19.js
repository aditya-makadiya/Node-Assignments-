// Create two objects named originalObject and modifiedObject. Assign the same properties to both objects. Modify one property in modifiedObject and observe how it affects the other object due to reference. Log the properties of both objects to the console.


let originalObject = {
  property1 : "Original property 1",
  property2 : "Original property 2",
  property3 : "Original property 3"
}

let modifiedObject = originalObject; // Assigning original object to modified object. 


modifiedObject.property2 = "Modified Property in modified object";
originalObject.property1 = "modified property in original object"


console.log("=== original object ===");
console.log(originalObject.property1);
console.log(originalObject.property2);
console.log(originalObject.property3);

console.log("=== modified object ===");
console.log(modifiedObject.property1);
console.log(modifiedObject.property2);
console.log(modifiedObject.property3);
