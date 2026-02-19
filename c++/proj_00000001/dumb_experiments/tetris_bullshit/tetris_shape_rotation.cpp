#include <iostream>
#include <vector>
#include <chrono>
#include <windows.h>
#include <thread>
#include <variant>

void hardClear () {
    #if _WIN32
        system("cls");
    #else
        system("clear");
    #endif
}

void properClear () {
    COORD coordinate = {0, 0};
    HANDLE hout = GetStdHandle(STD_OUTPUT_HANDLE);
    SetConsoleCursorPosition(hout, coordinate);
}

int main()
{
    SetConsoleCP(CP_UTF8);
    SetConsoleOutputCP(CP_UTF8);

    int shape_w = 4, shape_h = 4;
    int shape[shape_h][shape_w] = {
        {0, 1, 1, 0},
        {0, 0, 1, 0},
        {0, 0, 1, 0},
        {0, 0, 1, 0},
    };

    // std::vector<std::string> snakeHead = {
    //     u8"  Y  ",
    //     u8".-^-.",
    //    u8"/     \/",
    //   u8"()     ()"
    //    u8"\_   _/"
    // };

    auto lastFrame = std::chrono::high_resolution_clock::now();
    float speed = 0.7f;
    float accumilator = 0.0f;

    bool animate = true;
    bool initialClear = false;
    while (animate)
    {
        if (initialClear) {
            properClear();
            // hardClear();
        } else {
            hardClear();
            initialClear = true;
        }

        auto now = std::chrono::high_resolution_clock::now();
        std::chrono::duration<float> elapsedTime = now - lastFrame;
        float dt = elapsedTime.count();
        lastFrame = now;
        accumilator += speed * dt;

        while (accumilator >= 0.9f)
        {
            int N = shape_w;
            int tempShape[shape_h][shape_w] = {0};
            // temp
            for (int i = 0; i < shape_h; i++)
            {
                for (int j = 0; j < shape_w; j++) {
                    tempShape[j][N-1-i] = shape[i][j];
                }
            }
            // copy
            for (int i = 0; i < shape_h; i++)
            {
                for (int j = 0; j < shape_w; j++) {
                    shape[i][j] = tempShape[i][j];
                }
            }
            accumilator -= 0.9f;
        }

        // render
        for (int i = 0; i < shape_h; i++)
        {
            for (int j = 0; j < shape_w; j++) {
                if (shape[i][j] == 1)
                    std::cout << u8"\033[31m██\033[0m";
                else
                    std::cout << u8"\033[32m██\033[0m";
            }
            std::cout << std::endl;
        }

        // std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }

    return 0;
}