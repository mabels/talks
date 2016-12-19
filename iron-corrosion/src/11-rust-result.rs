use std::time::UNIX_EPOCH;

struct HelloWorld {
  value: &'static str
}

impl HelloWorld {
  fn new() -> Result<HelloWorld, &'static str> {
    let ticks = UNIX_EPOCH.elapsed().unwrap().as_secs();
    if ticks%2 == 0 {
      return Ok(HelloWorld{value: "Hello World"});
    } else {
      return Err("Odd seconds"); 
    }
  }
}

fn main() {
  let r = HelloWorld::new();
  match r {
      Ok(t) => println!("result:{}", t.value),
      Err(why) => println!("{}", why)
  }
}
