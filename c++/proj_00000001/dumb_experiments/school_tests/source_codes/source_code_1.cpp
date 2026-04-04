#include <iostream>

// FUNCTION DEFINITION
int addNumbers (int a, int b)  {
  return a + b;
};

float circleArea (float radius) {
  return 3.14159 * radius * radius;
}

// FUNCTION DECLARATION (PROTOTYPE)
int addSomeNumbers (int a, int b);

int main () {
  int result = addNumbers(1, 2);
  std::cout << "SUM: " << result << std::endl;

  return 0;
}

// FUNCTION DEFINITION
int addSomeNumbers (int a, int b) {
  return a + b;
};
