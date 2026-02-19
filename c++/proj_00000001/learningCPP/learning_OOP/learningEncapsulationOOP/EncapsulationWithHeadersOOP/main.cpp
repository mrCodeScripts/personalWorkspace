#include <iostream>
#include "Encapsulation.h"

int main () {

    BankAccount account(2000);

    account.deposit(300);
    account.withdraw(50);
    account.getBalance();

    return 0;
}