#include <iostream>
#include <iterator>
#include <windows.h>
#include <sstream>
#include <thread>
#include <chrono>
#include <algorithm>
#include <random>
#include <vector>
#include <conio.h>
#include <string>
#include <iomanip> // for std::setw
#include "Database.h"


// command: g++ food.cpp Database.cpp -o main.exe

// ---------- Data structures (replacing pairs) ----------

struct Food
{
    double price;
    std::string name;
    int stock;
};

struct MenuCategory
{
    std::string name;
    std::vector<Food> foods;
};

struct ChosenFood
{
    std::string name;
    int quantity;
    double price;
};

// ---------- Database integration ----------
Database db("restaurant.txt", "restaurantMenu");

// Load menu from database
std::vector<MenuCategory> loadMenuFromDB()
{
    std::vector<MenuCategory> menu;
    nlohmann::json &storage = db.getStorage();
    if (!storage.contains(db.getDBName()) || !storage[db.getDBName()].is_array())
        return menu;

    for (auto &catJson : storage[db.getDBName()])
    {
        MenuCategory cat;
        cat.name = catJson["name"].get<std::string>();
        for (auto &foodJson : catJson["foods"])
        {
            Food f;
            f.name = foodJson["name"].get<std::string>();
            f.price = foodJson["price"].get<double>();
            f.stock = foodJson["stock"].get<int>();
            cat.foods.push_back(f);
        }
        menu.push_back(cat);
    }
    return menu;
}

// Save menu stock changes back to database
void saveMenuToDB(const std::vector<MenuCategory> &menu)
{
    nlohmann::json &storage = db.getStorage();
    storage[db.getDBName()] = nlohmann::json::array();
    for (auto &cat : menu)
    {
        nlohmann::json catJson;
        catJson["name"] = cat.name;
        catJson["foods"] = nlohmann::json::array();
        for (auto &f : cat.foods)
        {
            nlohmann::json foodJson;
            foodJson["name"] = f.name;
            foodJson["price"] = f.price;
            foodJson["stock"] = f.stock;
            catJson["foods"].push_back(foodJson);
        }
        storage[db.getDBName()].push_back(catJson);
    }
    db.save();
}

int countUTF8Chars(const std::string &str)
{
    int count = 0;
    for (size_t i = 0; i < str.size();)
    {
        if (str[i] == '\033') // ANSI escape start
        {
            i++; // skip '\033'
            if (i < str.size() && str[i] == '[')
            {
                i++; // skip '['
                // skip until 'm'
                while (i < str.size() && str[i] != 'm')
                    i++;
                if (i < str.size())
                    i++; // skip 'm'
            }
        }
        else
        {
            unsigned char c = str[i];
            if ((c & 0x80) == 0)
                i += 1;
            else if ((c & 0xE0) == 0xC0)
                i += 2;
            else if ((c & 0xF0) == 0xE0)
                i += 3;
            else if ((c & 0xF8) == 0xF0)
                i += 4;
            else
                i += 1;
            count++;
        }
    }
    return count;
}

// ---------- UI utilities (unchanged logic) ----------
void makeTopBottomEdgeBorder(int bxLen, std::string &rEdgeChar, 
    std::string &lEdgeChar, 
    std::string &midEdge, 
    std::vector<std::pair<std::string, std::string>> &colors, 
    std::string &frame
)
{
    for (int i = 0; i < bxLen; i++)
    {
        if (i == 0)
            frame += colors[0].first + lEdgeChar + colors[0].second;
        else if (i == (bxLen - 1))
            frame += colors[0].first + rEdgeChar + colors[0].second;
        else
            frame += colors[0].first + midEdge + colors[0].second;
    }
    frame += "                                          ";
    frame += '\n';
}

