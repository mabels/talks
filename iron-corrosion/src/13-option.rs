use std::time::UNIX_EPOCH;

struct HelloWorld {
  value: &'static str
}

impl HelloWorld {
  fn new() -> Option<HelloWorld> {
    let ticks = UNIX_EPOCH.elapsed().unwrap().as_secs();
    if ticks%2 == 0 {
      return Some(HelloWorld{value: "Hello World"});
    } else {
      return None
    }
  }
}

fn main() {
  let r = HelloWorld::new();
  match r {
      Some(t) => println!("result:{}", t.value),
      None => println!("No world")
  }
}
