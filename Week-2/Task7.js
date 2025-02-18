//Create a function that takes an array and a callback function specifying the operation to be performed on each element of the array. The function should return a new modified array using JS. (Don’t use map)

function PerformCallback(arr, callbackfn){
  let result = [];
  for(let i=0;i<arr.length;i++){
    result.push(callbackfn(arr[i]));
  }
  return result;
}

const numbers = [1,2,3,4,5,6];

function double(num){
  return num * 2;
}
function square(num){
  return num * num;
}

console.log(PerformCallback(numbers, double));
console.log(PerformCallback(numbers, square));