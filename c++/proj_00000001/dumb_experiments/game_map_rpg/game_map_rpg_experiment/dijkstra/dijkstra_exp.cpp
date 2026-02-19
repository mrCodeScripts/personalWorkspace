#include <iostream>
#include <vector>
#include <queue>
#include <climits>
#include <algorithm>

struct Position {
    int x, y;
};

// Simple map: 1 = walkable, 0 = wall
std::vector<std::vector<int>> map = {
    {1, 1, 1, 1, 1},
    {1, 0, 0, 0, 1},
    {1, 1, 1, 0, 1},
    {1, 0, 1, 1, 1},
    {1, 1, 1, 1, 1}
};

int dx[4] = {0, 0, -1, 1}; // left/right
int dy[4] = {-1, 1, 0, 0}; // up/down

int main() {
    Position bot = {0, 0};    // start position
    Position target = {4, 4}; // goal position

    int height = map.size();
    int width = map[0].size();

    // Distance grid initialized to "infinity"
    std::vector<std::vector<int>> dist(height, std::vector<int>(width, INT_MAX));
    std::vector<std::vector<Position>> prev(height, std::vector<Position>(width, {-1,-1}));

    dist[bot.y][bot.x] = 0;

    // Simple BFS-style queue (works because all moves cost 1)
    std::queue<Position> q;
    q.push(bot);

    while (!q.empty()) {
        Position current = q.front(); q.pop();

        for (int i = 0; i < 4; i++) {
            int nx = current.x + dx[i];
            int ny = current.y + dy[i];

            // check bounds and walkable
            if (nx >= 0 && nx < width && ny >= 0 && ny < height && map[ny][nx] == 1) {
                if (dist[ny][nx] > dist[current.y][current.x] + 1) {
                    dist[ny][nx] = dist[current.y][current.x] + 1;
                    prev[ny][nx] = current;
                    q.push({nx, ny});
                }
            }
        }
    }

    // Reconstruct path from target to bot
    std::vector<Position> path;
    Position step = target;
    while (!(step.x == bot.x && step.y == bot.y)) {
        path.push_back(step);
        step = prev[step.y][step.x];
    }
    std::reverse(path.begin(), path.end());

    // Print map with path
    for (int y = 0; y < height; y++) {
        for (int x = 0; x < width; x++) {
            bool onPath = false;
            for (auto &p : path) if (p.x == x && p.y == y) onPath = true;

            if (bot.x == x && bot.y == y) std::cout << "B ";         // Bot start
            else if (target.x == x && target.y == y) std::cout << "T "; // Target
            else if (onPath) std::cout << "* ";                       // Path
            else if (map[y][x] == 1) std::cout << ". ";               // Walkable
            else std::cout << "# ";                                   // Wall
        }
        std::cout << "\n";
    }

    return 0;
}
