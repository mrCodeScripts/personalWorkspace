#include <iostream>
#include <tuple>
#include <string>
#include <vector>
#include <algorithm>
#include <type_traits>
#include <variant>

int main () {
    std::vector<int> shit = {1, 2, 3, 4, 5};
    std::vector<std::variant<int, bool, std::string, float, double, std::vector<int>>> items = {
        1, 
        true, 
        std::string("shit"),
        1.0f, 
        1.0, 
        shit
    };


    for (auto &i : items) {
        std::visit([](auto&& i){
            if constexpr(std::is_same_v<std::decay_t<decltype(i)>, int>) {

            } else if constexpr(std::is_same_v<std::decay_t<decltype(i)>, std::string>) {

            } else if constexpr(std::is_same_v<std::decay_t<decltype(i)>, std::vector<int>>) {
                auto lambda = [](auto&&... args) {
                    ((std::cout << args << std::endl), ...);
                };

                lambda(i);
            } else if constexpr(std::is_same_v<std::decay_t<decltype(i)>, float>) {

            } else if constexpr(std::is_same_v<std::decay_t<decltype(i)>, double>) {

            } else if constexpr(std::is_same_v<std::decay_t<decltype(i)>, bool>) {

            }
        }, i);
    };



    return 0;
}