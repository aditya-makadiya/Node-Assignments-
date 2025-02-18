//Create simple program that will print 1 to n at the interval of 1 second using setTimeout

function print(n){
  for(let i=1;i<=n;i++){
    setTimeout(() => {
      console.log(i);
    }, i*1000);
  }
}

print(10);