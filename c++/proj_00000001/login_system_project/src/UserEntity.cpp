#include <iostream>
#include "../header/UserEntity.h"
#include "../header/PublicUserInfo.h"
#include "../header/uuid_gen.h" // your UUID generator
#include <sstream>
#include <random>
#include <iomanip>
#include <stdexcept>

UserEntity::UserEntity(Database &USER_ACC_DB, Database &USER_SETTINGS_DB)
    : USER_ACC_DB(USER_ACC_DB), USER_SETTINGS_DB(USER_SETTINGS_DB) {}

// -------------------- Helper functions --------------------

std::string UserEntity::generateUUID()
{
    /**
     * This will generate new UUID only if uuid is empty (by
     * which will always do, because initially the uuid is empty).
     */
    if (this->uuid.empty())
    {
        this->uuid = MyUUID::generate(); // from uuid_gen.h
    }
    return this->uuid;
}

/**
 * Salt generator for password hashing (password + salt = hashedPassword).
 */
std::string UserEntity::generateSalt(size_t length)
{
    const char charset[] =
        "0123456789"
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        "abcdefghijklmnopqrstuvwxyz"
        "!@#$%^&*()_+-=[]{}|;:,.<>?";
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> dist(0, sizeof(charset) - 2);
    std::string salt;
    salt.reserve(length);
    for (size_t i = 0; i < length; ++i)
    {
        salt += charset[dist(gen)];
    }
    return salt;
}

/**
 * This is where password are hashed using the salt.
 */
std::string UserEntity::hashPassword(
    const std::string &password, 
    const std::string &salt
)
{
    unsigned int hash = 0xABCDEF;
    for (size_t i = 0; i < password.size(); ++i)
    {
        hash = (hash * 31) ^ static_cast<unsigned char>(password[i]);
        hash ^= (static_cast<unsigned char>(salt[i % salt.size()]) << 5);
    }
    std::ostringstream oss;
    oss << std::hex << std::setw(8) << std::setfill('0') << hash;
    return oss.str();
}

/**
 * Verifies password using the stored hash and hashed password
 * of the user from the database.
 */
bool UserEntity::verifyPassword(const std::string &enteredPassword)
{
    return (this->hashPassword(enteredPassword, this->passwordSalt) == this->passwordHash);
}

// -------------------- Database functions --------------------
/**
 * This will search if the username is already used and
 * is already registered in the database.
 */
bool UserEntity::isUsernameExist(const std::string &username)
{
    // Load the users from the database.
    USER_ACC_DB.load();

    // Get the JSON via key (DB_NAME)
    auto &users = USER_ACC_DB.getStorage()[USER_ACC_DB.getDBName()];

    // Loop inside the JSON and return true if existing username is
    // equal to the inputed username.
    for (auto &user : users)
        if (user["username"] == username)
            return true;
    // return false if not.
    return false;
}

/**
 * This will load user data from the database
 */
void UserEntity::loadUserData(const std::string &username)
{
    // Load user from the database.
    this->USER_ACC_DB.load();

    // Get the users JSON via key (DB_NAME)
    auto &users = this->USER_ACC_DB.getStorage()[this->USER_ACC_DB.getDBName()];

    // Loop inside the JSON and find the account via username
    for (auto &user : users)
    {
        // if account is found, set the data of the account (any update
        // will be applied).
        if (user["username"] == username)
        {
            this->username = user["username"];
            this->passwordHash = user["passwordHash"];
            this->passwordSalt = user["passwordSalt"];
            this->firstName = user["firstName"];
            this->lastName = user["lastName"];
            this->userType = user["user_type"];
            this->uuid = user["uuid"];
            this->age = user["age"];
            this->address = user["address"];
            this->isAuthenticated = true;
            return;
        }
    }
    // throw std::runtime_error("User not found in DB");
}

/**
 * This will save current user data from memory to the database.
 */
void UserEntity::saveUserData()
{
    // Load users from the database first, to avoid data loss (appending
    // data in this system to the JSON.txt is not applicable, the data
    // must be loaded first -> append in memory -> then store back the
    // data to the database).
    this->USER_ACC_DB.load();

    // Get the users JSON via key (DB_NAME)
    auto &users = this->USER_ACC_DB.getStorage()[this->USER_ACC_DB.getDBName()];

    // Prepare a new JSON data.
    nlohmann::json newUser = {
        {"address", this->address},
        {"username", this->username},
        {"passwordHash", this->passwordHash},
        {"passwordSalt", this->passwordSalt},
        {"uuid", this->uuid},
        {"firstName", this->firstName},
        {"lastName", this->lastName},
        {"user_type", this->userType},
        {"age", this->age},
        {"isActive", this->activated}};

    // Remove old user if exists
    // The old version of this account will be removed before
    // inserting the new data with the new account data.
    for (auto it = users.begin(); it != users.end(); ++it)
    {
        if ((*it)["username"] == this->username)
        {
            users.erase(it);
            break;
        }
    }

    // After deleting the existing old account of the
    // account, and only then we can push the new data
    // to existing user database on memory.
    users.push_back(newUser);
    // and then we can push and save it to the JSON.txt
    // to store it and save it as database.
    this->USER_ACC_DB.save();
}

void UserEntity::logAction(const std::string &action)
{
    // Optional logging: implement if needed
}

// -------------------- Login / Signup --------------------
/**
 * Used for loggin in the current user account
 */
