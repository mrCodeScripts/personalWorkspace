#include <iostream>
#include <chrono>
#include <thread>

const int MAP_W = 10;
const int MAP_H = 20;

// 4x4 shape (T piece example)
int piece[4][4] = {
    {0,0,0,0},
    {1,1,1,0},
    {0,1,0,0},
    {0,0,0,0}
};

// piece position in the map
int pieceX = 3;   // column
int pieceY = 0;   // row

void clearScreen()
{
    std::cout << "\x1b[2J\x1b[H";
}

void render()
{
    clearScreen();

    for (int y = 0; y < MAP_H; y++)
    {
        for (int x = 0; x < MAP_W; x++)
        {
            bool drawBlock = false;

            // check if current map cell overlaps the piece
            for (int py = 0; py < 4; py++)
            {
                for (int px = 0; px < 4; px++)
                {
                    if (piece[py][px] == 1)
                    {
                        int worldX = pieceX + px;
                        int worldY = pieceY + py;

                        if (worldX == x && worldY == y)
                            drawBlock = true;
                    }
                }
            }

            std::cout << (drawBlock ? "#" : ".");
        }
        std::cout << "\n";
    }
}

int main()
{
    using clock = std::chrono::steady_clock;

    auto last = clock::now();

    while (true)
    {
        auto now = clock::now();
        std::chrono::duration<float> dt = now - last;

        if (dt.count() >= 0.5f)   // fall every 0.5 seconds
        {
            pieceY++;            // THIS IS THE ONLY "MOVEMENT"
            last = now;
        }

        render();
        std::this_thread::sleep_for(std::chrono::milliseconds(16));
    }
}
