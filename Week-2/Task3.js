//Create simple function that will run only once while we start program.

// It can create by IIFE(Immediately Invoked Function Expressions) which is defined and invoked immediately after its declaration.


//example-1
(function(x, y){
  let sum = x+y;
  console.log(sum);
  })(5,3); // output = 8


//example-2 (use case)
var counter = (function (){
  let count = 0;
  return{
    increment : function(){
      count++;
    },
    decrement : function(){
      count--;
    },
    getcount : function(){
      return count;
    }
  };
})();

counter.increment();
counter.increment();
counter.increment();
console.log(counter.getcount()); // output = 3
counter.decrement();
console.log(counter.getcount()); // output = 2
console.log(count); // reference error

// IIFE used to not pollute a globle scope by keeping variable and function private within its scope.


