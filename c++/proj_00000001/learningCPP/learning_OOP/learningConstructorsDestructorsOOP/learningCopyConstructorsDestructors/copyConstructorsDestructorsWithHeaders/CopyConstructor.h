#pragma once
#ifndef COPYCONSTRUCTORS_H
#define COPYCONSTRUCTORS_H

#include <iostream>
#include <string>

class Car
{
public:
    std::string brand;
    int year;
    Car(std::string b, int y);
    Car(const Car &other);
    ~Car();
};

#endif