//Create a program that utilizes the filter function to extract even numbers from an array of integers. Print the original array and the filtered array containing only even numbers.


const Array = [10, 15, 20, 25, 30, 35, 40, 45, 50];

const filteredArray = Array.filter((Element)=>{
  return Element % 2 === 0;
})
//Filter iterate over all the elements of the array and pass through "Element % 2 === 0" condition. Elements which pass through this condition will store in filtered array.

console.log(Array);
console.log(filteredArray);