void makeTextWithColors(std::string &introPhrase, 
    std::vector<std::pair<std::string, std::string>> &colors, 
    int &xTabSize, 
    int &yTabSize, 
    std::string &midVertEdge, 
    bool coloredText, 
    std::string &frame)
{
    int index = 0;
    std::string textFrame;
    std::string topBottomPadding;
    std::string leftPadding;
    std::string rightPadding;
    if (yTabSize > 0)
    {
        int xfullSpace = (xTabSize * 2) + introPhrase.size();
        for (int j = 1; j <= yTabSize; j++)
        {
            for (int i = 1; i <= xfullSpace; i++)
            {
                if (i == 1)
                    topBottomPadding += colors[0].first + midVertEdge + colors[0].second;
                else if (i == xfullSpace)
                    topBottomPadding += colors[0].first + midVertEdge + colors[0].second;
                else
                    topBottomPadding += " ";
            }
        }
    }
    if (xTabSize > 0)
    {
        for (int i = 1; i <= xTabSize; i++)
        {
            if (i == 1)
                leftPadding += colors[0].first + midVertEdge + colors[0].second;
            else
                leftPadding += ' ';
        }
        for (int i = 1; i <= xTabSize; i++)
        {
            if (i == xTabSize)
                rightPadding += colors[0].first + midVertEdge + colors[0].second;
            else
                rightPadding += ' ';
        }
    }
    for (const char &c : introPhrase)
    {
        coloredText ? textFrame += colors[index].first + std::string(1, c) + colors[index].second : textFrame += "\033[1m" + std::string(1, c) + "\033[0m";
        index++;
        if (index >= colors.size())
            index = 0;
    }
    frame += topBottomPadding + "                                                                        ";
    frame += '\n' + leftPadding;
    frame += textFrame;
    frame += rightPadding + "                                                                        " + '\n';
    frame += topBottomPadding + "                                                                        " + '\n';
}

std::size_t displayWidth(const std::string &s)
{
    std::size_t width = 0;
    for (std::size_t i = 0; i < s.size();)
    {
        unsigned char c = s[i];
        if ((c & 0x80) == 0)
        {
            i += 1;
            width += 1;
        }
        else if ((c & 0xE0) == 0xC0)
        {
            i += 2;
            width += 1;
        }
        else if ((c & 0xF0) == 0xE0)
        {
            i += 3;
            width += 1;
        }
        else if ((c & 0xF8) == 0xF0)
        {
            i += 4;
            width += 2;
        }
        else
            i += 1;
    }
    return width;
}

// ---------- Animation intro (unchanged) ----------
void introduction(float &accumilator, float &dt, float &speed, 
    std::string &frame,
    std::chrono::high_resolution_clock::time_point &lastFrame,
    std::string &introPhrase, std::vector<std::pair<std::string, 
    std::string>> &colors)
{
    static std::mt19937 gen(std::random_device{}()); // static RNG
    auto now = std::chrono::high_resolution_clock::now();
    std::chrono::duration<float> elapsed = now - lastFrame;
    dt = elapsed.count();
    accumilator += speed * dt;
    lastFrame = now;

    if (accumilator >= 0.3f)
    {
        std::shuffle(colors.begin(), colors.end(), gen);
        accumilator = 0.0f; // reset after animation step
    }

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

    makeTopBottomEdgeBorder(bxLen, rTopEdge, lTopEdge, midHorEdge, colors, frame);
    makeTextWithColors(introPhrase, colors, xTabSize, yTabSize, midVertEdge, false, frame);
    makeTopBottomEdgeBorder(bxLen, rBottomEdge, lBottomEdge, midHorEdge, colors, frame);
    frame += '\n';
}

// ---------- Console helpers ----------
void properClear()
{
    HANDLE hout = GetStdHandle(STD_OUTPUT_HANDLE);
    COORD coordinate = {0, 0};
    SetConsoleCursorPosition(hout, coordinate);
}

void removeCursor()
{
    HANDLE hout = GetStdHandle(STD_OUTPUT_HANDLE);
    CONSOLE_CURSOR_INFO inf;
    GetConsoleCursorInfo(hout, &inf);
    inf.bVisible = false;
    SetConsoleCursorInfo(hout, &inf);
}

void hardClear()
{
#ifdef _WIN32
    system("cls");
#else
    system("clear");
#endif
}

// ---------- Keyboard detection (unchanged) ----------
void detectKeyboard(int &index, 
    int maxIndex, bool &pressEntered, 
    bool &pressedEsc, bool &pressedPayment, 
    bool &pressedCancel, bool &pressedBackspace)
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
            pressedPayment = true;
        }
        else if (k == 8 || k == 127)
        {
            pressedBackspace = true;
        }
        else if (k == 99 || k == 67)
        {
            pressedCancel = true;
        }
    }
}

