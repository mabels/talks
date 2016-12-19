use std::fmt;

struct HW { 
  hello: String, 
  world: String 
}

impl Clone for HW {
  fn clone(&self) -> HW {
    HW {
      hello: self.hello.clone(),
      world: self.world.clone()
    }
  }
}

impl fmt::Display for HW {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    return write!(f, "<HW@:hello={} world={}>", 
      self.hello, self.world);
  }
}

fn main() {
  let a = HW { 
    hello: String::from("Hello"), 
    world: String::from("World")
  };
  //let q = a.clone();
  //let b = a;
  //let ref c = q;
  let mut d = a;
  println!("d={}", d.clone());
  d.hello = String::from("Tach");
  println!("d={}", d.clone());
}

