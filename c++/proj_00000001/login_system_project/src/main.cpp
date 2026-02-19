#include <iostream>
#include "../nlohmann/json.hpp"
#include "../header/uuid_gen.h"
#include "../header/Database.h"
#include "../header/UserEntity.h"
#include "../header/TermUtils.h"
#include "../header/BasicAcc.h"
#include "../header/AdminAcc.h"
#include "../header/PublicUserInfo.h"
#include <iomanip>
#include <fstream>
#include <vector>
#include <limits>
#include <string>
#include <random>
#include <utility>
#include <variant>
#include <thread>
#include <chrono>

#ifdef _WIN32
#include <windows.h>
#include <conio.h>
#else
#include <termios.h>
#include <unistd.h>
#endif

/**
 * COMPILE COMMAND :
 * g++ -mavx2 src/main.cpp src/Database.cpp src/UserEntity.cpp src/AdminAcc.cpp src/BasicAcc.cpp -o main.exe
 *
 * g++ -std=c++17 -O2 -mavx2 \ src/main.cpp \ src/Database.cpp \ src/UserEntity.cpp \ src/AdminAcc.cpp \ src/BasicAcc.cpp \ -I./include \ -I./nlohmann \ -pthread \ -o main.exe
 * g++ -mavx2 \ src/main.cpp \ src/Database.cpp \ src/UserEntity.cpp \ src/AdminAcc.cpp \ src/BasicAcc.cpp \ -I./include \ -I./nlohmann \ -pthread \ -o main.exe
 * g++ -mavx2 ^ src/main.cpp ^ src/Database.cpp ^ src/UserEntity.cpp ^ src/AdminAcc.cpp ^ src/BasicAcc.cpp ^ -I./include ^ -I./nlohmann ^ -pthread ^ -o main.exe
 */

const std::string USER_ACCOUNT_DB_NAME = "USER_ACCOUNTS";
const std::string USER_SETTINGS_DB_NAME = "USER_SETTINGS";
const std::string USER_ACCCOUNT_FILE_PATH = "db/user_account_db.txt";
const std::string USER_SETTINGS_FILE_PATH = "db/user_settings_db.txt";
Database USER_ACCOUNT_DB(USER_ACCCOUNT_FILE_PATH, USER_ACCOUNT_DB_NAME);
Database USER_SETTINGS_DB(USER_SETTINGS_FILE_PATH, USER_SETTINGS_DB_NAME);

std::string cleanUp = "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ";
#ifdef _WIN32
// Windows _getch wrapper
inline char getch_wrapper() { return _getch(); }
#else
// Linux _getch equivalent
inline char getch_wrapper()
{
    struct termios oldt, newt;
    char ch;
    tcgetattr(STDIN_FILENO, &oldt);
    newt = oldt;
    newt.c_lflag &= ~(ICANON | ECHO);
    tcsetattr(STDIN_FILENO, TCSANOW, &newt);
    ch = getchar();
    tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
    return ch;
}
#endif

// Example Linux-compatible getPassword function
// inline std::string getPassword_hidden_v2(char mask, bool &accessOtherAccount)
// {
//     std::string pwd;
//     char c;
//     while (true)
//     {
//         c = getch_wrapper();
//         if (c == 27) // ESC
//         {
//             accessOtherAccount = true;
//             break;
//         }
//         if (c == 13 || c == '\n') // Enter
//         {
//             std::cout << "\n";
//             break;
//         }
//         if (c == 8 || c == 127) // Backspace
//         {
//             if (!pwd.empty())
//             {
//                 pwd.pop_back();
//                 std::cout << "\b \b";
//             }
//             continue;
//         }
//         pwd.push_back(c);
//         std::cout << mask;
//     }
//     return pwd;
// }

void ControlMenu(int &index, int &maxIndex, bool &errorKey, bool &pressedEnter, bool &pressedEsc)
{
    std::string keyboardPress = TermUtils::detectKey();
    if (keyboardPress == "pressedArrowUp")
    {
        index--;
        if (index < 0)
            index = maxIndex;
        errorKey = false;
    }
    else if (keyboardPress == "pressedArrowDown")
    {
        index++;
        if (index > maxIndex)
            index = 0;
        errorKey = false;
    }
    else if (keyboardPress == "pressedEnter")
    {
        pressedEnter = true;
        errorKey = false;
    }
    else if (keyboardPress == "pressedEsc")
    {
        pressedEsc = true;
        errorKey = false;
    }
    else if (!keyboardPress.empty())
    {
        errorKey = true;
    }
}

