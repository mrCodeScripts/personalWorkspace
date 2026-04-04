#include <iostream>

void doubleValue (int  *num) {
  *num = *num * 2;
}

int main () {
  int x = 7;
  doubleValue(&x);
  std::cout << "After: x =" << x << std::endl; // x is now 14

  return 0;
}



