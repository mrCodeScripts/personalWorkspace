// Task1_Problem3.cpp
#include <iostream>
using namespace std;

int main() {
    // Two-Dimensional Array Example
    // Creates a 2x3 matrix, displays it, and calculates sum of all elements

    int matrix[2][3]; // 2 rows, 3 columns
    int sum = 0;

    cout << "Enter elements of a 2x3 matrix: " << endl;
    for(int i = 0; i < 2; i++) {
        for(int j = 0; j < 3; j++) {
            cout << "Element [" << i << "][" << j << "]: ";
            cin >> matrix[i][j];
            sum += matrix[i][j]; // Add element to sum
        }
    }

    cout << "\nThe matrix is: " << endl;
    for(int i = 0; i < 2; i++) {
        for(int j = 0; j < 3; j++) {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }

    cout << "\nSum of all elements: " << sum << endl;

    return 0;
}
