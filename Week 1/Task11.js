//Write a JavaScript program that uses the map function to transform an array of numbers. Square each element in the array and create a new array with the squared values. Print both the original and transformed arrays.

const Array=[2,5,13,4,9,7];

const modifiedArray = Array.map((element)=>{
  return Math.pow(element,2);
})

// Map iterates over all the elements of Array and perform "Math.pow(element,2)" function on each elements and stores in new modifiedArray. 

console.log(Array);
console.log(modifiedArray);
