#include <iostream>
#include "Constructors.h"

int main () {
    CarType1 cartype1("Toyota", 1988);
    cartype1.showInfo();
    std::cout << '\n' << std::endl;
    CarType2 cartype2;
    cartype2.showInfo();
    std::cout << '\n' << std::endl;
    CarType3 cartype3clone(cartype2);
    cartype3clone.showInfo();
    std::cout << '\n' << std::endl;
    return 0;
}