#include <iostream>
#include <vector>
#include <chrono>
#include <thread>
#include <utility>
#include <string>
#include <algorithm>
#include <iomanip>

// linear-search algorithm (simple)
void linear_search_ex_1()
{
    std::vector<int> map = {1, 2, 3, 5, 6, 7};
    int target = 5;
    int foundIndex;
    for (int i = 0; i < map.size(); i++)
    {
        if (target == map[i])
            break;
        else
            std::cout << "Checking index " << std::to_string(i) << ", value = " << std::to_string(map[i]) << std::endl;

        std::this_thread::sleep_for(std::chrono::milliseconds(300));
    }
    std::cout << "Found " << std::to_string(target) << " at index " << std::to_string(foundIndex) << std::endl;
};

// linear-search algorithm with conidtion
void linear_search_ex_2()
{
    // get all numbers < 5
    int condition = 5;
    std::vector<std::pair<int, std::pair<int, int>>> collections;

    std::vector<std::vector<int>> map = {
        {1, 6, 3, 8},
        {4, 7, 2, 5},
        {9, 0, 3, 6}};

    for (int i = 0; i < map.size(); i++)
    {
        for (int j = 0; j < map[0].size(); j++)
        {
            if (map[i][j] < condition)
            {
                collections.push_back({map[i][j], {j, i}});
                std::cout << "Item: " << std::to_string(map[i][j]) << ", Pos (x, y): [" << std::to_string(j) << ", " << std::to_string(i) << "] ," << "Passed: True" << std::endl;
            }
            else
            {
                std::cout << "Item: " << std::to_string(map[i][j]) << ", Pos (x, y): [" << std::to_string(j) << ", " << std::to_string(i) << "] ," << "Passed: False" << std::endl;
            }
        }
        std::this_thread::sleep_for(std::chrono::milliseconds(900));
    }

    std::cout << "\nFinal Collection: ";
    for (int i = 0; i < collections.size(); i++)
    {
        std::cout << std::setw(3) << collections[i].first;
    }
};

// linear search with nodes
void linear_search_ex_3()
{
    srand(time(0));

    int maxNumberOfNodes = 30;
    int maxRand = 20;

    struct Node
    {
        int value;
        Node *next;
    };

    std::vector<Node> collection_of_nodes;

    for (int i = 0; i < maxNumberOfNodes; i++)
    {
        Node newNode{rand() % maxRand, nullptr};
        collection_of_nodes.push_back(newNode);
    }

    for (int i = 0; i < collection_of_nodes.size(); i++)
    {
        if (i == (collection_of_nodes.size() - 1))
            break;
        else
            collection_of_nodes[i].next = &collection_of_nodes[i + 1];
    };

    Node *head = &collection_of_nodes[0];
    int target = 9;

    Node *current = head;
    int index = 0;

    bool foundTarget = false;
    while (current->next != nullptr)
    {
        std::cout << "Checking node " << index << ", value = " << current->value << std::endl;
        if (current->value == target)
        {
            std::cout << "Found target " << target << " at node " << index << std::endl;
            break;
        }
        current = current->next;
        index++;

        std::this_thread::sleep_for(std::chrono::milliseconds(300));
    }
    std::cout << (foundTarget ? "Found target at node number " + std::to_string(index+1) + "!" : "Target not found!") << std::endl;
};

int main()
{
    // linear_search_ex_1();
    // linear_search_ex_2();
    linear_search_ex_3();

    return 0;
}