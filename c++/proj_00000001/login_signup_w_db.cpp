#include <iostream>
#include "nlohmann/json.hpp"
#include <fstream>
#include <conio.h>
#include <string>
#include <vector>
#include <windows.h>
#include <sstream>

struct Users
{
    std::string username;
    int id;
};

void detectKeyboard(int &index, int maxIndex, bool &pressEntered, bool &pressedEsc, bool &pressP, bool &pressC, bool &pressBackspace)
{
    if (_kbhit())
    {
        int k = _getch();
        if (k == 0 || k == 224)
        {
            k = _getch();
            switch (k)
            {
            case 72:
                index--;
                if (index < 0)
                    index = maxIndex;
                break;
            case 80:
                index++;
                if (index > maxIndex)
                    index = 0;
                break;
            }
        }
        else if (k == 13)
        {
            pressEntered = true;
        }
        else if (k == 27)
        {
            pressedEsc = true;
        }
        else if (k == 112 || k == 80)
        {
            pressP = true;
        }
        else if (k == 8 || k == 127)
        {
            pressBackspace = true;
        }
        else if (k == 99 || k == 67)
        {
            pressC = true;
        }
    }
}

void properClear()
{
    HANDLE hout = GetStdHandle(STD_OUTPUT_HANDLE);
    COORD coordinate = {0, 0};
    SetConsoleCursorPosition(hout, coordinate);
}

void hardClear()
{
#ifdef _WIN32
    system("cls");
#else
    system("clear");
#endif
}

void readDB(nlohmann::json &db, std::string &filePath, bool &fileError, std::string &fileErrorMessage)
{
    std::fstream file(filePath);
    if (!file.is_open())
    {
        fileError = true;
        db = nlohmann::json::array();
        return;
    }

    file.seekg(0, std::ios::end);
    if (file.tellg() == 0)
    {
        db = nlohmann::json::array();
        file.close();
        return;
    }

    file.seekg(0, std::ios::beg);

    try
    {
        file >> db;
    }
    catch (nlohmann::json::parse_error &)
    {
        db = nlohmann::json::array();
        fileError = true;
    }

    file.close();
}

template <typename T>
void updateDB(nlohmann::json &db, std::string &dbName, std::string &filePath, bool &fileError, std::vector<T> data)
{
    // read the existing DB first
    std::string fileErrorMsg;
    readDB(db, filePath, fileError, fileErrorMsg);

    if (!db.contains(dbName))
        db[dbName] = nlohmann::json::array();

    for (auto &d : data)
        db[dbName].push_back(d);

    std::ofstream file(filePath);
    if (!file.is_open())
    {
        fileError = true;
        return;
    }

    file << db.dump(4);
    file.close();
}

void addUser() {}
void deleteUser() {}
void updateUser() {}

std::vector<Users> getAllUsers(nlohmann::json &db, std::string &databaseName, std::string &filePath, bool &fileError, std::string &fileErrorMessages)
{
    std::vector<Users> users;
    readDB(db, filePath, fileError, fileErrorMessages);

    for (auto &user : db[databaseName])
    {
        users.push_back({user["username"], user["id"]});
    }

    return users;
}

template <typename T>
std::vector<T> findUser_username(std::string &username)
{
    // std::vector<T> users = getAllUsers();
}
void findUser_id() {}
template <typename T>
bool isUsernameExist(std::string &username)
{

    // std::vector<T> foundUser = findUser_username(username);
    // return foundUser.empty() ? false : true;
    return true;
}
void isUsernameAlreadyUsed() {}

void chooseLoginSignup(int &index, std::string &frame, bool &exit, std::vector<std::string> &displayedChoices)
{
    bool pressedEnter = false;
    bool pressedEsc = false;
    bool pressP = false;
    bool pressC = false;
    bool pressBackspace = false;
    detectKeyboard(index, 1, pressedEnter, pressedEsc, pressP, pressC, pressBackspace);
    for (int i = 0; i < displayedChoices.size(); i++)
    {
        if (i == index)
        {
            frame += u8" ► " + std::string("\033[1;92m") + displayedChoices[i] + "\033[0m                                                                          " + '\n';
        }
        else
        {
            frame += "   " + displayedChoices[i] + "                                                                         " + '\n';
        }

        if (pressedEsc)
        {
            exit = true;
            break;
        }

        if (pressedEnter)
        {
            break;
        }
    }
}

void login()
{
    bool processing = true;
    while (processing)
    {
        std::string username;
        std::cout << "Username: ";
        std::getline(std::cin, username);

        // if (!isUsernameExist(username))
        // {
        //     continue;
        // }
    }
}

void signup()
{
}

nlohmann::json DATABASE;
std::string FS = "db/db_0001.txt";
bool EXIT = false;
bool INITIAL_CLEAR = false;
int INDEX_GATE_1 = 0;
std::string USERS_DB_NAME = "user_database";
std::vector<std::string> DISPLAYED_CHOICES = {
    "Login",
    "Signup",
};

int main()
{
    SetConsoleOutputCP(CP_UTF8);
    SetConsoleCP(CP_UTF8);

    // while (!EXIT)
    // {
    //     std::string frame;
    //     if (INITIAL_CLEAR)
    //     {
    //         properClear();
    //     }
    //     else
    //     {
    //         hardClear();
    //         INITIAL_CLEAR = true;
    //     }

    //     frame += "\n\033[1;32mWelcome To Our System!\033[0m\n";

    //     chooseLoginSignup(INDEX_GATE_1, frame, EXIT, DISPLAYED_CHOICES);

    //     if (INDEX_GATE_1 == 0)
    //         login();
    //     else if (INDEX_GATE_1 == 1)
    //         signup();

    //     std::cout << frame;
    // }

    bool fileError;
    std::string fileErrorMessage;
    std::vector<Users> users = getAllUsers(DATABASE, USERS_DB_NAME, FS, fileError, fileErrorMessage);

    for (auto &i : users)
    {
        std::cout << "USERNAME: " << i.username << std::endl;
        std::cout << "ID: " << i.id << std::endl;
    }

    return 0;
}