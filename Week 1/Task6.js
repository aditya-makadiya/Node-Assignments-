//Write a script that utilizes const for declaring constants. Attempt to reassign values to these constants and observe the behavior. Include comments explaining the concept of immutability with const and when it is appropriate to use it.

const PI = 3.14;
const user = {
    name: 'Aditya',
    age: 21,
    education:{
      school: 'SSGV',
      college: 'Charusat'
    }
};
const numbers = [1, 2, 3];

// Attempt to reassign values to the constants

// PI = 3.15; // It will throw TypeError for reassigning a const variable.

user.age = 25; // It will not throw any error as it is an object
user.education.college = 'DDU'; // It will not throw any error as it is an nested object
console.log(user);

numbers[1]=20; // It will not throw error as modification of array is allowed.
numbers.push(14); // it also works.
console.log(numbers); 


//Key points About Const

//you cannot reassign a value to a const variable
//you can modify the contents of an object or array
//you can modify the contents of a nested object.


