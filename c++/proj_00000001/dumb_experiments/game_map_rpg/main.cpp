#include <iostream>
#include <vector>
#include <windows.h>
#include <conio.h> // for _kbhit() and _getch()
#include <chrono>

void properClear()
{
    COORD coordinate = {0, 0};
    HANDLE hout = GetStdHandle(STD_OUTPUT_HANDLE);
    SetConsoleCursorPosition(hout, coordinate);
}

void hardClear()
{
#if _WIN32
    system("cls");
#else
    system("clear");
#endif
}

// Map legend: 0 = wall, 1 = ground, 2 = rock
std::vector<std::vector<int>> map = {
    {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
};

int main()
{
    SetConsoleCP(CP_UTF8);
    SetConsoleOutputCP(CP_UTF8);

    const int cam_w = 10, cam_h = 10;
    int hero_x = 5, hero_y = 5; // hero world position
    int cam_x, cam_y;
    bool initialClear = false;

    auto lastFrame = std::chrono::high_resolution_clock::now();
    float speed = 0.9f;
    float accumilator = 0.0f;

    float heroMovementSpeed = 0.9f;
    float heroMovementAccumilator = 0.0f;

    while (true)
    {

        auto nowFrame = std::chrono::high_resolution_clock::now();
        std::chrono::duration<float> elapsedTime = nowFrame - lastFrame;
        float dt = elapsedTime.count();
        lastFrame = nowFrame;

        if (initialClear)
        {
            properClear();
        }
        else
        {
            hardClear();
            initialClear = true;
        }

        // Camera centered on hero
        cam_x = hero_x - cam_w / 2;
        cam_y = hero_y - cam_h / 2;

        // Render camera view
        for (int y = 0; y < cam_h; y++)
        {
            for (int x = 0; x < cam_w; x++)
            {
                int worldX = cam_x + x;
                int worldY = cam_y + y;

                // Check boundaries
                if (worldY < 0 || worldY >= map.size() || worldX < 0 || worldX >= map[0].size())
                {
                    std::cout << "██";
                    continue;
                }

                if (worldX == hero_x && worldY == hero_y)
                    std::cout << u8"😊";
                else if (map[worldY][worldX] == 0)
                    std::cout << "██";
                else if (map[worldY][worldX] == 1)
                    std::cout << u8"  ";
                else if (map[worldY][worldX] == 2)
                    std::cout << u8"⛰️";
            }
            std::cout << "\n";
        }

        // Handle input
        // other updates (other resources of the game)
        accumilator += speed * dt;
        if (accumilator >= 0.9f)
        {

            accumilator -= 0.9f;
        }

        // separated hero movement speed based on dt
        heroMovementAccumilator += heroMovementSpeed * dt;
        if (heroMovementAccumilator >= 1.0f)
        {
            // check input for movement
            if (_kbhit())
            {
                char ch = _getch();
                int new_x = hero_x, new_y = hero_y;

                if (ch == 'w')
                    new_y--;
                else if (ch == 's')
                    new_y++;
                else if (ch == 'a')
                    new_x--;
                else if (ch == 'd')
                    new_x++;

                // collision check
                if (map[new_y][new_x] != 0 && map[new_y][new_x] != 2)
                {
                    hero_x = new_x;
                    hero_y = new_y;
                }
            }

            heroMovementAccumilator -= 1.0f; // subtract 1 tile
        }

        // Sleep(100); // slow down loop
    }

    return 0;
}
