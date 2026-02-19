#include <iostream>
#include "../header/UserEntity.h"
#include "../header/AdminAcc.h"
#include "../header/Database.h"
#include "../header/uuid_gen.h"

AdminAcc::AdminAcc(Database &USER_ACC_DB, Database &USER_SETTINGS_DB) : UserEntity(USER_ACC_DB, USER_SETTINGS_DB) {
    this->userType = "admin";
    loadAllUsersFromDB();
};
AdminAcc::~AdminAcc() {
    for (auto user : this->systemUsers) {
        delete user;
    }
    systemUsers.clear();
}
void AdminAcc::loadAllUsersFromDB() {
    systemUsers.clear();
    USER_ACC_DB.load();
    auto &users = USER_ACC_DB.getStorage()[USER_ACC_DB.getDBName()];

    for (auto &userJson : users) {
        // Skip if user is admin, only load basic users
        if (userJson.contains("userType") && userJson["userType"] == "basic_user") {
            UserEntity* basicUser = new BasicAcc(USER_ACC_DB, USER_SETTINGS_DB);

            // Load data into BasicAcc
            basicUser->loadUserData(userJson["username"]);
            systemUsers.push_back(basicUser);
        }
    }
};
std::vector<UserEntity*> AdminAcc::getAllUsers() {
    // Reload from DB each time to stay updated
    this->loadAllUsersFromDB();
    return this->systemUsers;
}

bool AdminAcc::addUser(const std::string &username, const std::string &password) {
    // Check if username exists
    if (this->isUsernameExist(username)) {
        std::cerr << "Username already exists!\n";
        return false;
    }

    // Create a new BasicAcc and sign it up
    BasicAcc* newUser = new BasicAcc(USER_ACC_DB, USER_SETTINGS_DB);
    newUser->signup("Unknown", "Unknown", 0, username, password); // default profile

    // Add to admin's systemUsers
    systemUsers.push_back(newUser);

    std::cout << "User added: " << username << "\n";
    return true;
}


bool AdminAcc::deleteUser(const std::string &username) {
    USER_ACC_DB.load();
    auto &users = USER_ACC_DB.getStorage()[USER_ACC_DB.getDBName()];

    // Find user in DB and remove
    for (auto it = users.begin(); it != users.end(); ++it) {
        if ((*it)["username"] == username) {
            users.erase(it);
            USER_ACC_DB.save();
            std::cout << "User deleted: " << username << "\n";
            break;
        }
    }

    // Remove from systemUsers vector
    for (auto it = systemUsers.begin(); it != systemUsers.end(); ++it) {
        if ((*it)->getUsername() == username) {
            delete *it; // free memory
            systemUsers.erase(it);
            return true;
        }
    }

    std::cerr << "User not found: " << username << "\n";
    return false;
}


bool AdminAcc::resetUserPassword(const std::string &username, const std::string &newPassword) {
    USER_ACC_DB.load();
    auto &users = USER_ACC_DB.getStorage()[USER_ACC_DB.getDBName()];

    for (auto &user : users) {
        if (user["username"] == username) {
            std::string salt = this->generateSalt();
            std::string hash = this->hashPassword(newPassword, salt);
            user["passwordSalt"] = salt;
            user["passwordHash"] = hash;
            USER_ACC_DB.save();
            std::cout << "Password reset for: " << username << "\n";

            // Update in-memory object too
            for (auto u : systemUsers) {
                if (u->getUsername() == username) {
                    u->setPasswordSalt(salt);
                    u->setPasswordHash(hash);
                    break;
                }
            }
            return true;
        }
    }

    std::cerr << "User not found: " << username << "\n";
    return false;
}


bool AdminAcc::setUserStatus(const std::string &username, int enabled) {
    USER_ACC_DB.load();
    auto &users = USER_ACC_DB.getStorage()[USER_ACC_DB.getDBName()];

    for (auto &user : users) {
        if (user["username"] == username) {
            user["isActive"] = enabled;
            USER_ACC_DB.save();
            std::cout << "User " << username << " is now " << (enabled ? "enabled" : "disabled") << "\n";

            // Update in-memory object too
            for (auto u : systemUsers) {
                if (u->getUsername() == username) {
                    u->setActive(enabled);
                    break;
                }
            }

            return true;
        }
    }

    std::cerr << "User not found: " << username << "\n";
    return false;
}
std::vector<UserEntity*> AdminAcc::findUsers(const std::string &usernameQuery) {
    UserEntity* basicUser = new BasicAcc(this->USER_ACC_DB, this->USER_SETTINGS_DB);
    std::vector<UserEntity*> accounts;
    accounts.push_back(basicUser);
    return accounts;
};




// has not been defined yet
UserEntity* AdminAcc::getUser(const std::string &username) {
    return (new BasicAcc(this->USER_ACC_DB, this->USER_SETTINGS_DB));
};

void AdminAcc::viewAllActivityLogs() const {};
size_t AdminAcc::getTotalUsers() const {
    size_t i = 10;
    return i;
};
std::vector<UserEntity*> AdminAcc::getMostActiveUsers(size_t limit) const {
    std::vector<UserEntity*> users;
    users.push_back(new BasicAcc(this->USER_ACC_DB, this->USER_SETTINGS_DB));
    return users;
};
std::string AdminAcc::registeredUserType(std::string username) {
    // Load users
    this->USER_ACC_DB.load();
    // store users on memory
    auto &users = this->USER_ACC_DB.getStorage()[this->USER_ACC_DB.getDBName()];
    // loop inside the stored users on memory
    for (auto &user : users)
    {
        if (user.contains("user_type") && user["user_type"] == "admin" && username == user["username"])
        {
            return "admin";
        }
    }
    // return false if theres still no admin
    return "basic_user";
};
void AdminAcc::showAllUsersTable() const {};