// --- basicUserUI() and adminUI() remain exactly as you wrote ---
void basicUserUI(UserEntity *&user, std::pair<int, int> &terminalSize, int lPosition, int rPosition)
{
    bool programIsRunning = true;
    bool initialScreenCleanup3 = false;
    int menuIndex = 0;
    int maxIndex = 2;
    bool errorKey = false;
    std::string introPhrase = "Welcome User!";
    int introPhraseSize = introPhrase.size();
    int xTabSize = 5;
    int yTabSize = 1;
    int bxLen = xTabSize * 2 + introPhraseSize;
    std::string lTopEdge = u8"╔";
    std::string rTopEdge = u8"╗";
    std::string lBottomEdge = u8"╚";
    std::string rBottomEdge = u8"╝";
    std::string midVertEdge = u8"║";
    std::string midHorEdge = u8"═";

    while (true)
    {
        std::vector<std::pair<std::pair<int, int>, std::string>> frames;
        terminalSize = TermUtils::getTerminalSize();

        int frameWidth = bxLen;
        lPosition = (terminalSize.first - frameWidth) / 2;
        rPosition = terminalSize.first - frameWidth - lPosition;

        if (errorKey)
        {
            frames.push_back({{lPosition, rPosition}, "\033[1;31mINVALID INPUT\033[0m"});
        }

        // Top border
        frames.push_back({{lPosition, rPosition}, TermUtils::makeTopBottomEdgeBorder(frameWidth, rTopEdge, lTopEdge, midHorEdge)});

        // Middle content
        frames.push_back({{lPosition, rPosition}, TermUtils::makeCenteredTexts(introPhrase, xTabSize, yTabSize, midVertEdge)});

        // Bottom border
        frames.push_back({{lPosition, rPosition}, TermUtils::makeTopBottomEdgeBorder(frameWidth, rBottomEdge, lBottomEdge, midHorEdge)});
        frames.push_back({{lPosition, rPosition}, std::string(terminalSize.first, ' ')});

        // // Clear the screen
        // if (initialScreenCleanup3)
        // {
        //     TermUtils::properClear();
        // }
        // else
        // {
        //     TermUtils::hardClear();
        //     initialScreenCleanup3 = true;
        // }
        TermUtils::hardClear();

        std::vector<std::string> menu = {
            "Personal Data",
            "Logout"};
        maxIndex = menu.size() - 1;

        for (int i = 0; i < menu.size(); i++)
        {
            if (i == menuIndex)
            {
                frames.push_back({{lPosition, rPosition}, "\033[1;32m> " + menu[i] + "\033[0m"});
            }
            else
            {
                frames.push_back({{lPosition, rPosition}, "  " + menu[i]});
            }
        }

        bool pressedEnter = false;
        bool pressedEsc = false;
        ControlMenu(menuIndex, maxIndex, errorKey, pressedEnter, pressedEsc);

        if (pressedEnter)
        {
            if (menuIndex == 0)
            {
                int pdIndex = 0;    // personal data menu index
                int pdMaxIndex = 5; // number of fields - 1
                bool pdErrorKey = false;
                bool pdInitialCleanup = false;
                bool pdPressedEnter = false;
                bool pdPressedEsc = false;
                std::string introPhrase = "Personal Informations";
                int introPhraseSize = introPhrase.size();
                int xTabSize = 5;
                int yTabSize = 1;
                int bxLen = xTabSize * 2 + introPhraseSize;

                std::vector<std::string> pdFields = {
                    "Username: " + user->getUsername(),
                    "First Name: " + user->getFirstname(),
                    "Last Name: " + user->getLastname(),
                    "Age: " + std::to_string(user->getAge()),
                    "Address: " + user->getAddress(),
                    "UUID: " + user->getUUID()};

                while (true)
                {
                    std::vector<std::pair<std::pair<int, int>, std::string>> frames;
                    terminalSize = TermUtils::getTerminalSize();

                    int frameWidth = bxLen;
                    lPosition = (terminalSize.first - frameWidth) / 2;
                    rPosition = terminalSize.first - frameWidth - lPosition;

                    if (pdErrorKey)
                        frames.push_back({{lPosition, rPosition}, "\033[1;31mINVALID INPUT\033[0m"});

                    // user->loadUserData(user->getUsername());
                    frames.push_back({{lPosition, rPosition}, TermUtils::makeTopBottomEdgeBorder(frameWidth, rTopEdge, lTopEdge, midHorEdge)});
                    frames.push_back({{lPosition, rPosition}, TermUtils::makeCenteredTexts(introPhrase, xTabSize, yTabSize, midVertEdge)});
                    frames.push_back({{lPosition, rPosition}, TermUtils::makeTopBottomEdgeBorder(frameWidth, rBottomEdge, lBottomEdge, midHorEdge)});
                    frames.push_back({{lPosition, rPosition}, std::string(terminalSize.first, ' ')});

                    // if (pdInitialCleanup)
                    //     TermUtils::properClear();
                    // else
                    // {
                    // TermUtils::hardClear();
                    //     pdInitialCleanup = true;
                    // }
                    TermUtils::hardClear();

                    // Display fields with selection
                    for (int i = 0; i < pdFields.size(); i++)
                    {
                        if (i == pdIndex && i != pdFields.size() - 1)
                            frames.push_back({{lPosition, rPosition}, "\033[1;32m> " + pdFields[i] + " [change]\033[0m"});
                        else
                            frames.push_back({{lPosition, rPosition}, "  " + pdFields[i]});
                    }

                    ControlMenu(pdIndex, pdMaxIndex, pdErrorKey, pdPressedEnter, pdPressedEsc);

                    if (pdPressedEsc)
                        break;

                    if (pdPressedEnter)
                    {
                        bool cancelChange = false;
                        std::string currentPassword;
                        bool passwordErr = false;

                        // Loop until correct password or ESC pressed
                        while (!cancelChange)
                        {
                            TermUtils::hardClear();

                            if (passwordErr)
                                std::cout << "\033[1;31mINVALID PASSWORD!\033[0m" << std::endl;

                            std::cout << "Enter current password to confirm change (ESC to cancel): ";
                            currentPassword = TermUtils::getPassword_mask_v1('*', cancelChange);
                            if (cancelChange)
                                break;

                            if (!user->verifyPassword(currentPassword))
                            {
                                passwordErr = true;
                                continue;
                            }
                            else
                            {
                                passwordErr = false;
                                break;
                            }
                        }

                        if (!cancelChange && !passwordErr)
                        {
                            std::string input;
                            int inputInt;
                            std::string oldUsername = user->getUsername(); // store old username
                            TermUtils::hardClear();

                            switch (pdIndex)
                            {
                            case 0: // Username
                                std::cout << "New username: ";
                                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // flush leftover
                                std::getline(std::cin, input);
                                if (!input.empty())
                                    user->changeUsername(input);
                                break;

                            case 1: // First Name
                                std::cout << "New first name: ";
                                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // flush leftover
                                std::getline(std::cin, input);
                                if (!input.empty())
                                    user->changeFirstname(input);
                                break;

                            case 2: // Last Name
                                std::cout << "New last name: ";
                                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                                std::getline(std::cin, input);
                                if (!input.empty())
                                    user->changeLastname(input);
                                break;

                            case 3: // Age
                                while (true)
                                {
                                    std::cout << "New age: ";
                                    std::cin >> inputInt;
                                    if (std::cin.fail())
                                    {
                                        std::cin.clear();
                                        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                                        std::cout << "Invalid input. Enter a number." << std::endl;
                                        continue;
                                    }
                                    else
                                    {
                                        user->changeAge(inputInt);
                                        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // flush newline
                                        break;
                                    }
                                }
                                break;

                            case 4: // Address
                                std::cout << "New address: ";
                                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // flush leftover
                                std::getline(std::cin, input);
                                if (!input.empty())
                                    user->changeAddress(input);
                                break;
                            }

                            // Delete old account and save new data
                            user->deleteAccount(oldUsername);
                            user->saveUserData();

                            // Reload updated user
                            user->loadUserData(user->getUsername());

                            // Update displayed fields
                            pdFields[0] = "Username: " + user->getUsername();
                            pdFields[1] = "First Name: " + user->getFirstname();
                            pdFields[2] = "Last Name: " + user->getLastname();
                            pdFields[3] = "Age: " + std::to_string(user->getAge());
                            pdFields[4] = "Address: " + user->getAddress();
                            pdFields[5] = "UUID: " + user->getUUID();
                        }

                        pdPressedEnter = false; // reset after action
                        pdInitialCleanup = false;
                    }

                    // Print frame
                    for (auto &frame : frames)
                    {
                        std::cout << std::string(frame.first.first, ' ') << frame.second
                                  << std::string(frame.first.second, ' ') << std::endl;
                    }

                    std::cout << cleanUp << std::endl;
                    std::this_thread::sleep_for(std::chrono::microseconds(100));
                }
            }
            else if (menuIndex == menu.size() - 1)
            {
                break;
            }
        }

        // Print frame
        for (auto &frame : frames)
        {
            std::cout << std::string(frame.first.first, ' ') << frame.second << std::string(frame.first.second, ' ') << std::endl;
        }

        // Clean up
        // std::cout << std::string(300, ' ') << std::endl;
        std::cout << cleanUp << std::endl;

        // Time control
        std::this_thread::sleep_for(std::chrono::microseconds(100));
    }
}

