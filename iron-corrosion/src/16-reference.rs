
use std::collections::HashMap;
use std::cell::RefCell;
struct HW { word_count: usize }
fn main() {
  let mut page_idx = HashMap::new();
  page_idx.insert(1, RefCell::new(HW{word_count: 45}));
  page_idx.insert(2, RefCell::new(HW{word_count: 90}));
  page_idx.insert(3, RefCell::new(HW{word_count: 135}));
  let mut pages : Vec<&RefCell<HW>> = vec![
                     page_idx.get(&1).unwrap().clone(),
                     page_idx.get(&2).unwrap().clone(),
                     page_idx.get(&3).unwrap().clone()
                  ];
  pages[1].borrow_mut().word_count = 4711;
  println!("page_idx:{}",page_idx.get(&2)
    .unwrap().borrow().word_count);
  for i in pages.iter() { 
    println!("pages:{}", i.borrow().word_count); 
  }
}

