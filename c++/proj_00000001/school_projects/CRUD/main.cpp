#include <iostream>
#include <iomanip>
#include <string>
#include <limits>

int main()
{
    const int MAX = 100;
    const int SUBJECTS = 3;
    const int PASS = 75;

    std::string names[MAX];
    int grades[MAX][SUBJECTS];

    int count = 0;
    int choice;

    while (true)
    {
        std::cout << "Enter number of students (minimum 5): ";
        std::cin >> count;

        if (std::cin.fail() || count < 5 || count > MAX)
        {
            std::cout << "Invalid input. Enter a number between 5 and " << MAX << ".\n";

            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        }
        else
        {
            std::cin.ignore();
            break;
        }
    }

    for (int i = 0; i < count; i++)
    {
        std::cout << "\nStudent " << i + 1 << std::endl;

        std::cout << "Name: ";
        std::getline(std::cin, names[i]);

        for (int j = 0; j < SUBJECTS; j++)
        {

            while (true)
            {
                std::cout << "Grade " << j + 1 << " (0-100): ";
                std::cin >> grades[i][j];

                if (std::cin.fail() || grades[i][j] < 0 || grades[i][j] > 100)
                {
                    std::cout << "Invalid grade. Enter 0 to 100 only.\n";

                    std::cin.clear();
                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                }
                else
                {
                    break;
                }
            }
        }

        std::cin.ignore();
    }

    do
    {
        std::cout << "\n==============================\n";
        std::cout << "   STUDENT RECORD SYSTEM\n";
        std::cout << "==============================\n";
        std::cout << "1. Display Records\n";
        std::cout << "2. Insert New Record\n";
        std::cout << "3. Update Record\n";
        std::cout << "4. Delete Record\n";
        std::cout << "5. Search Record\n";
        std::cout << "6. Exit\n";

        // Menu Input
        while (true)
        {
            std::cout << "Enter choice: ";
            std::cin >> choice;

            if (std::cin.fail() || choice < 1 || choice > 6)
            {
                std::cout << "Invalid choice. Enter 1-6 only.\n";

                std::cin.clear();
                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
            }
            else
            {
                std::cin.ignore();
                break;
            }
        }

        if (choice == 1)
        {
            int noWidth = 2;   // No
            int nameWidth = 4; // Name
            int gradeWidth[SUBJECTS];
            int statusWidth = 6; // Status

            for (int j = 0; j < SUBJECTS; j++)
            {
                gradeWidth[j] = 4; // SubX
            }

            for (int i = 0; i < count; i++)
            {

                if (names[i].length() > nameWidth)
                    nameWidth = names[i].length();

                for (int j = 0; j < SUBJECTS; j++)
                {

                    int g = grades[i][j];
                    int digits = 1;

                    if (g >= 10)
                        digits = 2;
                    if (g >= 100)
                        digits = 3;

                    if (digits > gradeWidth[j])
                        gradeWidth[j] = digits;
                }
            }

            noWidth += 2;
            nameWidth += 2;
            statusWidth += 2;

            for (int j = 0; j < SUBJECTS; j++)
                gradeWidth[j] += 2;

            auto printLine = [&](char left, char mid, char right)
            {
                std::cout << left;

                std::cout << std::string(noWidth, '-');
                std::cout << mid;

                std::cout << std::string(nameWidth, '-');
                std::cout << mid;

                for (int j = 0; j < SUBJECTS; j++)
                {

                    std::cout << std::string(gradeWidth[j], '-');
                    std::cout << mid;

                    std::cout << std::string(statusWidth, '-');

                    if (j < SUBJECTS - 1)
                        std::cout << mid;
                }

                std::cout << right << std::endl;
            };

            printLine('+', '+', '+');

            std::cout << "|";
            std::cout << std::left << std::setw(noWidth) << " No";
            std::cout << "|";
            std::cout << std::setw(nameWidth) << " Name";

            for (int j = 0; j < SUBJECTS; j++)
            {

                std::cout << "|";
                std::cout << std::setw(gradeWidth[j]) << (" Sub" + std::to_string(j + 1));
                std::cout << "|";
                std::cout << std::setw(statusWidth) << " Status";
            }

            std::cout << "|" << std::endl;

            printLine('+', '+', '+');
            for (int i = 0; i < count; i++)
            {

                std::cout << "|";
                std::cout << std::left << std::setw(noWidth) << (" " + std::to_string(i + 1));
                std::cout << "|";
                std::cout << std::setw(nameWidth) << (" " + names[i]);

                for (int j = 0; j < SUBJECTS; j++)
                {

                    std::cout << "|";
                    std::cout << std::setw(gradeWidth[j]) << (" " + std::to_string(grades[i][j]));
                    std::cout << "|";

                    if (grades[i][j] >= PASS)
                        std::cout << std::setw(statusWidth) << " Passed";
                    else
                        std::cout << std::setw(statusWidth) << " Failed";
                }

                std::cout << "|" << std::endl;
            }

            printLine('+', '+', '+');
            std::cout << "Total Students: " << count << std::endl;
        }

        else if (choice == 2)
        {

            if (count >= MAX)
            {
                std::cout << "Record full!\n";
                continue;
            }

            int pos;

            while (true)
            {
                std::cout << "Enter position (1-" << count + 1 << "): ";
                std::cin >> pos;

                if (std::cin.fail() || pos < 1 || pos > count + 1)
                {
                    std::cout << "Invalid position.\n";

                    std::cin.clear();
                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                }
                else
                {
                    std::cin.ignore();
                    break;
                }
            }

            for (int i = count; i >= pos; i--)
            {
                names[i] = names[i - 1];

                for (int j = 0; j < SUBJECTS; j++)
                {
                    grades[i][j] = grades[i - 1][j];
                }
            }

            std::cout << "Enter Name: ";
            std::getline(std::cin, names[pos - 1]);

            for (int j = 0; j < SUBJECTS; j++)
            {

                while (true)
                {
                    std::cout << "Grade " << j + 1 << " (0-100): ";
                    std::cin >> grades[pos - 1][j];

                    if (std::cin.fail() || grades[pos - 1][j] < 0 || grades[pos - 1][j] > 100)
                    {

                        std::cout << "Invalid grade.\n";

                        std::cin.clear();
                        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                    }
                    else
                    {
                        break;
                    }
                }
            }

            std::cin.ignore();

            count++;
            std::cout << "Record inserted!\n";
        }
        else if (choice == 3)
        {

            int num;

            while (true)
            {
                std::cout << "Enter student number: ";
                std::cin >> num;

                if (std::cin.fail() || num < 1 || num > count)
                {

                    std::cout << "Invalid student number.\n";

                    std::cin.clear();
                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                }
                else
                {
                    std::cin.ignore();
                    break;
                }
            }

            int opt;

            while (true)
            {
                std::cout << "1. Update Name\n";
                std::cout << "2. Update Grades\n";
                std::cout << "Choose: ";

                std::cin >> opt;

                if (std::cin.fail() || opt < 1 || opt > 2)
                {

                    std::cout << "Invalid choice.\n";

                    std::cin.clear();
                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                }
                else
                {
                    std::cin.ignore();
                    break;
                }
            }

            if (opt == 1)
            {

                std::cout << "Enter new name: ";
                std::getline(std::cin, names[num - 1]);
            }

            else
            {

                for (int j = 0; j < SUBJECTS; j++)
                {

                    while (true)
                    {

                        std::cout << "New Grade " << j + 1 << ": ";
                        std::cin >> grades[num - 1][j];

                        if (std::cin.fail() || grades[num - 1][j] < 0 || grades[num - 1][j] > 100)
                        {

                            std::cout << "Invalid grade.\n";

                            std::cin.clear();
                            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                        }
                        else
                        {
                            break;
                        }
                    }
                }

                std::cin.ignore();
            }

            std::cout << "Record updated!\n";
        }

        else if (choice == 4)
        {

            int num;

            while (true)
            {

                std::cout << "Enter student number to delete: ";
                std::cin >> num;

                if (std::cin.fail() || num < 1 || num > count)
                {

                    std::cout << "Invalid number.\n";

                    std::cin.clear();
                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                }
                else
                {
                    break;
                }
            }

            for (int i = num - 1; i < count - 1; i++)
            {

                names[i] = names[i + 1];

                for (int j = 0; j < SUBJECTS; j++)
                {
                    grades[i][j] = grades[i + 1][j];
                }
            }

            count--;

            std::cout << "Record deleted!\n";
        }

        else if (choice == 5)
        {

            std::string key;
            bool found = false;

            std::cout << "Enter name to search: ";
            std::getline(std::cin, key);

            for (int i = 0; i < count; i++)
            {

                if (names[i] == key)
                {

                    found = true;

                    std::cout << "\nName: " << names[i] << std::endl;

                    for (int j = 0; j < SUBJECTS; j++)
                    {

                        std::cout << "Subject " << j + 1 << ": " << grades[i][j];

                        if (grades[i][j] >= PASS)
                            std::cout << " (Passed)";
                        else
                            std::cout << " (Failed)";

                        std::cout << std::endl;
                    }

                    break;
                }
            }

            if (!found)
            {
                std::cout << "Record not found!\n";
            }
        }

        else if (choice == 6)
        {

            std::cout << "Goodbye!\n";
        }

    } while (choice != 6);

    return 0;
}
