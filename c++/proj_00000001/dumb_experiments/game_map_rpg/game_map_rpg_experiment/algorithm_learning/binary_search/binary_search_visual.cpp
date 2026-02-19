#include <iostream>
#include <vector>
#include <windows.h>
#include <iomanip>
#include <thread>
#include <chrono>
#include <algorithm>

// Replaces system("cls") to prevent flickering
void resetCursor() {
    HANDLE hOut = GetStdHandle(STD_OUTPUT_HANDLE);
    COORD coord = {0, 0};
    SetConsoleCursorPosition(hOut, coord);
}

void searchingDisplay(const std::vector<int> &arr, int left, int right, int mid) {
    resetCursor();
    std::cout << "--- Binary Search Animation ---\n\n";
    for (int i = 0; i < arr.size(); i++) {
        if (i == mid)
            std::cout << "\033[1;93m" << std::setw(3) << arr[i] << "\033[0m"; // Bright Yellow = Mid
        else if (i >= left && i <= right)
            std::cout << "\033[1;31m" << std::setw(3) << arr[i] << "\033[0m"; // Red = Active Range
        else
            std::cout << "\033[1;90m" << std::setw(3) << arr[i] << "\033[0m"; // Gray = Discarded
    }
    std::cout << "\n\nLeft: " << left << " | Mid: " << mid << " | Right: " << right << "    \n";
}

int main() {
    // Enable ANSI colors for Windows 10/11/Server 2026
    HANDLE hOut = GetStdHandle(STD_OUTPUT_HANDLE);
    DWORD dwMode = 0;
    GetConsoleMode(hOut, &dwMode);
    SetConsoleMode(hOut, dwMode | ENABLE_VIRTUAL_TERMINAL_PROCESSING);

    std::vector<int> arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20};
    int target = 15;
    int left = 0, right = arr.size() - 1;

    system("cls"); // Initial clear only

    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        searchingDisplay(arr, left, right, mid);
        
        // Increase sleep to 1500ms (1.5 seconds) to see the logic move
        std::this_thread::sleep_for(std::chrono::milliseconds(1500));

        if (arr[mid] == target) {
            std::cout << "\n\033[1;32mTarget " << target << " found at index " << mid << "!\033[0m\n";
            return 0;
        } else if (arr[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    std::cout << "\nTarget not found.\n";
    return 0;
}

