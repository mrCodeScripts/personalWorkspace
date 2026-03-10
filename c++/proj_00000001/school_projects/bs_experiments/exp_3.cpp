#include <iostream>
#include <limits>
#include <vector>
#include <iomanip>
#include <algorithm>

int main()
{

    int MAX_NUMBER_OF_GRADES = 10;
    std::vector<int> grades;

    while (grades.size() < MAX_NUMBER_OF_GRADES)
    {
        std::cout << "\033[32mEnter grade " << grades.size() + 1 << ": \033[0m";
        int grade;
        std::cin >> grade;
        if (grade < 70 || grade > 100)
        {
            std::cout << "\033[31mINVALID GRADE! Please enter a number between 0 and 100.\n\033[0m";
            continue;
        }
        if (std::cin.fail())
        {
            std::cout << "\033[31mINVALID INPUT!\n\033[0m";
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
            continue;
        }
        grades.push_back(grade);
    }

    std::cout << "SORT GRADE FROM LOWEST TO HIGHEST\n\n";
    std::sort(grades.begin(), grades.end());

    std::cout << "\n\033[34mDISPLAY USING INDEX-BASED LOOP\033[0m\n\n";
    for (size_t i = 0; i < grades.size(); i++)
    {
        // if (grades[i] >= 75)
            std::cout << "\033[32mGrade " << i + 1 << ": " << std::setprecision(2) << std::fixed << grades[i] << "\033[0m\n";
    }

    std::cout << "\n\033[34mDISPLAY USING RANGE-BASED LOOP\033[0m\n\n";
    int i1 = 0;
    for (const int &grade : grades)
    {
        i1++;
        // if (grade >= 75)
            std::cout << "\033[32mGrade: " << i1 << ": " << std::setprecision(2) << std::fixed << grade << "\033[0m\n";
    }

    int i2 = 0;
    std::cout << "\n\033[34mDISPLAY USING ITERATOR-BASED LOOP\033[0m\n\n";
    for (auto it = grades.begin(); it != grades.end(); ++it)
    {
        i2++;
        // if (*it >= 75)
            std::cout << "\033[32mGrade " << i2 << ": " << std::setprecision(2) << std::fixed << *it << "\033[0m\n";
    }

    std::cout << "\n\033[34mGRADE ANALYSIS\033[0m\n\n";
    int highest = 0;
    int lowest = 100;
    double total = 0;
    for (const int &grade : grades)
    {
        if (grade > highest)
            highest = grade;
        if (grade < lowest)
            lowest = grade;
        total += grade;
    }

    std::cout << "\033[36mHighest Grade: " << highest << "\033[0m\n";
    std::cout << "\033[36mLowest Grade: " << lowest << "\033[0m\n";
    std::cout << "\033[36mAverage Grade: " << std::fixed << std::setprecision(2) << total / grades.size() << "\033[0m\n";
    std::cout << "\033[36mNumber of failing grades: " << std::count_if(
        grades.begin(), grades.end(), [](int grade) { 
            return grade <= 75; 
        }) << "\033[0m\n\n";


    std::cout << "\033[34mDISPLAY PASSING GRADES (>= 75)\033[0m\n\n";
    for (size_t i = 0; i < grades.size(); i++)
    {
        if (grades[i] >= 75)
            std::cout << "\033[32mGrade " << i + 1 << ": " << std::setprecision(2) << std::fixed << grades[i] << "\033[0m\n";
    }
    std::cout << std::endl;
    return 0;
}