// ---------- Receipt printing (updated type with tax) ----------
void printReceipt(const std::vector<ChosenFood> &chosenFoods, double payment)
{
    std::ostringstream frame;
    double subtotal = 0.0;

    struct ItemLine
    {
        std::string text;
    };
    std::vector<ItemLine> lines;

    for (const auto &cf : chosenFoods)
    {
        double lineTotal = cf.quantity * cf.price;
        subtotal += lineTotal;

        std::ostringstream oss;
        oss << std::fixed << std::setprecision(2)
            << cf.name << " x" << cf.quantity
            << u8" = ₱" << lineTotal;
        lines.push_back({oss.str()});
    }

    double tax = subtotal * 0.10; // 10% tax
    double total = subtotal + tax;
    double change = payment - total;

    // Subtotal line
    {
        std::ostringstream oss;
        oss << std::fixed << std::setprecision(2) << subtotal;
        lines.push_back({u8"Subtotal: ₱" + oss.str()});
    }

    // Tax line
    {
        std::ostringstream oss;
        oss << std::fixed << std::setprecision(2) << tax;
        lines.push_back({u8"Tax (10%): ₱" + oss.str()});
    }

    // Total line
    {
        std::ostringstream oss;
        oss << std::fixed << std::setprecision(2) << total;
        lines.push_back({u8"Total: ₱" + oss.str()});
    }

    // Payment line
    {
        std::ostringstream oss;
        oss << std::fixed << std::setprecision(2) << payment;
        lines.push_back({u8"Payment: ₱" + oss.str()});
    }

    // Change line
    {
        std::ostringstream oss;
        oss << std::fixed << std::setprecision(2) << change;
        lines.push_back({u8"Change: ₱" + oss.str()});
    }

    // Find max display width
    std::size_t maxLen = 0;
    for (const auto &l : lines)
        maxLen = std::max(maxLen, displayWidth(l.text));

    std::size_t boxWidth = maxLen + 4;

    const std::string topLeft = "╔", topRight = "╗";
    const std::string bottomLeft = "╚", bottomRight = "╝";
    const std::string vertical = "║";
    const std::string horizontal = "═";
    const std::string middleLeft = "╠", middleRight = "╣";

    auto repeat = [](const std::string &s, std::size_t count)
    {
        std::string r;
        r.reserve(s.size() * count);
        for (std::size_t i = 0; i < count; ++i)
            r += s;
        return r;
    };

    frame << topLeft << repeat(horizontal, boxWidth - 2) << topRight << "\n";

    // Header centered
    std::string header = "RECEIPT";
    std::size_t padLeft = (boxWidth - 2 - header.size()) / 2;
    std::size_t padRight = boxWidth - 2 - header.size() - padLeft;
    frame << vertical << std::string(padLeft, ' ') << header
          << std::string(padRight, ' ') << vertical << "\n";

    frame << middleLeft << repeat(horizontal, boxWidth - 2) << middleRight << "\n";

    // Lines aligned using displayWidth
    for (const auto &l : lines)
    {
        std::size_t padding = boxWidth - 2 - displayWidth(l.text);
        frame << vertical << l.text << std::string(padding, ' ') << vertical << "\n";
    }

    frame << bottomLeft << repeat(horizontal, boxWidth - 2) << bottomRight << "\n";

    std::cout << frame.str();
}

