#include <iostream>
#include <vector>
#include <chrono>
#include <windows.h>
#include <conio.h>
#include "map.h"

void properClear()
{
    COORD coordinate = {0, 0};
    HANDLE hout = GetStdHandle(STD_OUTPUT_HANDLE);
    SetConsoleCursorPosition(hout, coordinate);
}

void cursorVisibilityStatus(bool stat)
{
    HANDLE hout = GetStdHandle(STD_OUTPUT_HANDLE);
    CONSOLE_CURSOR_INFO cursorInfo;
    GetConsoleCursorInfo(hout, &cursorInfo);
    cursorInfo.bVisible = stat;
    SetConsoleCursorInfo(hout, &cursorInfo);
}

struct Bot
{
    int x, y;
};

// Directions: up, down, left, right
int dx[4] = {0, 0, -1, 1};
int dy[4] = {-1, 1, 0, 0};

void moveBotRandomly(Bot &bot, const std::vector<std::vector<int>> &map)
{
    std::vector<int> validMoves;

    for (int i = 0; i < 4; i++)
    {
        int nx = bot.x + dx[i];
        int ny = bot.y + dy[i];

        if (ny >= 0 && ny < map.size() && nx >= 0 && nx < map[0].size() && map[ny][nx] == 1)
        {
            validMoves.push_back(i);
        }
    }

    if (!validMoves.empty())
    {
        int choice = validMoves[rand() % validMoves.size()];
        bot.x += dx[choice];
        bot.y += dy[choice];
    }
}

void hardClear()
{
#if _WIN32
    system("cls");
#else
    system("clear");
#endif
}

