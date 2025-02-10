//Create a program that uses a while loop to iterate through an array of strings. Inside the loop, use forEach to print each string with an appended exclamation mark. The loop should terminate once the length of the current string exceeds 8 characters. Comment on the differences between while and forEach in this context.

const words = ["hello", "world",  "hey hey", "JavaScript", "iteration"];

console.log("Before applying control flow statements:", words);


console.log("After applying control flow statements:");
let i = 0;
while (i < words.length) {
    if (words[i].length > 8) {
        break; // break loop when current string's length > 8 
    }
    words[i].split().forEach(word => console.log(word + "!")); // Append "!" at the end of string
    i++;
}

//Differences between while and forEach in this context:
//1. while loop is used for conditional execution of a block of code, where i is start from 0 and goes to the (words.length-1) index.
//2. whereas forEach is used to iterate over an array and perform an action on each element.(Append "!" at the end)
//3. while loop requires manual increment of the loop counter, whereas forEach does not.
