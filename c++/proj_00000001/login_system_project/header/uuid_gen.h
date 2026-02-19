#pragma once
#include <random>
#include <string>
#include <sstream>
#include <iomanip>

class MyUUID {
public:
    // Generates a new UUIDv4 string
    static std::string generate() {
        static std::random_device rd;
        static std::mt19937_64 gen(rd());
        static std::uniform_int_distribution<uint32_t> dis(0, 0xFFFFFFFF);

        uint32_t data[4];
        for (int i = 0; i < 4; ++i) data[i] = dis(gen);

        // Set version to 4 (UUIDv4)
        data[1] = (data[1] & 0xFFFF0FFF) | 0x00004000;
        // Set variant to 10xx
        data[2] = (data[2] & 0x3FFFFFFF) | 0x80000000;

        std::stringstream ss;
        ss << std::hex << std::setfill('0')
           << std::setw(8) << data[0] << "-"
           << std::setw(4) << (data[1] >> 16) << "-"
           << std::setw(4) << (data[1] & 0xFFFF) << "-"
           << std::setw(4) << (data[2] >> 16) << "-"
           << std::setw(4) << (data[2] & 0xFFFF)
           << std::setw(8) << data[3];

        return ss.str();
    }
};
