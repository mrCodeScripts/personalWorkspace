#include <vector>
#include <cstdlib>
#include <ctime>

constexpr int WIDTH  = 200;
constexpr int HEIGHT = 200;

std::vector<std::vector<int>> generateDungeon(int& heroX, int& heroY)
{
    std::vector<std::vector<int>> map(HEIGHT, std::vector<int>(WIDTH, 0));
    auto carveRoom = [&](int x, int y, int w, int h)
    {
        for (int i = y; i < y + h; i++)
            for (int j = x; j < x + w; j++)
                if (i > 0 && i < HEIGHT - 1 && j > 0 && j < WIDTH - 1)
                    map[i][j] = 1;
    };

    auto carveCorridor = [&](int x1, int y1, int x2, int y2)
    {
        int x = x1, y = y1;
        while (x != x2)
        {
            map[y][x] = 1;
            x += (x2 > x) ? 1 : -1;
        }
        while (y != y2)
        {
            map[y][x] = 1;
            y += (y2 > y) ? 1 : -1;
        }
        map[y][x] = 1;
    };

    std::srand(static_cast<unsigned>(std::time(nullptr)));

    struct Room { int x, y, w, h; };
    std::vector<Room> rooms;

    // Generate rooms
    for (int i = 0; i < 60; i++)
    {
        int w = 8 + std::rand() % 20;
        int h = 8 + std::rand() % 20;
        int x = 1 + std::rand() % (WIDTH  - w - 2);
        int y = 1 + std::rand() % (HEIGHT - h - 2);

        carveRoom(x, y, w, h);
        rooms.push_back({x, y, w, h});
    }

    // Connect rooms
    for (size_t i = 1; i < rooms.size(); i++)
    {
        int x1 = rooms[i - 1].x + rooms[i - 1].w / 2;
        int y1 = rooms[i - 1].y + rooms[i - 1].h / 2;
        int x2 = rooms[i].x     + rooms[i].w / 2;
        int y2 = rooms[i].y     + rooms[i].h / 2;

        carveCorridor(x1, y1, x2, y2);
    }

    // Seal borders
    for (int i = 0; i < WIDTH; i++)
        map[0][i] = map[HEIGHT - 1][i] = 0;
    for (int i = 0; i < HEIGHT; i++)
        map[i][0] = map[i][WIDTH - 1] = 0;

    // Pick random hero spawn on walkable tile
    do
    {
        heroX = 1 + std::rand() % (WIDTH  - 2);
        heroY = 1 + std::rand() % (HEIGHT - 2);
    }
    while (map[heroY][heroX] == 0);

    return map;
}

