#include <iostream>
#include <vector>
#include <queue>
#include <limits>
#include <algorithm>

struct Node {
    int x, y;
    int dist; // distance from start
    bool operator>(const Node &other) const { return dist > other.dist; }
};

// Directions: up, down, left, right
int dx[4] = {0, 0, -1, 1};
int dy[4] = {-1, 1, 0, 0};

// Dijkstra function: returns a path from start to target
std::vector<std::pair<int,int>> dijkstra(
    const std::vector<std::vector<int>> &map,
    int startX, int startY,
    int targetX, int targetY)
{
    int rows = map.size();
    int cols = map[0].size();

    // Distance grid, initialized to infinity
    std::vector<std::vector<int>> dist(rows, std::vector<int>(cols, std::numeric_limits<int>::max()));
    // Previous node grid (to reconstruct path)
    std::vector<std::vector<std::pair<int,int>>> prev(rows, std::vector<std::pair<int,int>>(cols, {-1,-1}));

    // Min-heap priority queue for nodes
    std::priority_queue<Node, std::vector<Node>, std::greater<Node>> pq;

    dist[startY][startX] = 0;
    pq.push({startX, startY, 0});

    while (!pq.empty()) {
        Node current = pq.top();
        pq.pop();

        if (current.x == targetX && current.y == targetY)
            break; // reached target

        // Check neighbors
        for (int i = 0; i < 4; i++) {
            int nx = current.x + dx[i];
            int ny = current.y + dy[i];

            // Check bounds and walkable
            if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && map[ny][nx] == 1) {
                int newDist = dist[current.y][current.x] + 1;
                if (newDist < dist[ny][nx]) {
                    dist[ny][nx] = newDist;
                    prev[ny][nx] = {current.x, current.y};
                    pq.push({nx, ny, newDist});
                }
            }
        }
    }

    // Reconstruct path
    std::vector<std::pair<int,int>> path;
    int cx = targetX, cy = targetY;
    if (prev[cy][cx].first == -1) return path; // no path

    while (!(cx == startX && cy == startY)) {
        path.push_back({cx, cy});
        auto p = prev[cy][cx];
        cx = p.first;
        cy = p.second;
    }
    std::reverse(path.begin(), path.end());
    return path;
}

// Example usage
int main() {
    std::vector<std::vector<int>> map = {
        {1,1,1,1,1},
        {1,0,0,0,1},
        {1,1,1,0,1},
        {1,0,1,1,1},
        {1,1,1,1,1},
    };

    int botX = 0, botY = 0;
    int heroX = 4, heroY = 4;

    auto path = dijkstra(map, botX, botY, heroX, heroY);

    std::cout << "Path length: " << path.size() << "\n";
    for (auto p : path)
        std::cout << "(" << p.first << "," << p.second << ") ";
    std::cout << "\n";

    return 0;
}
