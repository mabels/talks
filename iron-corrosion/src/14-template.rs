
struct Point<T> {
  x: T,
  y: T,
}

fn to_string<S: Into<String>>(_str: S) -> String  {
  return _str.into();
}

fn main() {
  println!("{}", to_string("i'm a str"));
  println!("{}", to_string(String::from("i'm a string")));
  let c = Point{ x:1, y:3 };
  println!("{} {}", c.x, c.y);
  let d = Point{ x:1.04, y:3.04 };
  println!("{} {}", d.x, d.y);
}
