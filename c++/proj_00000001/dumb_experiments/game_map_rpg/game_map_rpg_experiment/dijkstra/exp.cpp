#include <iostream>
#include <vector>

int main () {

    // std::vector<int> innerMap(20, INT_MAX);
    // std::vector<std::vector<int>> map(20, innerMap);
    std::vector<std::vector<int>> map(10, std::vector<int>(10, INT_MAX));


    for (int i = 0; i < 10; i++) {
        for (int j = 0; j < 10; j++) {
            std::cout << std::to_string(map[i][j]);
        }
        std::cout << std::endl;
    }

    return 0;
}