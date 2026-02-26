#include <iostream>
#include <vector>
#include <iomanip>

int main()
{

    std::vector<int> numbers = {};
    std::vector<int> odd, even;

    int beg, last;

    std::cout << "Beg Num: ";
    std::cin >> beg;
    std::cout << "Last Num: ";
    std::cin >> last;

    int dif = last - beg;
    for (int i = 0; i <= dif; i++)
    {
        numbers.push_back(beg + i);
    }

    for (int i = 0; i < numbers.size(); i++)
    {
        if (numbers[i] % 2)
        {
            odd.push_back(numbers[i]);
        }
        else
        {
            even.push_back(numbers[i]);
        }
    }

    std::cout << std::endl;
    std::cout << "Odd numbers [" << odd.size() << "]: ";
    for (int i = 0; i < odd.size(); i++)
    {
        std::cout << std::setw(5) << odd[i];
    }
    std::cout << std::endl;
    std::cout << "Even numbers [" << even.size() << "]: ";
    for (int i = 0; i < even.size(); i++)
    {
        std::cout << std::setw(5) << even[i];
    }

    return 0;
}