#include <iostream>
#include "../header/Database.h"
#include <string>
#include <fstream>

Database::Database(const std::string file, const std::string databaseName) 
: FILE_PATH(file), DB_NAME(databaseName) {
    // this makes sure that all data is loaded in the memory
    this->load();
};

// get the file path of the text file acting as a database
std::string& Database::getFilePath() {
    return this->FILE_PATH;
};
// get the database name
std::string& Database::getDBName() {
    return this->DB_NAME;
};

void Database::load()
{
    // prepare the file from the file stream
    std::ifstream file(Database::FILE_PATH);
    // file.peek() == eof (end-of-file)
    // check if the file is empty
    if (!file.is_open() || file.peek() == std::ifstream::traits_type::eof())
    {
        // if file is empty, set empty array on memory
        this->DB_STORAGE[this->DB_NAME] = nlohmann::json::array();
        return;
    }
    try
    {
        // if file is not empty, import JSON data
        file >> this->DB_STORAGE;
    }
    catch (const nlohmann::json::parse_error &e)
    {
        // catch errors
        std::cerr << "JSON parse error: " << e.what() << "\n";
        DB_STORAGE = nlohmann::json::array();
    }

    // close file stream
    file.close();
};

// get the JSON data stored on memory
nlohmann::json& Database::getStorage()
{
    return this->DB_STORAGE;
};




