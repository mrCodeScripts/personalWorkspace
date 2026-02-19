#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
#include <windows.h>
#include <conio.h>

// ---------- Utilities ----------
void properClear() {
    COORD coordinate = {0, 0};
    HANDLE hout = GetStdHandle(STD_OUTPUT_HANDLE);
    SetConsoleCursorPosition(hout, coordinate);
}

void cursorVisibilityStatus(bool stat) {
    HANDLE hout = GetStdHandle(STD_OUTPUT_HANDLE);
    CONSOLE_CURSOR_INFO cursorInfo;
    GetConsoleCursorInfo(hout, &cursorInfo);
    cursorInfo.bVisible = stat;
    SetConsoleCursorInfo(hout, &cursorInfo);
}

// ---------- Map & Bot ----------
const int MAP_SIZE = 20; // For demo, keep 20x20. Change to 200x200 if you want
std::vector<std::vector<int>> map(MAP_SIZE, std::vector<int>(MAP_SIZE, 1)); // 1 = floor, 0 = wall

struct Bot {
    int x, y;
};

// Directions: up, down, left, right
int dx[4] = {0, 0, -1, 1};
int dy[4] = {-1, 1, 0, 0};

// Move bot randomly
void moveBotRandomly(Bot &bot, const std::vector<std::vector<int>> &map) {
    std::vector<int> validMoves;

    for (int i = 0; i < 4; i++) {
        int nx = bot.x + dx[i];
        int ny = bot.y + dy[i];

        if (ny >= 0 && ny < map.size() && nx >= 0 && nx < map[0].size() && map[ny][nx] == 1) {
            validMoves.push_back(i);
        }
    }

    if (!validMoves.empty()) {
        int choice = validMoves[rand() % validMoves.size()];
        bot.x += dx[choice];
        bot.y += dy[choice];
    }
}

// ---------- Main ----------
int main() {
    srand(time(0));
    SetConsoleCP(CP_UTF8);
    SetConsoleOutputCP(CP_UTF8);
    cursorVisibilityStatus(false);

    // --- Hero position ---
    int heroX = MAP_SIZE / 2;
    int heroY = MAP_SIZE / 2;

    // --- Create bots ---
    const int NUM_BOTS = 5;
    std::vector<Bot> bots(NUM_BOTS);
    for (int i = 0; i < NUM_BOTS; i++) {
        bots[i].x = rand() % MAP_SIZE;
        bots[i].y = rand() % MAP_SIZE;
    }

    bool running = true;

    while (running) {
        properClear();

        // --- Render map ---
        for (int y = 0; y < MAP_SIZE; y++) {
            for (int x = 0; x < MAP_SIZE; x++) {
                bool printed = false;

                // Hero
                if (x == heroX && y == heroY) {
                    std::cout << u8"😎";
                    printed = true;
                }

                // Bots
                for (auto &b : bots) {
                    if (x == b.x && y == b.y) {
                        std::cout << u8"👾";
                        printed = true;
                        break;
                    }
                }

                // Floor / wall
                if (!printed) {
                    if (map[y][x] == 1) std::cout << "  ";
                    else std::cout << "██";
                }
            }
            std::cout << '\n';
        }

        // --- Input ---
        if (_kbhit()) {
            int k = _getch();
            if (k == 27) running = false; // ESC
            else if (k == 'w') heroY--;
            else if (k == 's') heroY++;
            else if (k == 'a') heroX--;
            else if (k == 'd') heroX++;
        }

        // --- Move bots ---
        for (auto &b : bots) {
            moveBotRandomly(b, map);
        }

        Sleep(200); // pause 200ms per frame
    }

    cursorVisibilityStatus(true);
    return 0;
}
