// more transparent, lets count the instances
// buf.join or no mutable strings are a pain.
function helloWorld() {
  let a = new Array();
  a.push(new String("Hello"))
  a.push(new String(" "))
  a.push(new String("World"))
  let len = 0;
  a.forEach((u) =>  {
    len += u.length
  })
  let buf = new Array(len);
  let cnt = 0
  a.forEach((k) => {
    for (let q = 0; q < k.length; ++q) {
      buf[cnt++] = k[q]
    }
  })
  return buf.join("")
}
console.log(helloWorld());

