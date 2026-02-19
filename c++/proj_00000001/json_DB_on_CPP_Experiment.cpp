#include <iostream>
#include "nlohmann/json.hpp" 
#include <fstream>
#include <string>

using nlohmann::json;

struct Student {
    std::string name;
    int id;
    int grade;
};

void jsonDBOnCPPExperimentWithTXTFiles()
{
    json db;


    // -------------- FOR ADDING USERS OR DATA --------------
    // db["students"] = json::array();
    // db["students"].push_back({{"id", 1},
    //                           {"name", "Juan"},
    //                           {"grade", 90}});

    // db["students"].push_back({{"id", 2},
    //                           {"name", "Maria"},
    //                           {"grade", 95}});
    // std::ofstream file("db/db_001.txt");
    // if (!file.is_open()) {
    //     std::cerr << "Cannot open file!";
    //     return -1;
    // }
    // file << db.dump(4);
    // file.close();
    // std::cout << "Data saved!\n\n" << std::endl;
    // ------------------------------------------

    // -------------- FOR READING DATA --------------
    // std::ifstream file("db/db_001.txt");
    // if (!file.is_open()) {
    //     std::cerr << "Cannot open fucking file!";
    //     return -1;
    // }

    // file >> db;
    // file.close();

    // std::vector<Student> students;

    // for (auto &s : db["students"]) {
    //     students.push_back({s["name"], s["id"], s["grade"]});
    // }

    // for (auto& students : students) {
    //     std::cout << "ID: " << students.id << std::endl;
    //     std::cout << "Name: " << students.name << std::endl;
    //     std::cout << "Grade: " << students.grade << std::endl;
    // }
    // ------------------------------------------
}