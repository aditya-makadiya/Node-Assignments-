// Create function that in which you have to pass number in diff function call and when you want result at the end you have to call function with no argument.
// Ex. magicFunction(2)(3)(4)(5)()
// output: 14

function magicFunction(num) {
    let sum = num || 0;     // assign first value to the sum and there is not any number than sum will be 0.
    function inner(nextnum){
      if(nextnum === undefined){
        return sum;   // return sum when there is no more arguments.
      }
      sum += nextnum;
      return inner;   //calling inner function which creates chaining here.
    }
    return inner;
}


console.log(magicFunction(6)(3)(4)(9)());  // Output: 22
