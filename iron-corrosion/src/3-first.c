// c not so bad but we don't have to
// forget the free!
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *helloWorld() {
  const char *a[] = { "Hello", " ", "World" };
  int len = 0;
  for (int r = 0; r < sizeof(a)/sizeof(*a); ++r) {
    len += strlen(a[r]);
  }
  char *buf = malloc(len+1);
  int cnt = 0;
  for (int i = 0; i < sizeof(a)/sizeof(*a); ++i) {
    for (int q = 0; q < strlen(a[i]); ++q) {
      buf[cnt++] = a[i][q]; //mutable string
    }
  }
  buf[cnt]=0;
  return buf;
}
int main() {
  char *ret = helloWorld();
  printf("%s\n", ret);
  free(ret); // das kann man schon mal vergessen
  return 0;
}
