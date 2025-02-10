// Write a JavaScript program that uses a for loop to iterate over an array of numbers. Within the loop, implement a condition to break out of the loop when a number greater than 5 is encountered. Additionally, use continue to skip the iteration when the number is exactly 3. Print the elements before and after applying these control flow statements.


const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

console.log(`Before applying control flow statements: ${numbers}`);

console.log("After applying control flow statements:");
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === 3) {
        continue; // Skip the iteration when the number is 3
    }
    if (numbers[i] > 5) {
        break; // Break the loop when the number is greater than 5
    }
    console.log(numbers[i]);
}