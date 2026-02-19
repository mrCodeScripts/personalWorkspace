#include <iostream>
#include <string>
#include <variant>

class CarType1
{
public:
    std::string brand;
    int year;

    // this is a paramitized constructor (takes parameters)
    CarType1(std::string b, int y)
    {
        this->brand = b;
        this->year = y;
        std::cout << "\033[1;32mSUCCESSFULY CREATED CAR!" << "\033[0m" << std::endl;
    }

    void showInfo()
    {
        std::cout << "\033[1;32mBrand:\033[0m\033[32m " << brand << ", \033[1;32mYear: \033[0m\033[32m" << year << "\033[0m" << std::endl;
    }
};

class CarType2
{
public:
    std::string brand;
    int year;

    // this is a default constructor (takes parameters)
    CarType2()
    {
        this->brand = "Bugatti";
        this->year = 2019;
        std::cout << "\033[1;32mSUCCESSFULY BUGATTI CREATED CAR!" << "\033[0m" << std::endl;
    }

    void showInfo()
    {
        std::cout << "\033[1;32mBrand:\033[0m\033[32m " << brand << ", \033[1;32mYear: \033[0m\033[32m" << year << "\033[0m" << std::endl;
    }
};

class CarType3
{
public:
    std::string brand;
    int year;

    // this is a default constructor (takes parameters)
    CarType3(const std::variant<CarType1, CarType2> &car)
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
    }

    void showInfo()
    {
        std::cout << "\033[1;32mBrand:\033[0m\033[32m " << brand << ", \033[1;32mYear: \033[0m\033[32m" << year << "\033[0m" << std::endl;
    }
};

int main()
{
    CarType1 cartype1("Toyota", 1988);
    cartype1.showInfo();
    std::cout << '\n'
              << std::endl;
    CarType2 cartype2;
    cartype2.showInfo();
    std::cout << '\n'
              << std::endl;
    CarType3 cartype3clone(cartype2);
    cartype3clone.showInfo();
    std::cout << '\n'
              << std::endl;
    return 0;
}

/*
CONSTRUCTORS
   - Special member functions called automatically when an object is created.
   - Purpose: Initialize object members, allocate resources if needed.
   - Key Features:
       * Same name as the class
       * No return type (not even void)
       * Can be overloaded to handle different parameter types
   - Types:
       * Default Constructor: No parameters
       * Parameterized Constructor: Takes arguments to initialize the object
       * Copy Constructor: Creates a new object as a copy of an existing one
 */