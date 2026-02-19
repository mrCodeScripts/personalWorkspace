#include <iostream>
#include <string>
#include "CopyConstructor.h"

Car::Car(std::string b, int y)
{
    this->brand = b;
    this->year = y;

    std::cout << "\033[1;32mSUCCESSFULY CREATED CAR \033[0m\033[32m'" << this->brand << " " << this->year << "' \033[0m" << std::endl;
};

Car::Car(const Car &other)
{
    this->brand = other.brand;
    this->year = other.year;

    std::cout << "\033[1;32mSUCCESSFULY CREATED CLONE CAR \033[0m\033[32m'" << this->brand << " " << this->year << "' \033[0m" << std::endl;
};

Car::~Car()
{
    std::cout << "\033[1;32mSUCCESSFULY DESTROYED CAR \033[0m\033[32m'" << this->brand << " " << this->year << "' \033[0m" << std::endl;
};
