#include <iostream>
#include <vector>
#include <thread>
#include <chrono>

void printArray(const std::vector<int>& arr, int left, int mid, int right) {
    for (int i = 0; i < arr.size(); i++) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;

    for (int i = 0; i < arr.size(); i++) {
        if (i == left) std::cout << "L ";
        else if (i == mid) std::cout << "M ";
        else if (i == right) std::cout << "R ";
        else std::cout << "  ";
    }
    std::cout << "\n\n";
    std::this_thread::sleep_for(std::chrono::milliseconds(800));
}

int main() {
    std::vector<int> arr = {1,3,5,7,9,11,13,15,17,19};
    int target = 11;

    int left = 0;
    int right = arr.size() - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        printArray(arr, left, mid, right);

        if (arr[mid] == target) {
            std::cout << "Found target " << target << " at index " << mid << "!\n";
            break;
        }
        else if (arr[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }

    if (left > right) {
        std::cout << "Target not found!\n";
    }

    return 0;
}
