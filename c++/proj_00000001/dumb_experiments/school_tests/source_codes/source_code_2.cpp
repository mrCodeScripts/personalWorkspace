#include <iostream>

void addFive (int num) {
  num = num + 5;
  std::cout << "INSIDE FUNCTION: " << num << std::endl;
}

int main () {
  int x = 10;
  addFive(x);
  std::cout << "IN MAIN FUNCTION: " << x << std::endl; // still 10

  return 0;
}



