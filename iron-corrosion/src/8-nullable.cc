#include <time.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const char *helloWorld() {
  time_t t;
  time(&t);
  if (t%2) {
    return 0;
  } 
  return strdup("hello world");
}
int main() {
  const char *ret = helloWorld();
  printf("%s %c", ret, *ret); // could boom
  free((void*)ret); // free with 0 not good
}
// pointers are unmanaged, no constructor no destructor
// only pointers can be null

