#pragma once
#ifndef CONSTRUCTORS_H
#define CONSTRUCTORS_H

#include <string>
#include <variant>

class CarType1 {
    public:
    std::string brand;
    int year;
    CarType1(std::string b, int y);
    void showInfo ();
};

class CarType2 {
    public:
    std::string brand;
    int year;
    CarType2();
    void showInfo ();
};

class CarType3 {
    public:
    std::string brand;
    int year;
    CarType3(const std::variant<CarType1, CarType2> &car);
    void showInfo ();
};

#endif