#include <iostream>
#include <vector>
#include <thread>
#include <chrono>

int main()
{
    // constant map width
    const int mapWidth = 30, mapHeight = 30;
    const int shapeWidth = 4, shapeHeight = 4;

    // the map that contains zeros (will only contain 1s if theres collision)
    int map[30][30] = {0};

    // the shape
    int shape[shapeWidth][shapeHeight] = {
        {0, 0, 0, 0},
        {0, 1, 1, 0},
        {0, 1, 1, 0},
        {0, 0, 0, 0},
    };

    // set animate
    bool animate = true;

    // main position reference of the top left corner of the shape stamp (0, 0)
    // will be used for drawing and updating the shapes for rendering
    // this will create a moving shape illusion
    // updating either of this will cause the shape stamp to move its top-left position somewhere
    // on the map making it looks like moving, but we were just rendering the chosen shape based on the map
    int pieceX = 3;
    int pieceY = 0;

    while (animate)
    {
        system("cls");

        for (int i = 0; i < mapWidth; i++)
        {
            for (int j = 0; j < mapHeight; j++)
            {
                bool drawBlock = false;

                for (int py = 0; py < shapeHeight; py++)
                {
                    for (int px = 0; px < shapeWidth; px++)
                    {
                        if (shape[py][px] == 1)
                        {
                            // example for the shape[0] on x-axis (this is not updated, only the x-axis): 
                            // (0, 0) -> (3, 0), (1, 0) -> (4, 0), (2, 0) -> (5, 0)
                            // example for the shape[0] on y-axis movement:
                            // (0, 0) -> (3, 1) -> (3, 2) -> (3, 3)...
                            int worldX = pieceX + px;
                            int worldY = pieceY + py;

                            // if those coordinates from the top matches an existing tile in the map, then proceed rendering
                            if (worldX == j && worldY == i)
                                drawBlock = true;
                        }
                    }
                }

                std::cout << (drawBlock ? '#' : ' ');
            }
            std::cout << std::endl;
        }

        pieceY++;

        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }

    return 0;
}