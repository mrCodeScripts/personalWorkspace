#include <iostream>
#include <string>

class Car
{
public:
    std::string brand;
    int year;

    Car(std::string b, int y)
    {
        this->brand = b;
        this->year = y;

        std::cout << "\033[1;32mSUCCESSFULY CREATED CAR \033[0m\033[32m'" << this->brand << " " << this->year << "' \033[0m" << std::endl;
    }

    Car(const Car &other)
    {
        this->brand = other.brand;
        this->year = other.year;

        std::cout << "\033[1;32mSUCCESSFULY CREATED CLONE CAR \033[0m\033[32m'" << this->brand << " " << this->year << "' \033[0m" << std::endl;
    }

    ~Car()
    {
        std::cout << "\033[1;32mSUCCESSFULY DESTROYED CAR \033[0m\033[32m'" << this->brand << " " << this->year << "' \033[0m" << std::endl;
    }
};

class Something {
    private:
    int* someValue;
    public:
    Something(int val) {
        this->someValue = new int[val];
        std::cout << "\033[1;31mthis->someValue is created! \033[0m" << std::endl;
    }

    ~Something() {
        delete[]this->someValue;
        std::cout << "\033[1;31mthis->someValue is destroyed and cleaned!\033[0m" << std::endl;
    }
};

int main()
{

    Car car1("Bugatti", 2007);
    Car car2 = car1;
    std::cout << std::endl;
    Something something(30);

    return 0;
}

/*
COPY CONSTRUCTORS
   - Special constructors used to initialize a new object as a copy of an existing object.
   - Purpose: Perform a deep copy if the object manages dynamic resources to avoid
     shallow copy problems (like double deletion).
   - Signature: ClassName(const ClassName &other)
   - Automatically called when:
       * Passing objects by value
       * Returning objects by value
       * Initializing one object with another (e.g., Class b = a;)
*/