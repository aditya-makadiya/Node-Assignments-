// Create example of function currying using closure and bind Ex. multiply by 2 from multiplication function

console.log("==Using Closure==");

function multiply(x) {
    return function(y) {
        return x * y;
    };
}

const multiplyBy2 = multiply(2); 
console.log(multiplyBy2(5)); // Output: 10
console.log(multiplyBy2(10)); // Output: 20


console.log("==Using Bind==");

function multiplyBind(x, y) {
    return x * y;
}

const multiplyBy2Bind = multiplyBind.bind(multiplyBind, 2);
console.log(multiplyBy2Bind(5)); // Output: 10
console.log(multiplyBy2Bind(10)); // Output: 20
