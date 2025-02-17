// Create program of which required map, filter chaining, and after that replace that with reduce
// Ex. 
// const students = [
// { name: 'jeel', age: 21 },
// { name: 'franklin', age: 25 },
// { name: 'vivek', age: 26 },
// { name: 'hardik', age: 23 },
// ]

// create array of name of student  whose age is greater than 18.


const students = [
    { name: 'jeel', age: 21 },
    { name: 'franklin', age: 25 },
    { name: 'vivek', age: 11 },
    { name: 'hardik', age: 23 },
];

const filteredNames = students.filter(student => student.age>18).map(student => student.name);
console.log(filteredNames);
// Output: ['jeel', 'franklin', 'hardik']


const filteredNamesReduce = students.reduce((acc, student) => {
  if(student.age>18) acc.push(student.name);
  return acc;
},[])
console.log(filteredNamesReduce);
// Output: ['jeel', 'franklin', 'hardik']
