#include <iostream>

void tripple (int &num) {
  num = num * 3;
}

int main () {
  int x = 4;
  tripple(x);
  std::cout << "After: x = " << x << std::endl; // x is now 12

  return 0;
}


