#pragma once

#include <string>
#include <vector>
struct PublicUserInfo {
    std::string firstName;
    std::string lastName;
    std::string username;
    int age;
    bool isActive = false;

    PublicUserInfo(const std::string firstName, const std::string lastName, const std::string username, const int age) : firstName(firstName), lastName(lastName), username(username), age(age) {};
};