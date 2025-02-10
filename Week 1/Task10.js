//Develop a script that uses an array to store the days of the week. Use array methods such as push, pop, shift, or unshift to modify the array. Print the array after each modification. Additionally, use the indexOf method to find the index of a specific day.

const Days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
console.log("Initial Array : ",Days);

console.log("Popped Element : ", Days.pop()); // pop() returns a last element of the array which will going to remove.
console.log("After pop : ", Days);

console.log(Days.push("Saturday")); // push() returns the the count of array elements after pushing the element.
console.log("After push : ", Days);


console.log("Removed element by using Shift : ", Days.shift()); // shift() returns a first element of the array which is going to removed from array.
console.log("After shift : ", Days);

console.log(Days.unshift("Sunday")); // unshift() returns the the count of array elements after adding the element at first.
console.log("After unshift : ", Days);
