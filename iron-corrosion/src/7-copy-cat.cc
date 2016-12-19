#include <stdio.h>
#include <string.h>
#include "HelloWorld.hh"
HelloWorld helloWorld() {
  const char *a[] = { "Hello", " ", "World" };
  int len = 0;
  for (int r = 0; r < sizeof(a)/sizeof(*a); ++r) {
    len += strlen(a[r]);
  }
  HelloWorld hw(len);
  int cnt = 0;
  for (int i = 0; i < sizeof(a)/sizeof(*a); ++i) {
    for (int q = 0; q < strlen(a[i]); ++q) {
      hw.ret[cnt++] = a[i][q];
    }
  }
  return hw;
}
int main() {
  HelloWorld hw = helloWorld(); // copy constructor
  printf("%s\n", hw.ret);
  return 0;
}