// ---------- Payment process (updated with tax) ----------
void paymentProcess(std::vector<ChosenFood> &chosenFoods, bool &choosing)
{
    bool donePaying = false;
    bool initialCls = false;
    bool paymentNotEnough = false;
    bool invalidInput = false;
    double payment = 0.0;
    double change = 0.0;
    while (true)
    {
        if (initialCls)
        {
            properClear();
        }
        else
        {
            hardClear();
            initialCls = true;
        }
        if (invalidInput)
        {
            hardClear();
            std::cout << "\033[31m" << u8R"(
╔═══════════════════════════════════╗
║           INVALID INPUT           ║
╚═══════════════════════════════════╝
                    )" << "\033[0m"
                      << "\n"
                      << std::endl;
            std::cout << std::endl;
            invalidInput = false;
        }
        else if (paymentNotEnough)
        {
            hardClear();
            std::cout << "\033[31m" << u8R"(
╔═══════════════════════════════════════╗
║           Payment Not Enough          ║
╚═══════════════════════════════════════╝
                    )" << "\033[0m"
                      << "\n"
                      << std::endl;
            std::cout << std::endl;
        }

        double subtotal = 0;
        int chosenFoodsIndex = 1;
        for (auto &cf : chosenFoods)
        {
            double lineTotal = cf.quantity * cf.price;
            subtotal += lineTotal;
            std::cout << std::to_string(chosenFoodsIndex) << ". " << cf.name << " x" << cf.quantity << u8" = ₱" << lineTotal << '\n';
            chosenFoodsIndex++;
        }

        double tax = subtotal * 0.10;
        double total = subtotal + tax;

        std::cout << u8"\n═════════════════════════════════                          ";
        std::cout << u8"\033[1;32m \nSubtotal: ₱" << subtotal;
        std::cout << u8"\nTax (10%): ₱" << tax;
        std::cout << u8"\nTotal: ₱" << total;
        std::cout << "\033[0m\n═════════════════════════════════                           \n";

        std::cout << u8"Payment: ₱";
        std::cin >> payment;
        if (std::cin.fail())
        {
            std::cin.clear();
            std::cin.ignore(1000, '\n');
            invalidInput = true;
            continue;
        }
        if (total > payment)
        {
            paymentNotEnough = true;
        }
        else
        {
            change = payment - total;
            donePaying = true;
        }
        std::cout << u8"Change: ₱" << std::fixed << std::setprecision(2) << change << "\n\n\n"
                  << std::endl;

        printReceipt(chosenFoods, payment);

        if (donePaying)
            break;
    }
    chosenFoods.clear();
    std::cout << "\033[92m" << u8R"(
╔══════════════════════════════════════════╗
║           THANK YOU FOR BUYING!          ║
╚══════════════════════════════════════════╝
                    )"
              << "\033[0m"
              << "\n"
              << std::endl;
    std::cout << std::endl;
    choosing = false;
}


