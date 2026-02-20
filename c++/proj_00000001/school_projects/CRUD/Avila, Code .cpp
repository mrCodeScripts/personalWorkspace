#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main()
{
    const int MAX_STUDENTS = 100;
    const int SUBJECTS = 3;
    const int PASS_MARK = 75;

    // NEW SUBJECT NAMES
    string subjectNames[SUBJECTS] = {"Programming", "CSS", "Math"};

    string names[MAX_STUDENTS];
    int grades[MAX_STUDENTS][SUBJECTS];
    int studentCount;

    // Step 1: Student Registration
    do
    {
        cout << "Enter number of students to register (minimum of 5): ";
        cin >> studentCount;
    } while (studentCount < 5 || studentCount > MAX_STUDENTS);

    cin.ignore();

    for (int i = 0; i < studentCount; ++i)
    {
        cout << "\nEnter name of student " << (i + 1) << ": ";
        getline(cin, names[i]);

        for (int j = 0; j < SUBJECTS; ++j)
        {
            cout << "Enter grade for " << subjectNames[j] << ": ";
            cin >> grades[i][j];
        }
        cin.ignore();
    }

    int choice;

    do
    {
        cout << "\n==============================";
        cout << "\n STUDENT RECORD MANAGEMENT SYSTEM";
        cout << "\n==============================";
        cout << "\n1. Display Records";
        cout << "\n2. Insert New Record";
        cout << "\n3. Update Record";
        cout << "\n4. Delete Record";
        cout << "\n5. Search Record";
        cout << "\n6. Exit";
        cout << "\nEnter your choice: ";
        cin >> choice;
        cin.ignore();

        switch (choice)
        {

        case 1:
        { // Display Records
            cout << "\n-----------------------------------------------------------------------\n";
            cout << left << setw(5) << "No."
                 << setw(20) << "Name";

            for (int j = 0; j < SUBJECTS; ++j)
            {
                cout << setw(15) << subjectNames[j]
                     << setw(10) << "Status";
            }

            cout << endl;
            cout << "-----------------------------------------------------------------------\n";

            for (int i = 0; i < studentCount; ++i)
            {
                cout << left << setw(5) << (i + 1)
                     << setw(20) << names[i];

                for (int j = 0; j < SUBJECTS; ++j)
                {
                    string status = (grades[i][j] >= PASS_MARK) ? "Passed" : "Failed";

                    cout << setw(15) << grades[i][j]
                         << setw(10) << status;
                }

                cout << endl;
            }

            cout << "\nTotal students: " << studentCount << endl;
            break;
        }

        case 2:
        { // Insert Record
            if (studentCount >= MAX_STUDENTS)
            {
                cout << "\nCannot insert; maximum capacity reached.\n";
                break;
            }

            int pos;

            cout << "\nEnter position to insert new record (1 to "
                 << (studentCount + 1) << "): ";
            cin >> pos;
            cin.ignore();

            if (pos < 1 || pos > studentCount + 1)
            {
                cout << "\nInvalid position!\n";
                break;
            }

            for (int i = studentCount; i >= pos; --i)
            {
                names[i] = names[i - 1];

                for (int j = 0; j < SUBJECTS; ++j)
                {
                    grades[i][j] = grades[i - 1][j];
                }
            }

            cout << "Enter new student name: ";
            getline(cin, names[pos - 1]);

            for (int j = 0; j < SUBJECTS; ++j)
            {
                cout << "Enter grade for " << subjectNames[j] << ": ";
                cin >> grades[pos - 1][j];
            }

            cin.ignore();

            studentCount++;

            cout << "\nRecord inserted successfully!\n";
            break;
        }

        case 3:
        { // Update Record
            int num;

            cout << "\nEnter student number to update (1 to "
                 << studentCount << "): ";
            cin >> num;
            cin.ignore();

            if (num < 1 || num > studentCount)
            {
                cout << "\nInvalid student number!\n";
                break;
            }

            cout << "\nWhat do you want to update?\n";
            cout << "1. Name\n2. Grades\nEnter choice: ";

            int updateChoice;
            cin >> updateChoice;
            cin.ignore();

            if (updateChoice == 1)
            {
                cout << "Enter new name: ";
                getline(cin, names[num - 1]);

                cout << "\nName updated successfully!\n";
            }
            else if (updateChoice == 2)
            {
                for (int j = 0; j < SUBJECTS; ++j)
                {
                    cout << "Enter new grade for " << subjectNames[j] << ": ";
                    cin >> grades[num - 1][j];
                }

                cin.ignore();

                cout << "\nGrades updated successfully!\n";
            }
            else
            {
                cout << "\nInvalid choice!\n";
            }

            break;
        }

        case 4:
        { // Delete Record
            int num;

            cout << "\nEnter student number to delete (1 to "
                 << studentCount << "): ";
            cin >> num;
            cin.ignore();

            if (num < 1 || num > studentCount)
            {
                cout << "\nInvalid student number!\n";
                break;
            }

            for (int i = num - 1; i < studentCount - 1; ++i)
            {
                names[i] = names[i + 1];

                for (int j = 0; j < SUBJECTS; ++j)
                {
                    grades[i][j] = grades[i + 1][j];
                }
            }

            studentCount--;

            cout << "\nRecord deleted successfully!\n";
            break;
        }

        case 5:
        { // Search Record
            string searchName;

            cout << "\nEnter name to search: ";
            getline(cin, searchName);

            bool found = false;

            for (int i = 0; i < studentCount; ++i)
            {
                if (names[i] == searchName)
                {
                    cout << "\nRecord Found!\n";
                    cout << "Name: " << names[i] << endl;

                    for (int j = 0; j < SUBJECTS; ++j)
                    {
                        cout << subjectNames[j]
                             << ": " << grades[i][j] << endl;
                    }

                    found = true;
                    break;
                }
            }

            if (!found)
            {
                cout << "\nRecord not found!\n";
            }

            break;
        }

        case 6:
        { // Exit
            cout << "\nExiting program...\n";
            break;
        }

        default:
            cout << "\nInvalid choice!\n";
        }

    } while (choice != 6);

    return 0;
}
