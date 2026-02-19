#pragma once

#include <string>
#include <vector>
#include "../nlohmann/json.hpp"
#include "../header/Database.h"
#include "../header/PublicUserInfo.h" // your struct

class UserEntity
{
protected:
    Database &USER_ACC_DB;
    Database &USER_SETTINGS_DB;

    std::string firstName;
    std::string lastName;
    std::string username;
    std::string passwordHash;
    std::string passwordSalt;
    std::string uuid;
    std::string userType;
    std::string address;
    int age;
    bool isAuthenticated = false;
    bool isUserLoggedIn = false;
    bool activated = false;

public:
    // Helper functions
    std::string generateUUID(); // generates new UUID
    std::string generateSalt(size_t length = 16);
    std::string hashPassword(const std::string &password, const std::string &salt);

    UserEntity(Database &accDB, Database &settingsDB);
    virtual ~UserEntity() = default;

    // User account operations
    bool login(const std::string &username, const std::string &password);
    bool signup(const std::string &firstName, const std::string &lastName, int age,
                const std::string &username, const std::string &password, const std::string &address = "unknown");

    bool systemAlreadyHasAdmin() const;
    bool isUsernameExist(const std::string &username);
    void loadUserData(const std::string &username);
    void saveUserData();
    void logAction(const std::string &action);

    bool verifyPassword(const std::string &enteredPassword);

    // Setters
    void setPasswordSalt(const std::string &salt);
    void setPasswordHash(const std::string &hash);
    void setActive(bool enabled);

    // Getters
    std::string getUsername() const;
    std::string getFirstname() const;
    std::string getLastname() const;
    int getAge() const;
    std::string getAddress() const;
    std::string getUUID() const; // returns persistent UUID
    std::string getMyUUID() const; // alias for uuid
    bool isLoggedIn() const;

    void changeUsername(std::string username);
    void changeFirstname(std::string firstname);
    void changeLastname(std::string lastname);
    void changeAddress(std::string address);
    void changeAge(int age);

    // User features common for both admin & basic
    std::vector<PublicUserInfo> searchUsers(const std::string &usernameQuery);
    bool deleteAccount(const std::string &targetUsername);
};