void adminUI(UserEntity *&user, std::pair<int, int> &terminalSize, int lPosition, int rPosition)
{
    bool programIsRunning = true;
    bool initialScreenCleanup3 = false;
    int menuIndex = 0;
    int maxIndex = 2;
    bool errorKey = false;
    std::string introPhrase = "Welcome Admin!";
    std::ostringstream s;
    int introPhraseSize = introPhrase.size();
    int xTabSize = 5;
    int yTabSize = 1;
    int bxLen = xTabSize * 2 + introPhraseSize;
    std::string lTopEdge = u8"╔";
    std::string rTopEdge = u8"╗";
    std::string lBottomEdge = u8"╚";
    std::string rBottomEdge = u8"╝";
    std::string midVertEdge = u8"║";
    std::string midHorEdge = u8"═";

    while (true)
    {
        std::vector<std::pair<std::pair<int, int>, std::string>> frames;
        terminalSize = TermUtils::getTerminalSize();

        int frameWidth = bxLen;
        lPosition = (terminalSize.first - frameWidth) / 2;
        rPosition = terminalSize.first - frameWidth - lPosition;

        if (errorKey)
        {
            frames.push_back({{lPosition, rPosition}, "\033[1;31mINVALID INPUT\033[0m"});
        }

        // Top border
        frames.push_back({{lPosition, 0}, TermUtils::makeTopBottomEdgeBorder(frameWidth, rTopEdge, lTopEdge, midHorEdge)});

        // Middle content
        frames.push_back({{lPosition, 0}, TermUtils::makeCenteredTexts(introPhrase, xTabSize, yTabSize, midVertEdge)});

        // Bottom border
        frames.push_back({{lPosition, 0}, TermUtils::makeTopBottomEdgeBorder(frameWidth, rBottomEdge, lBottomEdge, midHorEdge)});
        frames.push_back({{lPosition, 0}, std::string(terminalSize.first, ' ')});

        // // Clear the screen
        // if (initialScreenCleanup3)
        // {
        //     TermUtils::properClear();
        // }
        // else
        // {
        //     TermUtils::hardClear();
        //     initialScreenCleanup3 = true;
        // }
        TermUtils::hardClear();

        std::vector<std::string> menu = {
            "Personal Data",
            "Logout"};
        maxIndex = menu.size() - 1;

        for (int i = 0; i < menu.size(); i++)
        {
            if (i == menuIndex)
            {
                frames.push_back({{lPosition, rPosition}, "\033[1;32m> " + menu[i] + "\033[0m"});
            }
            else
            {
                frames.push_back({{lPosition, rPosition}, "  " + menu[i]});
            }
        }

        bool pressedEnter = false;
        bool pressedEsc = false;
        ControlMenu(menuIndex, maxIndex, errorKey, pressedEnter, pressedEsc);

        if (pressedEnter)
        {
            if (menuIndex == 0)
            {
                int pdIndex = 0;    // personal data menu index
                int pdMaxIndex = 5; // number of fields - 1
                bool pdErrorKey = false;
                bool pdInitialCleanup = false;
                bool pdPressedEnter = false;
                bool pdPressedEsc = false;
                std::string introPhrase = "Personal Informations";
                std::ostringstream s;
                s << "Hello " << user->getUsername();
                int introPhraseSize = introPhrase.size();
                int xTabSize = 5;
                int yTabSize = 1;
                int bxLen = xTabSize * 2 + introPhraseSize;

                std::vector<std::string> pdFields = {
                    "Username: " + user->getUsername(),
                    "First Name: " + user->getFirstname(),
                    "Last Name: " + user->getLastname(),
                    "Age: " + std::to_string(user->getAge()),
                    "Address: " + user->getAddress(),
                    "UUID: " + user->getUUID()};

                while (true)
                {
                    std::vector<std::pair<std::pair<int, int>, std::string>> frames;
                    terminalSize = TermUtils::getTerminalSize();

                    int frameWidth = bxLen;
                    lPosition = (terminalSize.first - frameWidth) / 2;
                    rPosition = terminalSize.first - frameWidth - lPosition;

                    if (pdErrorKey)
                        frames.push_back({{lPosition, rPosition}, "\033[1;31mINVALID INPUT\033[0m"});

                    // user->loadUserData(user->getUsername());
                    frames.push_back({{lPosition, rPosition}, TermUtils::makeTopBottomEdgeBorder(frameWidth, rTopEdge, lTopEdge, midHorEdge)});
                    frames.push_back({{lPosition, rPosition}, TermUtils::makeCenteredTexts(introPhrase, xTabSize, yTabSize, midVertEdge)});
                    frames.push_back({{lPosition, rPosition}, TermUtils::makeTopBottomEdgeBorder(frameWidth, rBottomEdge, lBottomEdge, midHorEdge)});
                    frames.push_back({{lPosition, rPosition}, std::string(terminalSize.first, ' ')});

                    // if (pdInitialCleanup)
                    //     TermUtils::properClear();
                    // else
                    // {
                    // TermUtils::hardClear();
                    //     pdInitialCleanup = true;
                    // }
                    TermUtils::hardClear();

                    // Display fields with selection
                    for (int i = 0; i < pdFields.size(); i++)
                    {
                        if (i == pdIndex && i != pdFields.size() - 1)
                            frames.push_back({{lPosition, rPosition}, "\033[1;32m> " + pdFields[i] + " [change]\033[0m"});
                        else
                            frames.push_back({{lPosition, rPosition}, "  " + pdFields[i]});
                    }

                    ControlMenu(pdIndex, pdMaxIndex, pdErrorKey, pdPressedEnter, pdPressedEsc);

                    if (pdPressedEsc)
                        break;

                    if (pdPressedEnter)
                    {
                        bool cancelChange = false;
                        std::string currentPassword;
                        bool passwordErr = false;

                        // Loop until correct password or ESC pressed
                        while (!cancelChange)
                        {
                            TermUtils::hardClear();

                            if (passwordErr)
                                std::cout << "\033[1;31mINVALID PASSWORD!\033[0m" << std::endl;

                            std::cout << "Enter current password to confirm change (ESC to cancel): ";
                            currentPassword = TermUtils::getPassword_mask_v1('*', cancelChange);
                            if (cancelChange)
                                break;

                            if (!user->verifyPassword(currentPassword))
                            {
                                passwordErr = true;
                                continue;
                            }
                            else
                            {
                                passwordErr = false;
                                break;
                            }
                        }

                        if (!cancelChange && !passwordErr)
                        {
                            std::string input;
                            int inputInt;
                            std::string oldUsername = user->getUsername(); // store old username
                            TermUtils::hardClear();

                            switch (pdIndex)
                            {
                            case 0: // Username
                                std::cout << "New username: ";
                                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // flush leftover
                                std::getline(std::cin, input);
                                if (!input.empty())
                                    user->changeUsername(input);
                                break;

                            case 1: // First Name
                                std::cout << "New first name: ";
                                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // flush leftover
                                std::getline(std::cin, input);
                                if (!input.empty())
                                    user->changeFirstname(input);
                                break;

                            case 2: // Last Name
                                std::cout << "New last name: ";
                                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                                std::getline(std::cin, input);
                                if (!input.empty())
                                    user->changeLastname(input);
                                break;

                            case 3: // Age
                                while (true)
                                {
                                    std::cout << "New age: ";
                                    std::cin >> inputInt;
                                    if (std::cin.fail())
                                    {
                                        std::cin.clear();
                                        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                                        std::cout << "Invalid input. Enter a number." << std::endl;
                                        continue;
                                    }
                                    else
                                    {
                                        user->changeAge(inputInt);
                                        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // flush newline
                                        break;
                                    }
                                }
                                break;

                            case 4: // Address
                                std::cout << "New address: ";
                                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // flush leftover
                                std::getline(std::cin, input);
                                if (!input.empty())
                                    user->changeAddress(input);
                                break;
                            }

                            // Delete old account and save new data
                            user->deleteAccount(oldUsername);
                            user->saveUserData();

                            // Reload updated user
                            user->loadUserData(user->getUsername());

                            // Update displayed fields
                            pdFields[0] = "Username: " + user->getUsername();
                            pdFields[1] = "First Name: " + user->getFirstname();
                            pdFields[2] = "Last Name: " + user->getLastname();
                            pdFields[3] = "Age: " + std::to_string(user->getAge());
                            pdFields[4] = "Address: " + user->getAddress();
                            pdFields[5] = "UUID: " + user->getUUID();
                        }

                        pdPressedEnter = false; // reset after action
                        pdInitialCleanup = false;
                    }

                    // Print frame
                    for (auto &frame : frames)
                    {
                        std::cout << std::string(frame.first.first, ' ') << frame.second
                                  << std::string(frame.first.second, ' ') << std::endl;
                    }

                    std::cout << cleanUp << std::endl;
                    std::this_thread::sleep_for(std::chrono::microseconds(100));
                }
            }
            else if (menuIndex == menu.size() - 1)
            {
                break;
            }
        }

        // Print frame
        for (auto &frame : frames)
        {
            std::cout << std::string(frame.first.first, ' ') << frame.second << std::string(frame.first.second, ' ') << std::endl;
        }

        // Clean up
        // std::cout << std::string(300, ' ') << std::endl;
        std::cout << cleanUp << std::endl;

        // Time control
        std::this_thread::sleep_for(std::chrono::microseconds(100));
    }
}

