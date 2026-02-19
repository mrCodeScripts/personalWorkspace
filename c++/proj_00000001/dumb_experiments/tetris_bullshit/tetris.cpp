#include <iostream>
#include <vector>
#include <chrono>
#include <thread>
#include <random>

constexpr int MAP_WIDTH  = 10;
constexpr int MAP_HEIGHT = 20;

// ---------------- MAP ----------------
int map[MAP_HEIGHT][MAP_WIDTH] = {0};

// ---------------- TETROMINOES (4x4) ----------------
const int TETROMINOES[7][4][4] = {
    // I
    {
        {0,0,0,0},
        {1,1,1,1},
        {0,0,0,0},
        {0,0,0,0}
    },
    // O
    {
        {0,1,1,0},
        {0,1,1,0},
        {0,0,0,0},
        {0,0,0,0}
    },
    // T
    {
        {0,1,0,0},
        {1,1,1,0},
        {0,0,0,0},
        {0,0,0,0}
    },
    // S
    {
        {0,1,1,0},
        {1,1,0,0},
        {0,0,0,0},
        {0,0,0,0}
    },
    // Z
    {
        {1,1,0,0},
        {0,1,1,0},
        {0,0,0,0},
        {0,0,0,0}
    },
    // J
    {
        {1,0,0,0},
        {1,1,1,0},
        {0,0,0,0},
        {0,0,0,0}
    },
    // L
    {
        {0,0,1,0},
        {1,1,1,0},
        {0,0,0,0},
        {0,0,0,0}
    }
};

// ---------------- CURRENT PIECE ----------------
int pieceX;
int pieceY;
int pieceIndex;

// ---------------- RNG ----------------
std::mt19937 rng(std::random_device{}());

// ---------------- SPAWN ----------------
void spawnPiece()
{
    pieceIndex = rng() % 7;
    pieceX = MAP_WIDTH / 2 - 2;
    pieceY = 0;
}

// ---------------- COLLISION ----------------
bool canMove(int newX, int newY)
{
    for (int y = 0; y < 4; y++)
    {
        for (int x = 0; x < 4; x++)
        {
            if (TETROMINOES[pieceIndex][y][x])
            {
                int mapX = newX + x;
                int mapY = newY + y;

                if (mapX < 0 || mapX >= MAP_WIDTH ||
                    mapY < 0 || mapY >= MAP_HEIGHT)
                    return false;

                if (map[mapY][mapX])
                    return false;
            }
        }
    }
    return true;
}

// ---------------- LOCK PIECE ----------------
void lockPiece()
{
    for (int y = 0; y < 4; y++)
    {
        for (int x = 0; x < 4; x++)
        {
            if (TETROMINOES[pieceIndex][y][x])
            {
                map[pieceY + y][pieceX + x] = 1;
            }
        }
    }
}

// ---------------- RENDER ----------------
void render()
{
    system("cls"); // Windows (use "clear" on Linux)

    for (int y = 0; y < MAP_HEIGHT; y++)
    {
        std::cout << "|";
        for (int x = 0; x < MAP_WIDTH; x++)
        {
            bool drawPiece = false;

            for (int py = 0; py < 4; py++)
            {
                for (int px = 0; px < 4; px++)
                {
                    if (TETROMINOES[pieceIndex][py][px])
                    {
                        if (pieceX + px == x && pieceY + py == y)
                            drawPiece = true;
                    }
                }
            }

            if (drawPiece)
                std::cout << "O";
            else if (map[y][x])
                std::cout << "#";
            else
                std::cout << " ";
        }
        std::cout << "|\n";
    }

    for (int i = 0; i < MAP_WIDTH + 2; i++)
        std::cout << "-";
    std::cout << "\n";
}

// ---------------- MAIN ----------------
int main()
{
    spawnPiece();

    auto lastTime = std::chrono::steady_clock::now();
    float accumulator = 0.0f;
    const float DROP_SPEED = 5.0f; // cells per second

    while (true)
    {
        auto now = std::chrono::steady_clock::now();
        float dt = std::chrono::duration<float>(now - lastTime).count();
        lastTime = now;

        accumulator += DROP_SPEED * dt;

        while (accumulator >= 1.0f)
        {
            if (canMove(pieceX, pieceY + 1))
                pieceY++;
            else
            {
                lockPiece();
                spawnPiece();
            }

            accumulator -= 1.0f;
        }

        render();
        std::this_thread::sleep_for(std::chrono::milliseconds(16));
    }
}
