//Create a program that demonstrates variable hoisting in JavaScript. Declare variables using both var and let within functions and blocks, and then attempt to access these variables before and after their declarations. Explain the behavior observed in the comments.

function VarHoisting() {
    console.log('Before declaration:', x); // undefined
    var x = 10;
    console.log('After declaration:', x);// 10
    
    if (true) {
        var x = 20;
        console.log('Inside block:', x); // 20
    }
    console.log('After block:', x); // 20 (It's not 10 because var is not block scope)
}
console.log("==var==");

VarHoisting()

function LetHoisting() {
    // console.log(y); // It will throw ReferenceError
    let y = 30;
    console.log('After declaration:', y);  // 30
    
    if (true) {
        let y = 40;   // Creating new let variable
        console.log('Inside block:', y);   // 40
    }
    console.log('After block:', y);        // 30
}
console.log("==let==");
LetHoisting()

function MixHoisting() {
    var a = 1;
    let b = 2;
    {
        console.log('Before block var:', a); // 1
        var a = 3;                          
        let b = 4; // New block-scoped variable
        console.log('Inside block:', a, b); // 3, 4
    }
    console.log('After block:', a, b);      // 3, 2
}
console.log("==Mix==");
MixHoisting()