//Create an object called student with properties name, age, and an array grades. Add a method named calculateAverage to the object, which calculates and returns the average of the grades. Iterate through the object properties using a loop and log each property and its value. Call the calculateAverage method and log the result.

let student = {
  name: 'Raj',
  age: 20,
  grades: [73, 86, 97, 88, 92],
  calculateAverage: function() {
    let sum = 0;
    let size = this.grades.length;
    for (let i = 0; i < size; i++) {
      sum += this.grades[i];
    }
    let average = sum / size;
    return average;
  }
}

for(let keys in student){
  if(student[keys]){
    console.log(keys + ': ' + student[keys]);
  }
}

console.log("Average score is ",student.calculateAverage());
