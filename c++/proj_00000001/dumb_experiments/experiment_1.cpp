#include <iostream>
#include <chrono>
#include <thread>
#include <windows.h>
#include "TermUtils.h"
#include <vector>
#include <sstream>
#include <iomanip>
#include <utility>
#include <random>

std::vector<std::vector<int>> map = {
    {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
};

void properClear()
{
    HANDLE hout = GetStdHandle(STD_OUTPUT_HANDLE);
    COORD coordinate = {0, 0};
    SetConsoleCursorPosition(hout, coordinate);
    // std::cout << "\x1b[2J\x1b[H";
}

// void properClear()
// {
//     HANDLE hOut = GetStdHandle(STD_OUTPUT_HANDLE);
//     CONSOLE_SCREEN_BUFFER_INFO csbi;
//     DWORD cellCount;
//     DWORD count;
//     COORD homeCoords = {0, 0};

//     if (!GetConsoleScreenBufferInfo(hOut, &csbi))
//         return;

//     cellCount = csbi.dwSize.X * csbi.dwSize.Y;

//     FillConsoleOutputCharacter(hOut, ' ', cellCount, homeCoords, &count);
//     FillConsoleOutputAttribute(hOut, csbi.wAttributes, cellCount, homeCoords, &count);
//     SetConsoleCursorPosition(hOut, homeCoords);
// }

void hardClear()
{
#ifdef _WIN32
    system("cls");
#else
    system("clear");
#endif
}

void updateSnake(std::vector<std::pair<int, int>> &snake_body, std::pair<int, int> &dir)
{
    std::pair<int, int> newSegment = {
        snake_body[0].first + dir.first,
        snake_body[0].second + dir.second};
    snake_body.insert(snake_body.begin(), newSegment);
    snake_body.pop_back();
}

void generateFood (std::vector<std::vector<int>> &map) {
    // static std::mt19937 gen(std::random_device{}()); // static RNG

}

void renderMap(int mapWidth, int mapHeight, std::vector<std::pair<int, int>> &snake_body)
{
    for (int i = 0; i < mapHeight; i++)
    {
        for (int j = 0; j < mapWidth; j++)
        {
            bool theres_a_snake_segment = false;
            for (int s = 0; s < snake_body.size(); s++)
            {
                if (snake_body[s].second == i && snake_body[s].first == j)
                    theres_a_snake_segment = true;
            }

            if (theres_a_snake_segment)
            {
                std::cout << "\033[1;32m0\033[0m";
            }
            else if (i == 0)
            {

                if (j == 0)
                {
                    std::cout << u8"╔";
                }
                else if (j == mapWidth - 1)
                {
                    std::cout << u8"╗";
                }
                else
                {
                    std::cout << u8"═";
                }
            }
            else if (i == mapHeight - 1)
            {
                if (j == 0)
                {
                    std::cout << u8"╚";
                }
                else if (j == mapWidth - 1)
                {
                    std::cout << u8"╝";
                }
                else
                {
                    std::cout << u8"═";
                }
            } else if ((i > 0 && i < mapWidth - 1) && (j == 0 || j == mapWidth - 1)) {
                std::cout << u8"║";
            }
            else
            {
                std::cout << ' ';
            }
        }
        std::cout << std::endl;
    }
}

void direction(std::pair<int, int> &dir)
{
    auto key = TermUtils::detectKey("keyboard_detector");
    if (key == "pressedArrowUp")
        dir = {0, -1};
    if (key == "pressedArrowDown")
        dir = {0, 1};
    if (key == "pressedArrowRight")
        dir = {1, 0};
    if (key == "pressedArrowLeft")
        dir = {-1, 0};
}

int main()
{
    SetConsoleOutputCP(CP_UTF8);
    SetConsoleCP(CP_UTF8);
    // using clock = std::chrono::steady_clock;
    int mapWidth = 50;
    int mapHeight = 50;
    int counter = 0;
    auto lastFrame = std::chrono::high_resolution_clock::now();
    bool animate = true;
    bool initialClear = false;
    std::vector<int> storage;

    std::pair<int, int> dir = {1, 0};
    std::pair<int, int> terminal_size = TermUtils::getTerminalSize();
    std::vector<std::pair<int, int>> snake_body = {{0, 0}, {1, 0}, {2, 0}, {3, 0}, {4, 0}};

    float accumilator = 0.0f;
    float speed = 50.2f;

    while (animate)
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

        auto now = std::chrono::high_resolution_clock::now();

        std::chrono::duration<float> elapsed = now - lastFrame;
        float dt = elapsed.count();
        accumilator += speed * dt;
        lastFrame = now;

        std::cout << std::to_string(accumilator) << std::endl;

        while (accumilator >= 0.9f)
        {
            counter++;
            storage.push_back(counter);
            direction(dir);
            updateSnake(snake_body, dir);
            // accumilator -= 0.9f; // this will make the snake even far more faster over time
            accumilator = 0.0f;
        }

        renderMap(mapWidth, mapHeight, snake_body);

        // std::cout << "Delta time: " << deltaTime << "\n\n" << std::endl;

        // for (int i = 0; i < storage.size(); i++)
        // {
        //     std::cout << std::setw(5) << storage[i];
        // }
        // std::ostringstream ons;
        // ons << "x-direction: " << dir.first << ", y-direction: " << dir.second;
        // std::cout << ons.str() << std::string(terminal_size.first - ons.str().size(), ' ') << std::endl;
        // for (int i = 0; i < snake_body.size(); i++)
        // {
        //     std::cout << "[" << snake_body[i].first << ", " << snake_body[i].second << "]" << std::endl;
        // }

        // std::cout << "shit";
        // std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
}



/*
=======================================================================
SNAKE GAME LOGIC DOCUMENTATION
=======================================================================

1. FRAME-INDEPENDENT MOVEMENT (DELTA TIME + ACCUMULATOR)
-----------------------------------------------------------------------
- We initially updated the snake in the main while loop without considering
  elapsed time. This tied snake speed directly to the computer's performance:
  faster computers made the snake move too fast, slower ones too slow.

- Using "delta time" (dt) with an accumulator allows us to decouple
  game logic (snake movement) from rendering:
    accumilator += speed * dt;

- Whenever the accumulator reaches the "step threshold" (0.9 in our case),
  we process one logical movement of the snake:
    while (accumilator >= 0.9f) { update snake; accumilator -= 0.9f; }

- This ensures:
    * Movement is smooth on all hardware.
    * Game speed is consistent regardless of frame rate.
    * Multiple logic steps can occur per frame if dt is large.

LESSON:
Always separate **logic update** from **rendering** using delta time 
and an accumulator for consistent speed.

-----------------------------------------------------------------------
2. COMMON MISUNDERSTANDINGS
-----------------------------------------------------------------------
- "The accumulator should always go above 0.9 to move faster"
  ❌ WRONG interpretation:
    * The accumulator just tracks elapsed "movement units".
    * Speed controls how fast it accumulates.
    * The snake may jump multiple steps per frame if accumulator is
      high, but the visual rendering still only shows current positions.
    
- "Using while(accumulator >= 0.9) breaks rendering or makes it slow"
  ❌ PARTIALLY TRUE:
    * Looping multiple updates per frame can feel like skipped steps if speed
      is too high or map is too big.
    * It is not a logic bug; it's the snake catching up with time.
    * Skipping appearance can be mitigated with **interpolation**, but for
      a console snake it’s unnecessary.

- "I need sleep or delay to move faster"
  ❌ WRONG:
    * Using sleep/milliseconds only limits frame rate.
    * Actual speed should be controlled by `speed` and delta time logic,
      not by sleeping the CPU.

-----------------------------------------------------------------------
3. RENDERING AND LOGIC SEPARATION
-----------------------------------------------------------------------
- Rendering should **only draw the snake at its current positions**.
- Logic updates (moving the snake) are handled separately in the accumulator loop.
- Console UI flickering can happen if `hardClear()` is called every frame:
    * Better approach: `properClear()` using SetConsoleCursorPosition(0,0)
      to overwrite previous frame without clearing everything.
- Looping over the snake body for rendering is fast for console-sized maps;
  the bottleneck is usually clearing and printing the map, not logic.

-----------------------------------------------------------------------
4. SPEED AND ACCUMULATOR INSIGHTS
-----------------------------------------------------------------------
- `speed` represents how many logical units per second the snake should move.
- `accumulator` represents "time passed in logic units".
- Movement happens when accumulator >= step threshold.
- Increasing `speed` increases the **frequency of logic updates**,
  independent of render frames.
- This makes the snake move faster **in real time**, without relying
  on sleeping or frame rate.

- If accumulator jumps multiple steps per frame (high speed or big dt),
  the snake may visually "skip" grid steps:
    * This is normal and expected.
    * Not a bug — logic is keeping up with real time.
    * Optional: interpolate for smoother visual, but unnecessary for console.

-----------------------------------------------------------------------
5. KEY LESSONS LEARNED
-----------------------------------------------------------------------
1. **Always separate game logic from rendering** — frame-independent movement
   is critical for consistent behavior.
2. **Delta time (dt) is your friend** — it accounts for variable frame rates.
3. **Accumulator + fixed timestep** ensures smooth logic updates even if
   frame rendering fluctuates.
4. **Logic speed ≠ frame rate** — speed is in units per second, rendering is just display.
5. **Avoid using `system("cls")` every frame** — use cursor repositioning for smooth console updates.
6. **Multiple logic steps per frame are okay** — accumulator ensures time consistency.
7. **Skipped steps are normal at high speed or large maps** — console is limited visually.
8. **Interpolation is optional** for smooth visuals — needed only for graphical UI, not console.

-----------------------------------------------------------------------
SUMMARY
-----------------------------------------------------------------------
- Properly using delta time + accumulator decouples movement from rendering.
- Snake speed is controlled by a **logical units per second** variable.
- While loops for logic updates handle multiple steps per frame if needed.
- Proper cursor clearing prevents flickering and UI destruction.
- Understanding accumulator mechanics avoids misinterpretation of speed.

=======================================================================
*/
