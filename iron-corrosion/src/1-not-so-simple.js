// not so simple
function helloWorld() {
  let r = "";
  // let a="y"; ((a) => { 
  //   a+="xxx"; 
  // })(a); 
  // console.log(a);
  ["Hello", " ", "World"].forEach((s) => r += s)
  return r;
}
console.log(helloWorld());
