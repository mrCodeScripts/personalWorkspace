#include <iostream>
#include <string>
 
struct Date {
    int day;
    int month;
    int year;
};
 
struct Student {
    std::string name;
    int age;
    Date birthday;
};
 
int main() {
    Student s;
    std::cout << "Enter name: "; std::getline(std::cin, s.name);
    std::cout << "Enter age : "; std::cin >> s.age;
    std::cout << "Birthdate (DD MM YYYY): ";
    std::cin >> s.birthday.day >> s.birthday.month >> s.birthday.year;
 
    std::cout << "\n--- Student Record ---" << std::endl;
    std::cout << "Name      : " << s.name << std::endl;
    std::cout << "Age       : " << s.age << std::endl;
    std::cout << "Birthdate : " << s.birthday.day << "/"
         << s.birthday.month << "/" << s.birthday.year << std::endl;
    return 0;
}



