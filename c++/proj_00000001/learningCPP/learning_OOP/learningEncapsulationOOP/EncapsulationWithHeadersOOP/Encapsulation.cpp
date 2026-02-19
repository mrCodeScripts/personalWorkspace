#include <iostream>
#include "Encapsulation.h"
#include <iomanip>

BankAccount::BankAccount(double initialBalance)
{
    if (initialBalance > 0)
        this->balance = initialBalance;
};

void BankAccount::deposit(double amount)
{
    if (amount > 0)
        this->balance += amount;
};

void BankAccount::withdraw(double amount)
{
    if (amount < this->balance)
    {
        this->balance -= amount;
        std::cout << "\033[1;32mSuccessfuly withdrawn: $" << std::fixed << std::setprecision(2) << amount << "\033[1;31m (Balance -$" << std::fixed << std::setprecision(2) << balance << ")\033[0m" << std::endl;
    }
    else
    {
        std::cout << "\033[1;31mInsufficient balance: $" << std::fixed << std::setprecision(2) << amount << "\033[1;31m (Balance -$" << std::fixed << std::setprecision(2) << balance << ")\033[0m" << std::endl;
    }
};

double BankAccount::getBalance()
{
    std::cout << "\033[1;32m \nRemaining Balance: $" << std::fixed << std::setprecision(2) << this->balance << "\033[0m" << std::endl;
    return this->balance;
};
