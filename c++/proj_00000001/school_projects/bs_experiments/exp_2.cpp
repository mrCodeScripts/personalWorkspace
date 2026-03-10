#include <iostream>
#include <vector>

int main()
{
    std::vector<int> names = {1, 2, 3};

    std::cout << (*names.end()--);

    // names.assign(3, "l;kajsdfl;kjsad");
}