int main()
{
#ifdef _WIN32
    SetConsoleCP(CP_UTF8);
    SetConsoleOutputCP(CP_UTF8);
#endif

    UserEntity *user = nullptr;
    bool programIsRunning = true;
    bool initialScreenCleanup = false;
    int menuIndex = 0;
    int maxIndex = 2;
    bool errorKey = false;

    std::string introPhrase = "Welcome to our system!";
    int introPhraseSize = introPhrase.size();
    int xTabSize = 5;
    int yTabSize = 1;
    int bxLen = xTabSize * 2 + introPhraseSize;
    std::string lTopEdge = u8"╔";
    std::string rTopEdge = u8"╗";
    std::string lBottomEdge = u8"╚";
    std::string rBottomEdge = u8"╝";
    std::string midVertEdge = u8"║";
    std::string midHorEdge = u8"═";

    TermUtils::removeCursor();

    const int MAX_PASSWORD_ATTEMPTS = 3; // max attempts
    int passwordErrorCount = 0;          // counter

    while (programIsRunning)
    {
        std::vector<std::pair<std::pair<int, int>, std::string>> frames;
        std::pair<int, int> terminalSize = TermUtils::getTerminalSize();

        int frameWidth = bxLen;
        int lPosition = (terminalSize.first - frameWidth) / 2;
        int rPosition = terminalSize.first - frameWidth - lPosition;

        if (errorKey)
            frames.push_back({{lPosition, rPosition}, "\033[1;31mINVALID INPUT\033[0m"});

        frames.push_back({{lPosition, rPosition}, TermUtils::makeTopBottomEdgeBorder(frameWidth, rTopEdge, lTopEdge, midHorEdge)});
        frames.push_back({{lPosition, rPosition}, TermUtils::makeCenteredTexts(introPhrase, xTabSize, yTabSize, midVertEdge)});
        frames.push_back({{lPosition, rPosition}, TermUtils::makeTopBottomEdgeBorder(frameWidth, rBottomEdge, lBottomEdge, midHorEdge)});
        frames.push_back({{lPosition, rPosition}, std::string(terminalSize.first, ' ')});

        // if (initialScreenCleanup)
        //     TermUtils::properClear();
        // else
        // {
        //     TermUtils::hardClear();
        //     initialScreenCleanup = true;
        // }
        TermUtils::hardClear();

        std::vector<std::string> menu = {"Login", "Signup"};
        maxIndex = menu.size() - 1;

        for (int i = 0; i < menu.size(); i++)
        {
            if (i == menuIndex)
                frames.push_back({{lPosition, rPosition}, "\033[1;32m> " + menu[i] + "\033[0m"});
            else
                frames.push_back({{lPosition, rPosition}, "  " + menu[i]});
        }

        bool pressedEnter = false;
        bool pressedEsc = false;
        ControlMenu(menuIndex, maxIndex, errorKey, pressedEnter, pressedEsc);

        if (pressedEsc)
            break;

        if (pressedEnter)
        {
            if (menuIndex == 0)
            {
                // login
                int innerIndex = 0;
                int maxIndex = 2;
                bool errorKey2 = false;
                bool pressedEnter2 = false;
                bool pressedEsc2 = false;
                bool initialScreenCleanup2 = false;
                bool usernameDoesNotExist = false;
                bool passwordError = false;
                bool usernameAlreadySet = false;
                std::string onStateUsername;
                std::string username, password;

                while (true)
                {
                    terminalSize = TermUtils::getTerminalSize();
                    lPosition = (terminalSize.first - frameWidth) / 2;
                    rPosition = terminalSize.first - frameWidth - lPosition;

                    TermUtils::hardClear();
                    ControlMenu(innerIndex, maxIndex, errorKey2, pressedEnter2, pressedEsc2);

                    std::cout << std::string(lPosition, ' ') << "LOGIN CREDENTIALS\n\n";
                    if (usernameDoesNotExist)
                        std::cout << std::string(lPosition, ' ') << "\033[1;31mUSERNAME DOES NOT EXIST!\033[0m" << std::endl;
                    if (passwordError)
                        std::cout << std::string(lPosition, ' ') << "\033[1;31mINCORRECT PASSWORD! Attempts left: "
                                  << MAX_PASSWORD_ATTEMPTS - passwordErrorCount << "\033[0m" << std::endl;

                    std::cout << std::string(lPosition, ' ') << "Username: ";
                    if (usernameAlreadySet)
                    {
                        std::cout << onStateUsername << std::endl;
                        username = onStateUsername;
                    }
                    else
                        std::cin >> username;

                    usernameDoesNotExist = false;
                    passwordError = false;

                    if (username == "0")
                        break;

                    AdminAcc tempAdmin(USER_ACCOUNT_DB, USER_SETTINGS_DB);
                    if (!tempAdmin.isUsernameExist(username) && !usernameAlreadySet)
                    {
                        usernameDoesNotExist = true;
                        continue;
                    }
                    else
                    {
                        usernameAlreadySet = true;
                        onStateUsername = username;
                    }

                    std::cout << std::string(lPosition, ' ') << "Password: ";
                    bool exit = false;
                    password = TermUtils::getPassword_mask_v1('*', exit);
                    if (exit)
                    {
                        onStateUsername = "";
                        usernameAlreadySet = false;
                        passwordErrorCount = 0; // reset on exit
                        break;
                    }

                    if (tempAdmin.registeredUserType(username) == "admin")
                    {
                        user = new AdminAcc(USER_ACCOUNT_DB, USER_SETTINGS_DB);
                        if (!user->login(username, password))
                        {
                            passwordError = true;
                            passwordErrorCount++;

                            if (passwordErrorCount >= MAX_PASSWORD_ATTEMPTS)
                            {
                                std::cout << std::string(lPosition, ' ') << "\033[1;31mACCOUNT LOCKED! Wait 10 seconds...\033[0m" << std::endl;
                                std::this_thread::sleep_for(std::chrono::seconds(10));
                                passwordErrorCount = 0;
                            }
                            continue;
                        }

                        passwordErrorCount = 0; // reset on success
                        usernameAlreadySet = false;
                        onStateUsername = "";
                        adminUI(user, terminalSize, lPosition, rPosition);
                        delete user;
                    }
                    else
                    {
                        user = new BasicAcc(USER_ACCOUNT_DB, USER_SETTINGS_DB);
                        if (!user->login(username, password))
                        {
                            passwordError = true;
                            passwordErrorCount++;

                            if (passwordErrorCount >= MAX_PASSWORD_ATTEMPTS)
                            {
                                std::cout << std::string(lPosition, ' ') << "\033[1;31mACCOUNT LOCKED! Wait 10 seconds...\033[0m" << std::endl;
                                std::this_thread::sleep_for(std::chrono::seconds(10));
                                passwordErrorCount = 0;
                            }
                            continue;
                        }

                        passwordErrorCount = 0; // reset on success
                        usernameAlreadySet = false;
                        onStateUsername = "";
                        basicUserUI(user, terminalSize, lPosition, rPosition);
                        delete user;
                    }
                }
            }
            else if (menuIndex == 1)
            {
                // SIGNUP
                int innerIndex = 0;
                int maxIndex = 4; // fields: first name, last name, age, username, password
                bool errorKey2 = false;
                bool pressedEnter2 = false;
                bool pressedEsc2 = false;
                bool initialScreenCleanup2 = false;

                std::string firstName, lastName, username, address, password;
                int age = 0;

                while (true)
                {
                    terminalSize = TermUtils::getTerminalSize();
                    lPosition = (terminalSize.first - frameWidth) / 2;
                    rPosition = terminalSize.first - frameWidth - lPosition;

                    // Clear screen
                    // if (!initialScreenCleanup2)
                    // {
                    //     TermUtils::hardClear();
                    //     initialScreenCleanup2 = true;
                    // }
                    // else
                    // {
                    //     TermUtils::properClear();
                    // }
                    TermUtils::hardClear();

                    // Display signup fields
                    std::vector<std::string> signupFields = {
                        "First Name: " + firstName,
                        "Last Name: " + lastName,
                        "Age: " + (age > 0 ? std::to_string(age) : ""),
                        "Username: " + username,
                        "Address: " + address,
                        "Password: " + std::string(password.length(), '*')};

                    std::cout << std::string(lPosition, ' ') << "SIGNUP FORM\n\n";

                    int fieldWidth = 20; // fixed width for the signupFields column

                    for (int i = 0; i < signupFields.size(); i++)
                    {
                        if (i == innerIndex)
                            std::cout << std::string(lPosition, ' ')
                                      << "> "
                                      << std::left << std::setw(fieldWidth) << signupFields[i]
                                      << "[edit]" << std::endl;
                        else
                            std::cout << std::string(lPosition, ' ')
                                      << "  "
                                      << std::left << std::setw(fieldWidth) << signupFields[i]
                                      << std::endl;
                    }
                    // Control menu
                    maxIndex = signupFields.size();
                    ControlMenu(innerIndex, maxIndex, errorKey2, pressedEnter2, pressedEsc2);

                    if (pressedEsc2)
                        break;

                    if (pressedEnter2)
                    {
                        TermUtils::hardClear();
                        switch (innerIndex)
                        {
                        case 0: // First Name
                            std::cout << std::string(lPosition, ' ') << "Enter First Name: ";
                            // std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // flush leftover once
                            std::getline(std::cin, firstName);
                            break;

                        case 1: // Last Name
                            std::cout << std::string(lPosition, ' ') << "Enter Last Name: ";
                            std::getline(std::cin, lastName);
                            break;

                        case 2: // Age
                            while (true)
                            {
                                std::cout << std::string(lPosition, ' ') << "Enter Age: ";
                                std::cin >> age;
                                if (std::cin.fail() || age <= 0)
                                {
                                    std::cin.clear();
                                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                                    std::cout << std::string(lPosition, ' ') << "Invalid input. Enter a valid age." << std::endl;
                                    continue;
                                }
                                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // flush newline AFTER reading number
                                break;
                            }
                            break;

                        case 3: // Username
                        {
                            bool validUsername = false;
                            while (!validUsername)
                            {
                                std::cout << std::string(lPosition, ' ') << "Enter Username: ";
                                std::getline(std::cin, username); // no ignore here
                                AdminAcc tempAdmin(USER_ACCOUNT_DB, USER_SETTINGS_DB);

                                if (username.empty())
                                {
                                    std::cout << std::string(lPosition, ' ') << "Username cannot be empty." << std::endl;
                                    continue;
                                }
                                if (tempAdmin.isUsernameExist(username))
                                {
                                    std::cout << std::string(lPosition, ' ') << "Username already exists. Choose another." << std::endl;
                                    continue;
                                }
                                validUsername = true;
                            }
                            break;
                        }

                        case 4: // Last Name
                            std::cout << std::string(lPosition, ' ') << "Enter Address: ";
                            // std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                            std::getline(std::cin, address);
                            break;
                        case 5: // Password
                            std::cout << std::string(lPosition, ' ') << "Enter Password: ";
                            password = TermUtils::getPassword_mask_v1('*', pressedEsc2);
                            if (pressedEsc2)
                                break;
                            break;
                        }

                        pressedEnter2 = false;
                    }

                    // Check if all fields are filled to confirm signup
                    if (!firstName.empty() && !lastName.empty() && age > 0 && !username.empty() && !password.empty())
                    {
                        // Determine account type automatically or default to Basic
                        // For simplicity, let's default to BasicAcc
                        AdminAcc newUser(USER_ACCOUNT_DB, USER_SETTINGS_DB);

                        if (newUser.signup(firstName, lastName, age, username, password, address))
                        {
                            std::cout << std::string(lPosition, ' ') << "\033[1;32mSignup successful! Logging in...\033[0m" << std::endl;
                            std::this_thread::sleep_for(std::chrono::seconds(1));

                            // Auto-login after signup
                            if (newUser.registeredUserType(username) == "admin")
                            {
                                user = new AdminAcc(USER_ACCOUNT_DB, USER_SETTINGS_DB);
                                if (!user->login(username, password))
                                {
                                    std::cout << std::string(lPosition, ' ') << "\033[1;31mUnexpected login error for admin!\033[0m" << std::endl;
                                    std::this_thread::sleep_for(std::chrono::seconds(2));
                                    break;
                                }
                                adminUI(user, terminalSize, lPosition, rPosition);
                            }
                            else
                            {
                                user = new BasicAcc(USER_ACCOUNT_DB, USER_SETTINGS_DB);
                                if (!user->login(username, password))
                                {
                                    std::cout << std::string(lPosition, ' ') << "\033[1;31mUnexpected login error!\033[0m" << std::endl;
                                    std::this_thread::sleep_for(std::chrono::seconds(2));
                                    break;
                                }
                                basicUserUI(user, terminalSize, lPosition, rPosition);
                            }
                        }
                        break; // exit signup loop
                    }
                }
            }
            initialScreenCleanup = false;
        }

        for (auto &frame : frames)
        {
            std::cout << std::string(frame.first.first, ' ') << frame.second
                      << std::string(frame.first.second, ' ') << std::endl;
        }

        std::cout << cleanUp << std::endl;
        std::this_thread::sleep_for(std::chrono::milliseconds(50));
    }

    TermUtils::hardClear();
    std::cout << "Thank you for using our system" << std::endl;
    return 0;
}