std::vector<std::vector<int>> map = {
    {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
};

int main()
{
    SetConsoleCP(CP_UTF8);
    SetConsoleOutputCP(CP_UTF8);

    bool animate = true;
    int hero_x_pos = 5, hero_y_pos = 5;
    int camWidth = 20, camHeight = 20;
    int maxCamWidth = 200, maxCamHeight = 200;
    int cam_x_pos, cam_y_pos;
    const int NUM_BOTS = 30;

    std::vector<std::vector<int>> map = generateDungeon(hero_x_pos, hero_y_pos);

    bool initialClear = false;

    std::vector<Bot> bots(NUM_BOTS);
    for (int i = 0; i < NUM_BOTS; i++)
    {
        while (true)
        {
            int x = rand() % map[0].size();
            int y = rand() % map.size();

            if (map[y][x] == 1)
            {
                bots[i].x = x;
                bots[i].y = y;
                break;
            }
        }
    }

    while (animate)
    {
        cursorVisibilityStatus(false);
        if (initialClear)
        {
            properClear();
        }
        else
        {
            hardClear();
            initialClear = true;
        }

        // set camera position relative to the map and center to the hero
        cam_x_pos = hero_x_pos - camWidth / 2;
        cam_y_pos = hero_y_pos - camHeight / 2;

        // render camera view
        for (int cam_h = 0; cam_h < camHeight; cam_h++)
        {
            for (int cam_w = 0; cam_w < camWidth; cam_w++)
            {
                int worldX = cam_x_pos + cam_w;
                int worldY = cam_y_pos + cam_h;
                // Check boundaries
                // if (worldY < 0 || worldY >= map.size() || worldX < 0 || worldX >= map[0].size())
                // {
                //     std::cout << "██";
                //     continue;
                // }

                // this has no error on map rendering
                // if (worldX == hero_x_pos && worldY == hero_y_pos)
                //     std::cout << u8"😊";
                // else if (map[worldY][worldX] == 0)
                //     std::cout << "██";
                // else if (map[worldY][worldX] == 1)
                //     std::cout << u8"  ";
                // else if (map[worldY][worldX] == 2)
                //     std::cout << u8"⛰️";

                // if (worldX <= 0 || worldX >= map[0].size() || worldY <= 0 || worldY >= map.size() || map[worldY][worldX] == 0)
                // {
                //     std::cout << u8"\033[32m██\033[0m";
                //     continue;
                // }

                // bool printed = false;

                // if (worldY == hero_y_pos && worldX == hero_x_pos)
                // {
                //     std::cout << u8"😒";
                // }

                // for (auto &b : bots)
                // {
                //     if (worldX == b.x && worldY == b.y)
                //     {
                //         std::cout << u8"👾";
                //         printed = true;
                //         break;
                //     }
                // }

                // // this has error
                // if (printed)
                // {
                //     if (map[worldY][worldX] == 0)
                //     {
                //         std::cout << u8"\033[32m██\033[0m";
                //     }
                //     else if (map[worldY][worldX] == 1)
                //     {
                //         std::cout << u8"  ";
                //     }
                // }

                if (worldX <= 0 || worldX >= map[0].size() ||
                    worldY <= 0 || worldY >= map.size() ||
                    map[worldY][worldX] == 0)
                {
                    std::cout << u8"\033[32m██\033[0m";
                    continue;
                }

                if (worldX == hero_x_pos && worldY == hero_y_pos)
                {
                    std::cout << u8"😒";
                    continue;
                }

                bool botHere = false;
                for (const auto &b : bots)
                {
                    if (worldX == b.x && worldY == b.y)
                    {
                        std::cout << u8"👾";
                        botHere = true;
                        break;
                    }
                }
                if (botHere)
                {
                    continue;
                }

                // FLOOR (default)
                std::cout << u8"  ";
            }
            std::cout << '\n';
        }

        if (_kbhit())
        {
            // char k = _getch();
            int new_hero_x_pos = hero_x_pos, new_hero_y_pos = hero_y_pos;
            int new_cam_width = camWidth, new_cam_height = camHeight;

            // if (k == 'w')
            // {
            //     new_hero_y_pos--;
            // }
            // else if (k == 's')
            // {
            //     new_hero_y_pos++;
            // }
            // else if (k == 'a')
            // {
            //     new_hero_x_pos--;
            // }
            // else if (k == 'd')
            // {
            //     new_hero_x_pos++;
            // }

            int k = _getch();

            if (k == 27)
                break; // ESC

            if (k == 0 || k == 224)
            {
                // Extended key (arrows, function keys)
                int j = _getch();
                switch (j)
                {
                case 72:
                    new_hero_y_pos--;
                    break;
                case 80:
                    new_hero_y_pos++;
                    break;
                case 75:
                    new_hero_x_pos--;
                    break;
                case 77:
                    new_hero_x_pos++;
                    break;
                }
            }
            else
            {
                // Normal / Ctrl key detection
                switch (k)
                {
                case 'w':
                    new_hero_y_pos--;
                    break;
                case 's':
                    new_hero_y_pos++;
                    break;
                case 'a':
                    new_hero_x_pos--;
                    break;
                case 'd':
                    new_hero_x_pos++;
                    break;
                // case 45: // ctrl + '+'
                //     new_cam_width++;
                //     new_cam_height++;
                //     break;
                // case 43: // ctrl + '-'
                //     new_cam_width--;
                //     new_cam_height--;
                //     break;
                case '[':
                    new_cam_width--;
                    new_cam_height--;
                    hardClear();
                    break;
                case ']':
                    new_cam_width++;
                    new_cam_height++;
                    hardClear();
                    break;
                    break;

                default:
                    break;
                }
            }

            if (
                map[new_hero_y_pos][new_hero_x_pos] == 1)
            {
                hero_x_pos = new_hero_x_pos;
                hero_y_pos = new_hero_y_pos;
            }

            if (new_cam_width <= maxCamWidth || new_cam_height <= maxCamHeight)
            {
                camWidth = new_cam_width;
                camHeight = new_cam_height;
            }
        }
        for (auto &b : bots)
        {
            moveBotRandomly(b, map);
        }
    }
    cursorVisibilityStatus(true);

    return 0;
}