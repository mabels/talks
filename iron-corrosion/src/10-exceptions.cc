#include <string.h>
#include <stdexcept>
#include <stdlib.h>

#include "HelloWorld.hh"

HelloWorld layer2() {
  HelloWorld layer2(13);
  void *ptr = malloc(1000);
  if (layer2.len == 13) {
    throw std::invalid_argument("if the wild 13" );
  }
  // divide by zero????
  free(ptr);
  return layer2;
}
HelloWorld layer1() {
  HelloWorld layer1(11);
  layer2();
  return layer1;
}
int main() {
  try {
    HelloWorld my(layer1());
    printf("%s\n", my.ret);
  }
  catch (std::exception &e) {
    printf("%s\n", e.what());
  }
}
