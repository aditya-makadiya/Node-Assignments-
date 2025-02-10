//Develop a script that employs the reduce function to find the sum of all elements in an array. Print the original array and the final sum.

const Array = [2,4,6,8,10,12,14,16]

const reducedArray = Array.reduce((acc,curr)=>{
  return acc + curr;
})

console.log(Array);
console.log(reducedArray);
