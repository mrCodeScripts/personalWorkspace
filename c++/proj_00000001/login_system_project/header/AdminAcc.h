#pragma once

#include <vector>
#include "BasicAcc.h"

class AdminAcc : public UserEntity
{
protected:
    std::vector<UserEntity*> systemUsers;  // editable user objects
    void loadAllUsersFromDB();

public:
    AdminAcc(Database &accDB, Database &settingsDB);
    ~AdminAcc();

    // User management
    bool addUser(const std::string& username, const std::string& password);
    bool deleteUser(const std::string& username);
    bool resetUserPassword(const std::string& username, const std::string& newPassword);
    bool setUserStatus(const std::string& username, int enabled); // disable/enable

    // Search & filter
    std::vector<UserEntity*> findUsers(const std::string& usernameQuery);
    UserEntity* getUser(const std::string& username);

    // Logs & stats
    void viewAllActivityLogs() const;
    size_t getTotalUsers() const;
    std::vector<UserEntity*> getMostActiveUsers(size_t limit) const;
    std::vector<UserEntity*> getAllUsers();
    std::string registeredUserType(std::string username);

    // Admin-only UI features
    void showAllUsersTable() const;
};
