#include <iostream>
#include <vector>

int main () {

    std::vector<int> arr = {1, 2, 3, 6, 8, 2, 5, 9};
    int target = 2;

    int left = 0;
    int right = arr.size() - 1;

    bool targetFound = false;
    int index;
    while (left <= right) {
        int mid = left + ((right - left) / 2);

        if (arr[mid] == target) {
            index = mid;
            break;
        } else if (arr[mid] > target) {
            right = mid - 1;
        } else if (arr[mid] < target) {
            left = mid + 1;
        }
    }

    if (left > right) 
        std::cout << "No target found!" << std::endl;
    else
        std::cout << "Target found at index " << std::to_string(index) << ", number " << arr[index] << std::endl;

    return 0;
}