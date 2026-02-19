#include <iostream>
#include <vector>
#include <queue>
#include <thread>
#include <chrono>
#include <iomanip> // for setw
#include <algorithm>
#include <windows.h>

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

void hardClear()
{
#if _WIN32
    system("cls");
#else
    system("clear");
#endif
}


struct Position {
    int x, y;
};

int main() {
    // Small map: 1 = walkable, 0 = wall
    std::vector<std::vector<int>> map = {
        {1,1,1,0,1},
        {1,0,1,0,1},
        {1,0,1,1,1},
        {1,1,0,0,1},
        {1,1,1,0,1}
    };

    int height = map.size();
    int width = map[0].size();

    Position bot = {0,0};
    Position target = {4,4};

    std::vector<std::vector<int>> dist(height, std::vector<int>(width, INT_MAX));
    std::vector<std::vector<Position>> prev(height, std::vector<Position>(width, {-1,-1}));

    dist[bot.y][bot.x] = 0;

    int dx[4] = {0, 0, -1, 1}; // Up, Down, Left, Right
    int dy[4] = {-1, 1, 0, 0};

    std::queue<Position> q;
    q.push(bot);

    bool initialClear = false;

    while (!q.empty()) {
        if (initialClear) {
            properClear();
        } else {
            initialClear = true;
            hardClear();
        }

        hardClear();

        Position current = q.front(); q.pop();

        // Display current state
        std::cout << "Processing: (" << current.x << "," << current.y << ")\n";

        // Queue content
        std::queue<Position> temp = q;
        std::cout << "Queue: front -> back: ";
        while(!temp.empty()) {
            Position p = temp.front(); temp.pop();
            std::cout << "(" << p.x << "," << p.y << ") ";
        }
        std::cout << "\n\n";

        // Map
        std::cout << "Map (* = current tile):\n";
        for (int y=0; y<height; y++) {
            for (int x=0; x<width; x++) {
                if (x==bot.x && y==bot.y) std::cout << "B ";
                else if (x==current.x && y==current.y) std::cout << "* ";
                else if (x==target.x && y==target.y) std::cout << "T ";
                else if (map[y][x]==1) std::cout << ". ";
                else std::cout << "# ";
            }
            std::cout << "\n";
        }

        // Distance grid
        std::cout << "\nDistance grid:\n";
        for (int y=0; y<height; y++) {
            for (int x=0; x<width; x++) {
                if (dist[y][x]==INT_MAX) std::cout << std::setw(3) << "∞";
                else std::cout << std::setw(3) << dist[y][x];
            }
            std::cout << "\n";
        }

        // Prev grid
        std::cout << "\nPrev grid (x,y):\n";
        for (int y=0; y<height; y++) {
            for (int x=0; x<width; x++) {
                std::cout << "(" 
                          << std::setw(2) << prev[y][x].x << "," 
                          << std::setw(2) << prev[y][x].y << ") ";
            }
            std::cout << "\n";
        }

        std::cout << "-----------------------------------\n";
        std::this_thread::sleep_for(std::chrono::milliseconds(500)); // pause

        // Explore neighbors
        for (int i=0; i<4; i++) {
            int nx = current.x + dx[i];
            int ny = current.y + dy[i];

            if (nx>=0 && nx<width && ny>=0 && ny<height && map[ny][nx]==1) {
                if (dist[ny][nx] > dist[current.y][current.x]+1) {
                    dist[ny][nx] = dist[current.y][current.x]+1;
                    prev[ny][nx] = current;
                    q.push({nx,ny});
                }
            }
        }
    }

    // Reconstruct path
    std::vector<Position> path;
    Position step = target;
    while (!(step.x==bot.x && step.y==bot.y)) {
        path.push_back(step);
        step = prev[step.y][step.x];
    }
    path.push_back(bot);
    std::reverse(path.begin(), path.end());

    // Final path
    std::cout << "\nFinal shortest path:\n";
    for (int y=0; y<height; y++) {
        for (int x=0; x<width; x++) {
            bool onPath = false;
            for (auto &p : path) if (p.x==x && p.y==y) onPath=true;

            if (x==bot.x && y==bot.y) std::cout << "B ";
            else if (x==target.x && y==target.y) std::cout << "T ";
            else if (onPath) std::cout << "* ";
            else if (map[y][x]==1) std::cout << ". ";
            else std::cout << "# ";
        }
        std::cout << "\n";
    }

    std::cout << "\nDistance to target: " << dist[target.y][target.x] << "\n";

    return 0;
}

