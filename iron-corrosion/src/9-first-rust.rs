struct HelloWorld {
  values: Vec<&'static str>,
  ok: bool
}
impl HelloWorld {
  fn joined(&self) -> String {
    let mut ret = String::new();
    for v in self.values.iter() {
      ret.push_str(v);
    }
    return ret;
  }
}
fn hello_world() -> HelloWorld {
  return HelloWorld{
    values: vec!["Hello", " ", "World"],
    ok: true
  };
}
fn main() {
  print!("{}\n", hello_world().joined());
}
// need no constructor nor destructor nor
// copy constructor for nested #[derive(Clone, Copy)]
