// Create sample script named simplescript.js that prints current date and time and executes using node. print current time using momentjs library.


const m = require('moment');

//Different formats to display date and time.
console.log("==Different formats==");

const currentDate = m().format("YYYY-MM-DD HH:MM:SS");
const currentDate1 = m().format('L');
const currentDate2 = m().format('lll');
const currentTime = m().format('LTS');


console.log(currentDate);
console.log(currentDate2);

console.log("== Current Date & Time ==");
console.log("Current Date : ",currentDate1);
console.log("Current Time : ",currentTime);