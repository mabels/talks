struct HW { hello: string, world: string }
let a = Box&lt;HW&gt;(HW { hello: “W”, world: “X”});
let c = a;
let d = a;
c.unwrap().hello = “X”;
if d.unwrap().hello == “X”



let r: Result&lt;HW&gt; = u.parse(“x”.to_string());
let mut m: string = "";
match r.getH() {
  Ok(s) -> m = s;
    Err -> return Err(r.unwrap_err())
    }
    m += “...Fertig”;

