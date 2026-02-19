// Task1_Problem2.cpp
#include <iostream>

int main() {
    // One-Dimensional Array Example
    // Stores and displays marks of 5 students and calculates the average
    int markSize = 5;
    int marks[markSize]; // Array to store marks
    int sum = 0;
    double average;

    std::cout << "Enter marks for 5 students: " << std::endl;
    for(int i = 0; i < 5; i++) {
        std::cout << "Student " << i+1 << ": ";
        std::cin >> marks[i];
        sum += marks[i]; // Add marks to sum
    }

    average = sum / (double) markSize; // Calculate average

    std::cout << "\nMarks of 5 students: ";
    for(int i = 0; i < 5; i++) {
        std::cout << marks[i] << " ";
    }
    std::cout << "\nAverage marks: " << average << std::endl;
    return 0;
}