void chooseFood(
    int menuIndex,
    std::vector<Food> &foods,
    std::vector<ChosenFood> &chosenFoods,
    float &accumilator, float &dt, float &speed,
    std::chrono::high_resolution_clock::time_point &lastFrame,
    std::string introPhrase,
    bool choosing1,
    int tabSizeRightPadding1,
    int tabSizeRightPadding2,
    std::vector<std::pair<std::string, std::string>> &colors,
    std::vector<MenuCategory> &originalRestaurantMenu
)
{
    removeCursor();
    bool choosing2 = true;
    int index = 0;
    bool pressEnter = false;
    bool pressedEsc = false;
    bool pressedPayment = false;
    bool pressedCancelPayment = false;
    bool pressedBackspace = false;
    bool initialClear = false;

    while (choosing2)
    {
        if (initialClear)
            properClear();
        else
        {
            hardClear();
            initialClear = true;
        }

        std::string frame;
        introduction(accumilator, dt, speed, frame, lastFrame, introPhrase, colors);

        // --- Determine dynamic column widths ---
        int col1Width = tabSizeRightPadding1; // Foods
        int col2Width = tabSizeRightPadding2; // Stocks
        int col3Width = 10;                   // Selected (fixed)

        for (auto &f : foods)
        {
            std::ostringstream ss;
            ss << std::fixed << std::setprecision(2) << f.price;
            std::string priceName = u8"₱" + ss.str() + " " + f.name;
            col1Width = std::max(col1Width, countUTF8Chars(priceName) + 2); // +2 for arrow/padding

            std::string stockStr = (f.stock > 0 ? "\033[1;34m[stock: " + std::to_string(f.stock) + "]\033[0m" : "\033[1;31m[OUT OF STOCK]\033[0m");
            col2Width = std::max(col2Width, countUTF8Chars(stockStr) + 2); // +2 padding
        }

        std::string frameInnerDisplay;

        // --- Rows ---
        for (int i = 0; i < (int)foods.size(); i++)
        {
            std::ostringstream ss;
            bool selected = false;
            for (auto &z : chosenFoods)
                if (z.name == foods[i].name)
                    selected = true;

            ss << std::fixed << std::setprecision(2) << foods[i].price;
            std::string priceName = u8"₱" + ss.str() + " " + foods[i].name;

            // Column 1: Food
            std::string col1Content = (i == index ? "\033[1;32m► " : "  ") + priceName + "\033[0m";
            col1Content += std::string(col1Width - countUTF8Chars(col1Content), ' ');

            // Column 2: Stock
            std::string col2Content = (foods[i].stock > 0 ? "\033[1;34m[stock: " + std::to_string(foods[i].stock) + "]\033[0m" : "\033[1;31m[OUT OF STOCK]\033[0m");
            col2Content += std::string(col2Width - countUTF8Chars(col2Content), ' ');

            // Column 3: Selected
            std::string col3Content = selected ? "\033[1;32m[selected]\033[0m" : "";
            col3Content += std::string(col3Width - countUTF8Chars(col3Content), ' ');

            frameInnerDisplay += u8"║" + col1Content + u8"║" + col2Content + u8"║" + col3Content + u8"║\n";
        }

        // --- Top border ---
        frame += u8"╔";
        for (int t = 1; t <= col1Width; t++)
            frame += u8"═";
        frame += u8"╦";
        for (int t = 1; t <= col2Width; t++)
            frame += u8"═";
        frame += u8"╦";
        for (int t = 1; t <= col3Width; t++)
            frame += u8"═";
        frame += u8"╗\n";

        // --- Header ---
        std::string midHeader = u8"║";
        std::string h1 = " \033[1mFoods \033[0m";
        h1 += std::string(col1Width - countUTF8Chars(h1), ' ');
        midHeader += h1 + u8"║";

        std::string h2 = " \033[1mStocks \033[0m";
        h2 += std::string(col2Width - countUTF8Chars(h2), ' ');
        midHeader += h2 + u8"║";

        std::string h3 = " \033[1mSelected \033[0m";
        h3 += std::string(col3Width - countUTF8Chars(h3), ' ');
        midHeader += h3 + u8"║\n";

        frame += midHeader;

        // --- Header separator ---
        frame += u8"╠";
        for (int t = 1; t <= col1Width; t++)
            frame += u8"═";
        frame += u8"╬";
        for (int t = 1; t <= col2Width; t++)
            frame += u8"═";
        frame += u8"╬";
        for (int t = 1; t <= col3Width; t++)
            frame += u8"═";
        frame += u8"╣\n";

        // --- Rows ---
        frame += frameInnerDisplay;

        // --- Table lower edge ---
        frame += u8"╚";
        for (int t = 1; t <= col1Width; t++)
            frame += u8"═";
        frame += u8"╩";
        for (int t = 1; t <= col2Width; t++)
            frame += u8"═";
        frame += u8"╩";
        for (int t = 1; t <= col3Width; t++)
            frame += u8"═";
        frame += u8"╝\n";

        // --- Total selections ---
        double total = 0;
        frame += "\nCurrent selections:\n";
        int indFood = 1;
        for (auto &cf : chosenFoods)
        {
            frame += " [" + std::to_string(indFood) + "] " + cf.name + " x" + std::to_string(cf.quantity) + u8" = ₱" + std::to_string(cf.price * cf.quantity) + '\n';
            total += cf.quantity * cf.price;
            indFood++;
        }

        // --- Total display ---
        frame += std::string(4 * 38, ' ') + "\n"; // spacing lines
        std::ostringstream sis;
        sis << std::fixed << std::setprecision(2) << total;
        std::string tot = sis.str();
        frame += u8"\n                                 \n═════════════════════════════════                          ";
        frame += u8"\033[1;32m \nTotal: ₱" + tot + "                                ";
        frame += u8"\033[0m\n═════════════════════════════════                           \n";
        frame += std::string(12 * 46, ' ') + "\n"; // extra spacing at bottom

        std::cout << frame;

        detectKeyboard(index, (int)foods.size() - 1, pressEnter, pressedEsc, pressedPayment, pressedCancelPayment, pressedBackspace);

        // ---- ENTER: add food ----
        if (pressEnter)
        {
            pressEnter = false;
            auto it = std::find_if(chosenFoods.begin(), chosenFoods.end(), [&](auto &cf)
                                   { return cf.name == foods[index].name; });
            auto itFoods = std::find_if(foods.begin(), foods.end(), [&](auto &f)
                                        { return f.name == foods[index].name; });
            if (it != chosenFoods.end())
            {
                if (itFoods != foods.end() && (*itFoods).stock > 0)
                {
                    (*it).quantity++;
                    (*itFoods).stock--;
                    saveMenuToDB(originalRestaurantMenu); // <-- sync stock immediately
                }
            }
            else
            {
                if (itFoods != foods.end() && (*itFoods).stock > 0)
                {
                    chosenFoods.push_back({foods[index].name, 1, foods[index].price});
                    (*itFoods).stock--;
                    saveMenuToDB(originalRestaurantMenu); // <-- sync stock immediately
                }
            }
        }

        // ---- BACKSPACE: remove food ----
        if (pressedBackspace && !chosenFoods.empty())
        {
            pressedBackspace = false;
            auto it = std::find_if(chosenFoods.begin(), chosenFoods.end(), [&](auto &cf)
                                   { return cf.name == foods[index].name; });
            auto itFoods = std::find_if(foods.begin(), foods.end(), [&](auto &f)
                                        { return f.name == foods[index].name; });
            if (it != chosenFoods.end())
            {
                if (it->quantity <= 1)
                {
                    chosenFoods.erase(it);
                    if (itFoods != foods.end())
                        (*itFoods).stock++;
                        saveMenuToDB(originalRestaurantMenu); // <-- sync stock immediately
                }
                else
                {
                    it->quantity--;
                    if (itFoods != foods.end())
                        (*itFoods).stock++;
                        saveMenuToDB(originalRestaurantMenu); // <-- sync stock immediately
                }
            }
        }

        // ---- ESC: exit ----
        if (pressedEsc)
        {
            pressedEsc = false;
            break;
        }

        // ---- Cancel payment / reset menu ----
        if (pressedCancelPayment)
        {
            for (auto &i : chosenFoods)
            {
                auto it = std::find_if(foods.begin(), foods.end(), [&](auto &f)
                                       { return f.name == i.name; });

                if (it != foods.end())
                {
                    (*it).stock += i.quantity;
                    i.quantity = 0;
                    auto it2 = std::find_if(chosenFoods.begin(), chosenFoods.end(), [&](auto &f)
                                            { return f.name == i.name; });
                    chosenFoods.erase(it2);
                }
            }
            // for (auto it = chosenFoods.begin(); it != chosenFoods.end();)
            // {
            //     if (std::find_if(foods.begin(), foods.end(), [&](auto &f)
            //                      { return f.name == it->name; }) != foods.end())
            //     {
            //         it = chosenFoods.erase(it);
            //     }
            //     else
            //         ++it;
            // }
        }
    }
}

