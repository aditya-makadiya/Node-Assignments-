// Create two objects user1 and user2 with similar properties. Write a function compareObjects that compares the properties of both objects. The function should log whether the objects are equal or not based on their properties. Test the function with user1 and user2

let user1 = {
  name: 'Raj',
  age: 30,
  occupation: 'Software Engineer'
}

let user2 = {
  name: 'Raj',
  age: 30,
  occupation: 'Software Engineer'
}

function compareObjects(object, object){
  let keys1 = Object.keys(user1); // Get the keys of the object
  let keys2 = Object.keys(user2);
  if(keys1.length !== keys2.length){ // It directly compares the count of keys if it isn't same then return not equal.
    console.log('Objects are not equal');
    return;
  }

  for(let i=0; i<keys1.length; i++){
    if(user1[keys1[i]] !== user2[keys2[i]]){ //It compares each value for corresponding keys.
      console.log('Objects are not equal');
      return;
    }
  }
  console.log("Objects are equal");

}

compareObjects(user1, user2);
