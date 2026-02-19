#include <iostream>
#include <string>
#include <variant>
#include "Constructors.h"

CarType1::CarType1(std::string b, int y)
{
    this->brand = b;
    this->year = y;
    std::cout << "\033[1;32mSUCCESSFULY CREATED CAR!" << "\033[0m" << std::endl;
};

CarType2::CarType2()
{
    this->brand = "Bugatti";
    this->year = 2019;
    std::cout << "\033[1;32mSUCCESSFULY BUGATTI CREATED CAR!" << "\033[0m" << std::endl;
};
CarType3::CarType3(const std::variant<CarType1, CarType2> &car)
{
    // extract variant and data
    if (std::holds_alternative<CarType1>(car))
    { // if the variant holds this type of data
        this->brand = std::get<CarType1>(car).brand;
        this->year = std::get<CarType1>(car).year;
    }
    else
    { // else get the other way around
        this->brand = std::get<CarType2>(car).brand;
        this->year = std::get<CarType2>(car).year;
    }
    std::cout << "\033[1;32mSUCCESSFULY CREATED A CLONE CAR!" << "\033[0m" << std::endl;
};

void CarType1::showInfo() { std::cout << "\033[1;32mBrand:\033[0m\033[32m " << this->brand << ", \033[1;32mYear: \033[0m\033[32m" << this->year << "\033[0m" << std::endl; };
void CarType2::showInfo() { std::cout << "\033[1;32mBrand:\033[0m\033[32m " << this->brand << ", \033[1;32mYear: \033[0m\033[32m" << this->year << "\033[0m" << std::endl; };
void CarType3::showInfo() { std::cout << "\033[1;32mBrand:\033[0m\033[32m " << this->brand << ", \033[1;32mYear: \033[0m\033[32m" << this->year << "\033[0m" << std::endl; };
