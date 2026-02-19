#ifndef DATABASE_H
#define DATABASE_H

#include "../nlohmann/json.hpp"
#include <variant>
#include <fstream>
#include <string>

class Database
{
private:
    nlohmann::json DB_STORAGE;
    std::string FILE_PATH;
    std::string DB_NAME;

public:

    Database(const std::string file, const std::string databaseName);

    nlohmann::json &getStorage();
    std::string &getFilePath();
    std::string &getDBName();
    void load();


    // saves the JSON data from memory and write it
    // on text file.
    void save()
    {
        // open file stream
        std::ofstream file(this->FILE_PATH);
        // if file is not open, exit
        if (!file.is_open())
            return;
        // write JSON data to text file
        file << this->DB_STORAGE.dump(4);
        // close file stream
        file.close();
    };

    template <typename T>
    void insertData(std::vector<T> NEW_DATA)
    {
        if (!this->DB_STORAGE.contains(this->DB_NAME) || !this->DB_STORAGE[this->DB_NAME].is_array())
            this->DB_STORAGE[this->DB_NAME] = nlohmann::json::array();

        for (auto &vec : NEW_DATA)
        {
            nlohmann::json entry = nlohmann::json::object();
            for (auto &pairs : vec)
                std::visit([&](auto &&val)
                           { entry[pairs.first] = val; }, pairs.second);
            this->DB_STORAGE[this->DB_NAME].push_back(entry);
        }
    }
};

#endif