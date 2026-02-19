#ifndef ENCAPSULATION_H
#define ENCAPSULATION_H

class BankAccount
{
private:
    double balance;

public:
    BankAccount(double initialBalance);
    void deposit(double amount);
    void withdraw(double amount);
    double getBalance();
};

#endif