#include <iostream>

void swap (int &a, int &b) {
  int temp = a;
  a = b;
  b = temp;
}

struct Student {
  std::string name;
  int age;
  float grade;
};

// METHOD 1: AFTER THE STRUCTURE DEFINITIION
Student sl;

// METHOD 2: DIRECTLY DURING STRUCTURE DEFINITION
struct Student {
  std::string name;
  int age;
  float grade;
} s1, s2;




int main () {
  int x = 6, y = 2;
  swap(x, y);
  std::cout << "x =" << x << ", y =" << y << std::endl; // x=2, y=6

  // USING DOT OPERATOR (DIRECT VARIABLE)
  s1.name = "Juan";
  s1.age = 19;
  s1.grade = 88.5;

  // USING ARROW OPERATOR (POINTER TO STRUCTURE)
  Student *ptr = &s2;
  ptr->name = "Maria";


  return 0;
}

/*

struct StructureName {
   dataType member1;
   dataType member2;
   // ... more members
}

*/



