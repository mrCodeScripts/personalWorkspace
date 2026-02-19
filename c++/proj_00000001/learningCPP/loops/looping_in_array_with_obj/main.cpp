#include <iostream>
#include <vector>
#include <string>

struct User {
    std::string username;
    int age;
};

int main () {

    std::vector<User> users = {
        {"John Doe 1", 4},
        {"John Doe 2", 4},
        {"John Doe 3", 4},
        {"John Doe 5", 4},
        {"John Doe 6", 4},
        {"John Doe 7", 4},
    };

    for (auto it = users.begin(); it != users.end(); ++it) {
        std::string username1 = it->username;
        std::string username2 = (*it).username;
        std::cout << "Username 1: " << username1 << std::endl;
        std::cout << "Username 2: " << username2 << std::endl;
    }

    return 0;
}