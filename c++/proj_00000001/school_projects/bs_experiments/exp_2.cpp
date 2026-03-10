#include <iostream>
#include <vector>
#include <variant>

int main()
{
    std::vector<int> names = {1, 2, 3};
    std::vector<std::vector<int>> map;
    // std::cout << (*names.end());
    // names.assign(3, 100);
    // std::cout << (names.back()) << std::endl;
    // std::cout << (names.front()) << std::endl;
    // std::cout << (names.at(1)) << std::endl;

    std::vector<std::variant<std::string, int>> items = {"laksdjflsjdf", 11};
    // std::cout << (std::get<std::string>(items[0])) << std::endl;;

    for (const auto &i : items) {
        std::visit([](auto &&v) {
            std::cout << v << std::endl;
        }, i);
    }

    for (std::vector<int>::iterator it = names.begin(); it != names.end(); it++)
    {
        std::cout << *it << std::endl;
    }

    int item = 0;
    int *it = &item;
    std::cout << (*it) << std::endl;

    for (int &name : names)
    {
        int *it = &name;
        if (*it % 2)
        {
            std::cout << "ODD: " << *it << std::endl;
        }
        else
        {
            std::cout << "EVEN: " << *it << std::endl;
        }
    }

    return 0;
}