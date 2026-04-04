#include <iostream>
#include <string>
using namespace std;

struct Student
{
  string name;
  int age;
  float grade;
};

struct Date
{
  int day;
  int month;
  int year;
};

struct Student
{
  string name;
  int age;
  Date birthday; // Nested structure
};

int main()
{
  Student s;
  s.name = "Juan dela Cruz";
  s.age = 19;
  // s.grade = 91.5;

  cout << "Name : " << s.name << endl;
  cout << "Age  : " << s.age << endl;
  // cout << "Grade: " << s.grade << endl;

  Student s;
  s.name = "Ana";
  s.birthday.day = 15;
  s.birthday.month = 6;
  s.birthday.year = 2005;

  return 0;
}
