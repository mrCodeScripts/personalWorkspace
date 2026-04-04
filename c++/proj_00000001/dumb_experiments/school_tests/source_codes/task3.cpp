/*
 * Task 3 - C++ Activities: Functions
 * Covers: Average computation, Call by Value, Call by Address/Pointer, Call by Reference
 */

#include <iostream>
#include <string>
using namespace std;

// ============================================================
// ACTIVITY 1: Compute and Evaluate Average Using Functions
// ============================================================
double computeAverage(double s1, double s2, double s3, double s4, double s5) {
    return (s1 + s2 + s3 + s4 + s5) / 5.0;
}

string evaluateResult(double average) {
    if (average >= 75)
        return "PASS";
    else
        return "FAIL";
}

void activity1() {
    cout << "\n=== ACTIVITY 1: Compute and Evaluate Average ===" << endl;
    double s1, s2, s3, s4, s5;
    cout << "Enter 5 scores:" << endl;
    cout << "Score 1: "; cin >> s1;
    cout << "Score 2: "; cin >> s2;
    cout << "Score 3: "; cin >> s3;
    cout << "Score 4: "; cin >> s4;
    cout << "Score 5: "; cin >> s5;

    double avg = computeAverage(s1, s2, s3, s4, s5);
    string result = evaluateResult(avg);

    cout << "\nAverage Score: " << avg << endl;
    cout << "Result: " << result << endl;
}

// ============================================================
// ACTIVITY 2: Call by Value
// ============================================================

// 2a) Modify a Value
void updatedValue(int num) {
    num = num + 15;
    cout << "Inside function, updated value: " << num << endl;
}

// 2b) Attempt to Swap Values (by value - won't actually swap)
void swapByValue(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
    cout << "Inside swapByValue - a: " << a << ", b: " << b << endl;
}

void activity2() {
    cout << "\n=== ACTIVITY 2: Call by Value ===" << endl;

    // 2a
    cout << "\n-- 2a: Modify a Value --" << endl;
    int num = 20;
    cout << "Before function call, num = " << num << endl;
    updatedValue(num);
    cout << "After function call, num = " << num << " (unchanged)" << endl;

    // 2b
    cout << "\n-- 2b: Attempt to Swap Values --" << endl;
    int x = 7, y = 13;
    cout << "Before swap - x: " << x << ", y: " << y << endl;
    swapByValue(x, y);
    cout << "After swap in main - x: " << x << ", y: " << y << " (unchanged)" << endl;
}

// ============================================================
// ACTIVITY 3: Call by Address / Pointer
// ============================================================

// 3a) Modify Value Using Pointer
void changeValuePtr(int *x) {
    *x = *x + 20;
}

// 3b) Swap Using Pointer
void swapByPointer(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void activity3() {
    cout << "\n=== ACTIVITY 3: Call by Address / Pointer ===" << endl;

    // 3a
    cout << "\n-- 3a: Modify Value Using Pointer --" << endl;
    int num = 15;
    cout << "Before: num = " << num << endl;
    changeValuePtr(&num);
    cout << "After changeValuePtr: num = " << num << endl;

    // 3b
    cout << "\n-- 3b: Swap Using Pointer --" << endl;
    int x = 5, y = 10;
    cout << "Before swap - x: " << x << ", y: " << y << endl;
    swapByPointer(&x, &y);
    cout << "After swap - x: " << x << ", y: " << y << endl;
}

// ============================================================
// ACTIVITY 4: Call by Reference
// ============================================================

// 4a) Modify Value Using Reference
void changeValueRef(int &x) {
    x = x + 12;
}

// 4b) Swap Using Reference
void swapByReference(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

void activity4() {
    cout << "\n=== ACTIVITY 4: Call by Reference ===" << endl;

    // 4a
    cout << "\n-- 4a: Modify Value Using Reference --" << endl;
    int number = 9;
    cout << "Before: number = " << number << endl;
    changeValueRef(number);
    cout << "After changeValueRef: number = " << number << endl;

    // 4b
    cout << "\n-- 4b: Swap Using Reference --" << endl;
    int x = 3, y = 8;
    cout << "Before swap - x: " << x << ", y: " << y << endl;
    swapByReference(x, y);
    cout << "After swap - x: " << x << ", y: " << y << endl;
}

// ============================================================
// ACTIVITY 6: Managing Student Information Using Structures
// ============================================================
struct Student {
    string name;
    int age;
    float grade;
};

void activity6() {
    cout << "\n=== ACTIVITY 6: Student Information Using Structures ===" << endl;
    Student s;
    cout << "Enter student name: "; cin.ignore(); getline(cin, s.name);
    cout << "Enter student age: "; cin >> s.age;
    cout << "Enter student grade: "; cin >> s.grade;

    cout << "\n--- Student Record ---" << endl;
    cout << "Name : " << s.name << endl;
    cout << "Age  : " << s.age << endl;
    cout << "Grade: " << s.grade << endl;
}

int main() {
    activity1();
    activity2();
    activity3();
    activity4();
    activity6();
    return 0;
}
