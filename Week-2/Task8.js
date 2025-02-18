//Create sleep function which can stop for loop for given amount of time

//solution:
//There is not any built-in sleep method in Js as it is single threaded and non-blocking language. But we can create sleep function by using promise, async and await 


function sleep(time) {
  return new Promise(resolve => setTimeout(resolve,time))
}

async function loop() {
  console.log("start");
  for(let i=1;i<20;i++){
    await sleep(1000); // Sleep for 1 second
    console.log(i);

  }
  console.log("stop");
}
loop();
