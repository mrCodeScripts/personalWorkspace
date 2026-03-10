#include <iostream>
#include <limits>
#include <string>
#include <iomanip>

int main()
{
    int gradeStorage[5][4] = {0};

    std::string subjects[4] =
    {
        "SCIENCE",
        "MATH",
        "ENGLISH",
        "PROGRAMMING"
    };

    bool work = true;

    std::cout << "===== STUDENT GRADE PROGRAM =====\n";

    while (work)
    {
        int choose;

        std::cout << "\nCHOOSE:\n";
        std::cout << "1: Insert grades\n";
        std::cout << "2: Display grades\n";
        std::cout << "3: Exit\n";
        std::cout << "Choice: ";

        std::cin >> choose;

        if (std::cin.fail())
        {
            std::cout << "INVALID INPUT!\n";
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
            continue;
        }

        if (choose == 1)
        {
            for (int i = 0; i < 5; i++)
            {
                std::cout << "\nEnter grades for Student " << i + 1 << "\n";

                for (int j = 0; j < 4; j++)
                {
                    int grade;

                    while (true)
                    {
                        std::cout << subjects[j] << ": ";
                        std::cin >> grade;

                        if (std::cin.fail() || grade < 70 || grade >= 100)
                        {
                            std::cout << "\033[31mInvalid grade! Enter a number between 70 and 100.\033[0m\n";
                            std::cin.clear();
                            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                        }
                        else
                        {
                            gradeStorage[i][j] = grade;
                            break;
                        }
                    }
                }
            }

            std::cout << "\033[32m\nGrades successfully recorded!\033[0m\n";
        }
        else if (choose == 2)
        {
            int highest = 0;
            int lowest = 100;
            double subjectTotals[4] = {0};

            std::cout << "\n================ STUDENT GRADES ================\n\n";

            std::cout << std::setw(12) << "Student";

            for (int j = 0; j < 4; j++)
                std::cout << std::setw(15) << subjects[j];

            std::cout << std::setw(12) << "Average\n";

            for (int i = 0; i < 5; i++)
            {
                int totalGradePerStudent = 0;

                // DISPLAY STUDENT NAME
                std::cout << std::setw(12) << ("Student " + std::to_string(i + 1));

                for (int j = 0; j < 4; j++)
                {
                    // GET THE GRADE
                    int grade = gradeStorage[i][j];

                    // FOR CALCULATING AVERAGE OF A STUDENT
                    totalGradePerStudent += grade;

                    // ACCUMILATE SUDENT GRADES PER LOOP
                    subjectTotals[j] += grade;

                    // THIS WILL WATCH FOR HIGHEST AND LOWEST GRADE WHILE LOOPING
                    if (grade > highest) highest = grade;
                    if (grade < lowest) lowest = grade;

                    std::cout << std::setw(15) << std::fixed << std::setprecision(2) << "\033[32m" << grade << "%\033[0m";
                }

                // CLACULATE AVERAGE;
                double average = totalGradePerStudent / 4.0;

                // DISPLAY AVERAGE
                std::cout << std::setw(15)
                          << std::fixed << std::setprecision(2)
                          << "\033[32m" << average << "\033[0m" << "\n";
            }

            std::cout << "\n============= SUBJECT AVERAGES =============\n";

            for (int j = 0; j < 4; j++)
            {
                // CALCULATE SUBJECT AVERAGE BASED ON STUDENTS
                double subjectAverage = subjectTotals[j] / 5.0;

                std::cout << subjects[j] << ": "
                          << std::fixed << std::setprecision(2)
                          << "\033[32m" << subjectAverage << "\033[0m\n";
            }

            std::cout << "\n============= CLASS STATISTICS =============\n";
            std::cout << "Highest Grade in Class: " << "\033[32m" << highest << "\033[0m\n";
            std::cout << "Lowest Grade in Class : " << "\033[32m" << lowest << "\033[0m\n";
        }
        else if (choose == 3)
        {
            work = false;
            std::cout << "\033[32mExiting program...\033[0m\n";
        }
        else
        {
            std::cout << "\033[31mInvalid option! Please choose 1, 2, or 3.\033[0m\n";
        }
    }

    return 0;
}