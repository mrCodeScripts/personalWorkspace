#include <iostream>
#include <string>
#include "CopyConstructor.h"

int main () {
    Car car1("Bugatti", 2007);
    Car car2 = car1;

    return 0;
}