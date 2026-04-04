/*
 * Task 4 - Student Record System Using Functions and Structures
 * Demonstrates: Call by Reference, Call by Value, Call by Address (Pointer)
 */

#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

// ============================================================
// STRUCTURE DEFINITION
// ============================================================
struct Student {
    string name;
    string year;
    string course;
    float grades[5];
    float average;
    string status;
};

// ============================================================
// FUNCTION: Input student data using Call by Reference
// ============================================================
void inputStudent(Student &s) {
    cin.ignore();
    cout << "  Name   : "; getline(cin, s.name);
    cout << "  Year   : "; getline(cin, s.year);
    cout << "  Course : "; getline(cin, s.course);
    cout << "  Enter 5 subject grades:" << endl;
    for (int i = 0; i < 5; i++) {
        cout << "    Subject " << (i + 1) << ": ";
        cin >> s.grades[i];
    }
}

// ============================================================
// FUNCTION: Compute average using Call by Value
// ============================================================
float computeAverage(float g1, float g2, float g3, float g4, float g5) {
    return (g1 + g2 + g3 + g4 + g5) / 5.0f;
}

// ============================================================
// FUNCTION: Update average and status using Call by Address (Pointer)
// ============================================================
void updateStudentRecord(Student *s) {
    s->average = computeAverage(s->grades[0], s->grades[1], s->grades[2],
                                s->grades[3], s->grades[4]);
    if (s->average >= 75)
        s->status = "PASS";
    else
        s->status = "FAIL";
}

// ============================================================
// FUNCTION: Display all student records
// ============================================================
void displayRecords(Student students[], int count) {
    cout << "\n";
    cout << "========================================================" << endl;
    cout << "           STUDENT RECORD SYSTEM - RESULTS             " << endl;
    cout << "========================================================" << endl;

    for (int i = 0; i < count; i++) {
        cout << "\nStudent #" << (i + 1) << endl;
        cout << "  Name    : " << students[i].name << endl;
        cout << "  Year    : " << students[i].year << endl;
        cout << "  Course  : " << students[i].course << endl;
        cout << "  Grades  : ";
        for (int j = 0; j < 5; j++) {
            cout << fixed << setprecision(1) << students[i].grades[j];
            if (j < 4) cout << ", ";
        }
        cout << endl;
        cout << "  Average : " << fixed << setprecision(2) << students[i].average << endl;
        cout << "  Status  : " << students[i].status << endl;
        cout << "--------------------------------------------------------" << endl;
    }
}

// ============================================================
// MAIN FUNCTION
// ============================================================
int main() {
    int n;
    cout << "========================================================" << endl;
    cout << "       STUDENT INFORMATION AND AVERAGE COMPUTATION      " << endl;
    cout << "========================================================" << endl;
    cout << "\nHow many students? ";
    cin >> n;

    Student students[n];

    for (int i = 0; i < n; i++) {
        cout << "\n--- Enter details for Student #" << (i + 1) << " ---" << endl;
        inputStudent(students[i]);          // Call by Reference
        updateStudentRecord(&students[i]);  // Call by Address / Pointer
    }

    displayRecords(students, n);

    return 0;
}
