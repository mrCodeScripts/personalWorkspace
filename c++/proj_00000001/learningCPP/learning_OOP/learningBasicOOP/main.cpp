#include <iostream>

/**
 * Basic class creation and usage
 */

class Car {
    public:
        std::string brand;
        std::string model;
        int year;

        void start () {
            std::cout << brand << " " << model << " is starting!" << std::endl;
        }
};

int main () {

    Car car1;
    car1.brand = "Toyota";
    car1.model = "Corolla";
    car1.year = 2020;

    car1.start();

    return 0;
}