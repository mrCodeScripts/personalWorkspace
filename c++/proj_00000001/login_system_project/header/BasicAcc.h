#pragma once

#include "UserEntity.h"
#include "PublicUserInfo.h"

class BasicAcc : public UserEntity
{
public:
    BasicAcc(Database &accDB, Database &settingsDB);

    // Profile UI
    void showProfile() const;

    // Self account management
    bool changePassword(const std::string &oldPassword, const std::string &newPassword);
    void updateSettings(const nlohmann::json &newSettings);
    nlohmann::json loadSettings() const;

    // Lookup others (restricted view)
    std::vector<PublicUserInfo> viewOtherUsers(const std::string &usernameQuery);
};
