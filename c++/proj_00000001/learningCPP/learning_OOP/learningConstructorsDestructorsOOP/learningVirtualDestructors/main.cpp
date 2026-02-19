#include <iostream>

class UserEntity {
    public:
        virtual ~UserEntity() {std::cout << "UserEntity destroyed \n" << std::endl;}
};

class AdminAcc : public UserEntity {
    public: 
        ~AdminAcc() {std::cout << "Admin Account destroyed\n" << std::endl;}
};

class ChildAcc : public AdminAcc {
    public:
        ChildAcc () { }
        ~ChildAcc () {
            std::cout << "Child acc destroyed! \n" << std::endl;
        }

        void login () {
            std::cout << "Logged in!" << std::endl;
        }
};

int main () {

    ChildAcc* user = new ChildAcc();
    user->login();

    delete user;

    return 0;
}