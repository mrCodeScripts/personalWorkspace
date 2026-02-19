#include <iostream>
#include <algorithm>

int main (){
    srand(time(0));
    int i = 10;
    int random = rand() % i;

    std::cout << random;

    return 0;
}