void getTabLin()
{
}

// ---------- Menu selection (updated types) ----------
void menuSelection(
    std::vector<MenuCategory> &restaurantMenu,
    float &accumilator, float &dt, float &speed,
    std::chrono::high_resolution_clock::time_point &lastFrame,
    std::vector<std::pair<std::string, std::string>> &colors,
    std::vector<std::pair<std::string, std::string>> &paymentColors,
    float &payAccumilator, float &paydt, float &payspeed)
{
    removeCursor();
    bool choosing = true;
    int menuIndex = 0;
    bool pressEnter = false;
    bool pressedEsc = false;
    bool pressedPayment = false;
    bool pressedCancelPayment = false;
    bool pressedBackspace = false;
    bool initialClear = false;
    std::vector<ChosenFood> chosenFoods; // updated type
    while (choosing)
    {
        if (initialClear)
        {
            properClear();
        }
        else
        {
            hardClear();
            initialClear = true;
        }
        std::string frame;
        std::string introPhrase = "Welcome to our restaurant (ENTER to open, P to payment, ESC to exit)";
        introduction(accumilator, dt, speed, frame, lastFrame, introPhrase, colors);
        for (int i = 0; i < (int)restaurantMenu.size(); i++)
        {
            if (i == menuIndex)
            {
                frame += u8" ► " + std::string("\033[1;92m") + restaurantMenu[i].name + "\033[0m" + "                                                                         " + '\n';
            }
            else
            {
                frame += "   " + restaurantMenu[i].name + "                                                                                   " + '\n';
            }
        }

        double total = 0;
        if (!chosenFoods.empty())
        {
            frame += "\n\n\n\nCurrent selections across menus:                                 \n";
            int ind = 1;
            for (auto &cf : chosenFoods)
            {
                std::ostringstream oss;
                double iprice = cf.quantity * cf.price;
                oss << std::fixed << std::setprecision(2) << iprice;
                std::string formattedShit = oss.str();
                frame += " [" + std::to_string(ind) + "] " + cf.name + " x" + std::to_string(cf.quantity) + u8" = ₱" + formattedShit + '\n';
                total += iprice;
                ind++;
            }
            std::ostringstream sis;
            sis << std::fixed << std::setprecision(2) << total;
            std::string tot = sis.str();
            frame += u8"\n═════════════════════════════════                          ";
            frame += u8"\033[1;32m \nTotal: ₱" + tot + "                                ";
            frame += u8"\033[0m\n═════════════════════════════════                           \n";

            std::string paymentPhrase = "PRESS 'P' FOR PAYMENT :)";
            introduction(payAccumilator, paydt, payspeed, frame, lastFrame, paymentPhrase, paymentColors);
        }

        std::cout << frame;

        detectKeyboard(menuIndex, (int)restaurantMenu.size() - 1, pressEnter, pressedEsc, pressedPayment, pressedCancelPayment, pressedBackspace);

        if (pressEnter)
        {
            pressEnter = false;
            std::string foodIntroPhrase = "Select your food (ENTER to add, BACKSPACE to decrease, ESC to go back, C to cancel current menu)";
            chooseFood(menuIndex, restaurantMenu[menuIndex].foods, chosenFoods, accumilator, dt, speed, lastFrame, foodIntroPhrase, choosing, 30, 35, colors, restaurantMenu);
            initialClear = false;
        }

        if (pressedEsc)
        {
            pressedEsc = false;
            break;
        }

        if (pressedPayment)
        {
            paymentProcess(chosenFoods, choosing);
        }
    }
}

