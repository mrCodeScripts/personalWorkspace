#include <iostream>
#include <iomanip>

class BankAccount
{
private:
    double balance;

public:
    void deposit(double amount)
    {
        if (amount > 0)
            balance += amount;
        std::cout << "\033[1;32mSuccessfuly deposited: $" << std::fixed << std::setprecision(2) << balance << "\033[0m" << std::endl;
    }

    void withdraw(double amount)
    {
        if (amount <= balance)
        {
            balance -= amount;
            std::cout << "\033[1;32mSuccessfuly withdrawn: $" << std::fixed << std::setprecision(2) << amount << "\033[1;31m (Balance -$" << std::fixed << std::setprecision(2) << balance << ")\033[0m" << std::endl;
        }
        else
        {
            std::cout << "\033[1;31mInsufficient balance: $" << std::fixed << std::setprecision(2) << amount << "\033[1;31m (Balance -$" << std::fixed << std::setprecision(2) << balance << ")\033[0m" << std::endl;
        }
    }

    double getBalance()
    {
        std::cout << "\033[1;32m \nRemaining Balance: $" << std::fixed << std::setprecision(2) << balance << "\033[0m" << std::endl;
        return balance;
    }
};

int main()
{

    BankAccount account;

    account.deposit(100);
    account.withdraw(10);
    account.getBalance();

    return 0;
}