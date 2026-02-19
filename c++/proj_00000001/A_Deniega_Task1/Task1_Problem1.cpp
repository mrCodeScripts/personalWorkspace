// Task1_Problem1.cpp
// Research & Definition of Array in C++
// An array in C++ is a collection of elements of the same data type stored in contiguous memory locations.
// It allows storing multiple values in a single variable and accessing them using an index.

#include <iostream>

int main() {
    std::cout << "Example of an array in C++:" << std::endl;

    // One-dimensional array of integers
    int numbers[5] = {10, 20, 30, 40, 50}; // Array storing 5 integers

    std::cout << "Elements of the array are: ";
    for(int i = 0; i < 5; i++) {
        std::cout << numbers[i] << " "; // Accessing array elements using index
    }
    std::cout << std::endl;

    return 0;
}
