#include <iostream>

void swap (int *a, int *b) {
  int temp = *a;
  *a = *b;
  *b = temp;
}

int main () {
  int x = 3, y = 9;
  swap(&x, &y);
  std::cout << "x =" << x << ", y =" << y << std::endl; // x=9, y=3

  return 0;
}