// ---------- main (constructing restaurant menu with structs) ----------

/**
 * COMMANDS:
 * 
 * g++ food.cpp database.cpp -o main.exe
 */

int main()
{
    SetConsoleOutputCP(CP_UTF8);
    SetConsoleCP(CP_UTF8);

    float accumilator = 0;
    float dt = 0;
    float speed = 0.9f;
    float payAccumilator = 0;
    float paydt = 0;
    float paySpeed = 3.9f;
    auto lastFrame = std::chrono::high_resolution_clock::now();
    std::vector<std::pair<std::string, std::string>> colors = {
        {"\033[1;91m", "\033[0m"}, {"\033[1;92m", "\033[0m"}, {"\033[1;93m", "\033[0m"}, {"\033[1;94m", "\033[0m"}, {"\033[1;95m", "\033[0m"}, {"\033[1;96m", "\033[0m"}, {"\033[1;97m", "\033[0m"}};
    std::vector<std::pair<std::string, std::string>> paymentColors = {
        {"\033[1;91m", "\033[0m"}, {"\033[1;95m", "\033[0m"}, {"\033[1;94m", "\033[0m"}, {"\033[1;96m", "\033[0m"}, {"\033[1;92m", "\033[0m"}, {"\033[1;93m", "\033[0m"}, {"\033[1;97m", "\033[0m"}};

    // Load menu from database
    std::vector<MenuCategory> restaurantMenu = loadMenuFromDB();

    // If DB empty, fill default menu
    if (restaurantMenu.empty())
    {
        restaurantMenu = {
        {"🍔 Food Menu",
         {
             {120, "Fries", 50},
             {150, "Burger", 50},
             {180, "Cheese Burger", 50},
             {200, "Bacon Burger", 50},
             {130, "Hotdog", 50},
             {220, "Pizza Slice", 50},
         }},
        {"🍰 Dessert Menu",
         {
             {100, "Cookies", 50},
             {120, "Cupcake", 50},
             {110, "Donut", 50},
             {140, "Ice Cream", 50},
             {160, "Cheesecake", 50},
             {170, "Apple Pie", 50},
         }},
        {"🥤 Drinks Menu",
         {
             {100, "Soda", 50},
             {120, "Juice", 50},
             {140, "Coffee", 50},
             {150, "Milk Tea", 50},
             {180, "Beer", 50},
             {200, "Wine", 50},
         }}};
        saveMenuToDB(restaurantMenu);
    }

    // Pass a lambda to save stock changes after each payment
    menuSelection(restaurantMenu, accumilator, dt, speed, lastFrame, colors, paymentColors, payAccumilator, paydt, paySpeed);

    // Save final stock back to database
    saveMenuToDB(restaurantMenu);

    return 0;
}
