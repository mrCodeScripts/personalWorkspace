#include <iostream>

void swap (int a, int b) {
  int temp = a;
  a = b;
  b = temp;

  std::cout << "Inside: a =" << a << ", b = " << b << std::endl;
}

int main () {
  int a = 5, b = 10;
  swap(a, b);
  std::cout << "Main: a=" << a << ", b=" << b << std::endl; // Unchanged

  return 0;
}




