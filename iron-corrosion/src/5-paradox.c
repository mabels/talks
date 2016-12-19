// dynamic sized typed paradox
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
  int len;
  char ret[len+1];
} HelloWorld;

HelloWorld<len> helloWorld() {
  const char *a[] = { "Hello", " ", "World" };
  int len = 0;
  for (int r = 0; r < sizeof(a)/sizeof(*a); ++r) {
    len += strlen(a[r]);
  }
  HelloWorld<len> hw;
  int cnt = 0;
  for (int i = 0; i < sizeof(a)/sizeof(*a); ++i) {
    for (int q = 0; q < strlen(a[i]); ++q) {
      hw.ret[cnt++] = a[i][q];
    }
  }
  return hw;
}
int main() {
  // mmh where could the len be known upfront?
  HelloWorld<len> hw = helloWorld();
  printf("%s\n", hw.ret);
  return 0;
}
