#include <iostream>
#include <string>

class User
{
private:
    std::string username;

public:
    User(std::string username)
    {
        this->username = username;
        std::cout << "\033[1;32mUSER '" << this->username << "' CREATED! \033[0m" << std::endl;
    }

    ~User()
    {
        std::cout << "\033[1;31mUSER '" << this->username << "' DESTROYED! \033[0m" << std::endl;
    };
};

int main()
{
    User user1("User 1");
    User user2("User 2");
    return 0;
}

/*
DESTRUCTORS:
   - Special member functions called automatically when an object is destroyed.
   - Purpose: Release resources, free memory, close files, etc.
   - Key Features:
       * Same name as the class with a tilde (~) prefix
       * No parameters and no return type
       * Automatically invoked for stack objects when they go out of scope
       * Automatically invoked for global/static objects at program termination
       * Must manually delete heap objects to invoke destructor
*/