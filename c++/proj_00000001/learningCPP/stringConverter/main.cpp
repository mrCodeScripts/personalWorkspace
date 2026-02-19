#include <iostream>
#include <vector>
#include <string>

/**
 * 1. Receive the string.
 * 2. Loop inside the string.
 * 3. For every loop, get the char of the string,
 * cast it into unsigned char, transform that char into lower (std::lower needs unsigned char), then finaly cast it back to char.
 * 4. Assign or add the new char to the newStr.
 * 5. Return the newStr (lowered).
 */
std::string toLower (std::string str) {
    std::string newStr;
    for (char &c : str) {
        newStr += static_cast<char>(std::tolower(static_cast<unsigned char>(c)));
    }
    return newStr;
}

std::vector<std::string> filterer (std::vector<std::string> &data, std::string query) {
    std::vector<std::string> result;
    query = toLower(query);
    for (auto &i : data) {
        if (toLower(i).find(query) != std::string::npos) {
            result.push_back(i);
        }
    }
    return result;
}

// std::vector<std::string> filterer(std::vector<std::string> &data, std::string query) {
//     std::vector<std::string> result;
//     query = toLower(query);

//     for (auto &i : data) {
//         if (toLower(i).find(query) != std::string::npos) {
//             result.push_back(i);
//         }
//     }
//     return result;
// }

int main () {
    std::vector<std::string> data = {
        "bullshit",
        "dog",
        "bulldog",
        "shitbull",
        "bulllll",
    };

    // std::string myName = toLower("JayraldDeniegA");
    // std::cout << myName;

    std::vector<std::string> result = filterer(data, "bull");

    for (auto &i : result) {
        std::cout << i << std::endl;
    }

    return 0;
}