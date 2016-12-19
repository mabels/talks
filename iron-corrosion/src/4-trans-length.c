// defect but this how to transfer length
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
      buf[cnt++] = a[i][q];
    }
  }
  return ret;
  free(buf); // will not be called
}
int main() {
  char *ret = whatmemory(whatsize);
  strcpy(ret, helloWorld());
  printf("%s\n", ret);
  return 0;
}
