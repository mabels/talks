#include <stdlib.h>
class HelloWorld {
public:
  int len;
  char *ret;
  HelloWorld(int len) : len(len), 
    ret(static_cast<char*>(malloc(len+1))) {
    printf("HelloWorld:HelloWorld:len:%p\n", this);   
  }
  HelloWorld(const HelloWorld &hw) : len(hw.len), 
    ret(static_cast<char*>(malloc(hw.len+1))) {
    memcpy(this->ret, hw.ret, len);
    printf("HelloWorld:HelloWorld:copy:%p\n", this);   
  }
  ~HelloWorld() {
    printf("HelloWorld:~HelloWorld:%p\n", this);   
    free(ret);
  }
};

