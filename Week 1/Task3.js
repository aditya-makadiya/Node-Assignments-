//Develop a JavaScript script that utilizes nested loops (either for or while). The outer loop should iterate from 1 to 3, and the inner loop from 1 to 5. Use break to exit the inner loop when the current iteration count of the inner loop is equal to the outer loop's current iteration count. Print the values of both loop variables to demonstrate the breaking condition.


for(let outer=1; outer<=3; outer++){
  console.log("OUTER UPDATED");
  
  for(let inner=1; inner<=5; inner++){
    console.log(`outer=${outer} and inner=${inner}`);
    if(inner === outer){
      console.log(`Breaking at outer=${outer} and inner=${inner}`);
      break;
    }
  }
}