bool UserEntity::login(
    const std::string &username, 
    const std::string &password
)
{
    // Load user data
    this->USER_ACC_DB.load();

    // check if this username exist
    if (!this->isUsernameExist(username))
    {
        return false;
    }

    // load user data if username does exist
    // and store it on this current object on memory
    this->loadUserData(username);

    // verify password
    if (!this->verifyPassword(password))
    {
        return false;
    }

    // Set proper security mesures
    isAuthenticated = true;
    isUserLoggedIn = true;

    // logAction("User logged in"); // optional
    return true;
}

/**
 * Used for registering a user.
 */
bool UserEntity::signup(const std::string &firstName, 
    const std::string &lastName, 
    int age, 
    const std::string &username, 
    const std::string &password, 
    const std::string &address
)
{
    // check if username is already used in the database.
    if (this->isUsernameExist(username))
    {
        std::cerr << "Username already taken!" << std::endl;
        return false;
    }

    // set username on current object in memory.
    this->username = username;
    // set firstname on current object in memory.
    this->firstName = firstName;
    // set lastname on current object in memory.
    this->lastName = lastName;
    // set age on current object in memory.
    this->age = age;
    // set address on current object in memory.
    this->address = address;
    // generate and set uuid on current object in memory.
    this->uuid = generateUUID();
    // generate and set salt on current object in memory.
    this->passwordSalt = generateSalt();
    // generate and set hashed password (salt + inputed password) on current object memory.
    this->passwordHash = hashPassword(password, this->passwordSalt);
    // set user type (admin if theres still no admin in the database, else basic_user).
    this->userType = this->systemAlreadyHasAdmin() ? "basic_user" : "admin";

    // save user data (loads users, store the loaded user on memory, append the newly created
    // account, convert the data into JSON, then push back and store the new JSON text to the
    // JSON.txt file as database).
    this->saveUserData();

    // set user as logged in.
    isUserLoggedIn = true;
    // set user as authenticated.
    isAuthenticated = true;

    // set notif successful login
    std::cout << "Signup successful! Welcome, " << username << std::endl;

    // logAction("User signed up"); // optional
    return true;
}

bool UserEntity::systemAlreadyHasAdmin() const
{
    // Load users
    this->USER_ACC_DB.load();
    // store users on memory
    auto &users = this->USER_ACC_DB.getStorage()[this->USER_ACC_DB.getDBName()];
    // loop inside the stored users on memory
    for (auto &user : users)
    {
        // return true if theres already an admin
        if (user.contains("user_type") && user["user_type"] == "admin")
        {
            return true;
        }
    }
    // return false if theres still no admin
    return false;
}

// -------------------- Getters / Setters --------------------

// get the Username
std::string UserEntity::getUsername() const { return username; }
std::string UserEntity::getFirstname() const
{
    return this->firstName;
};
// get the Lastname
std::string UserEntity::getLastname() const
{
    return this->lastName;
};
// get the Age
int UserEntity::getAge() const
{
    return this->age;
};
// get the address
std::string UserEntity::getAddress() const
{
    return this->address;
};
// get the UUID
std::string UserEntity::getUUID() const { return uuid; }



// get the UUID
std::string UserEntity::getMyUUID() const { return uuid; }
// find if user is logged in

// indentify the user is logged in or not
bool UserEntity::isLoggedIn() const { return isUserLoggedIn; }


// set password salt of the current user (to access outside)
void UserEntity::setPasswordSalt(const std::string &salt) { passwordSalt = salt; }
// set password hash (to access outside)
void UserEntity::setPasswordHash(const std::string &hash) { passwordHash = hash; }
// set user active online or offline (to access outside)
void UserEntity::setActive(bool enabled) { activated = enabled; }


// change username
void UserEntity::changeUsername(std::string username) {
    this->username = username; 
};
// change firstname
void UserEntity::changeFirstname(std::string firstname) {
    this->firstName = firstname;
};
// change lastname
void UserEntity::changeLastname(std::string lastname) {
    this->lastName = lastname;
};
// change address
void UserEntity::changeAddress(std::string address) {
    this->address = address;
};
// change age
void UserEntity::changeAge(int age) {
    this->age = age;
};





// -------------------- User search --------------------

// Use for searching users
std::vector<PublicUserInfo> UserEntity::searchUsers(const std::string &usernameQuery)
{
    // vector storage for storing users (contains PublicUserInfo objects)
    std::vector<PublicUserInfo> results;
    // load users
    USER_ACC_DB.load();
    // get JSON data of those users.
    auto &users = USER_ACC_DB.getStorage()[USER_ACC_DB.getDBName()];

    // transform username query to lower
    std::string usernameQueryToLower;
    for (auto &c : usernameQuery)
    {
        usernameQueryToLower += static_cast<char>(std::tolower(static_cast<unsigned char>(c)));
    }

    // search for the user via filter
    for (auto &user : users)
    {
        std::string unameToLower;
        for (auto &c : user["username"])
        {
            unameToLower += static_cast<char>(std::tolower(static_cast<unsigned char>(c)));
        };

        // filter
        if (unameToLower.find(usernameQueryToLower) != std::string::npos)
        {
            PublicUserInfo info(
                user["firstName"].get<std::string>(),
                user["lastName"].get<std::string>(),
                user["username"].get<std::string>(),
                user["age"].get<int>());
            results.push_back(info);
        }
    }
    // return results
    return results;
}

bool UserEntity::deleteAccount(const std::string &targetUsername)
{
    // Load users
    this->USER_ACC_DB.load();
    auto &users = this->USER_ACC_DB.getStorage()[this->USER_ACC_DB.getDBName()];

    // Search and delete user by username
    for (auto it = users.begin(); it != users.end(); ++it)
    {
        if ((*it)["username"] == targetUsername)
        {
            users.erase(it);
            this->USER_ACC_DB.save();
            return true;
        }
    }

    // If not found
    return false;
}
