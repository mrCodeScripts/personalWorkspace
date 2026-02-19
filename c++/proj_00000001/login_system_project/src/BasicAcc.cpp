#include <iostream>
#include "../header/BasicAcc.h"
#include "../header/Database.h"

BasicAcc::BasicAcc(Database &accDB, Database &settingsDB) : UserEntity(accDB, settingsDB)
{
    this->userType = "basic_user";
};

void BasicAcc::showProfile() const {};
bool BasicAcc::changePassword(const std::string &oldPassword, const std::string &newPassword)
{
    return true;
};
void BasicAcc::updateSettings(const nlohmann::json &newSettings) {};
nlohmann::json BasicAcc::loadSettings() const
{
    return this->USER_SETTINGS_DB.getStorage()[this->USER_SETTINGS_DB.getDBName()];
};
std::vector<PublicUserInfo> BasicAcc::viewOtherUsers(const std::string &usernameQuery)
{
    std::vector<PublicUserInfo> users;
    users.push_back(PublicUserInfo("John", "Doe", "johndoe", 18));
    return users;
};