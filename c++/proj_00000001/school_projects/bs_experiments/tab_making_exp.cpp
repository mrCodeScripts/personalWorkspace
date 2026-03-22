#include <iostream>
#include <iomanip>
#include <string>

int main()
{
    // ── setw(N) reserves N characters of space for the next output ────────────
    // ── std::left  = text sticks to the LEFT  side of that space  ────────────
    // ── std::right = text sticks to the RIGHT side of that space  ────────────
    //    (std::right is the DEFAULT, so you only need to write it when switching)

    // ── EXAMPLE 1: basic setw ────────────────────────────────────────────────
    std::cout << "--- EXAMPLE 1: basic setw ---\n";

    std::cout << std::setw(10) << "Hello" << "\n";
    //                   ^^^^^
    //          reserves 10 chars → "     Hello"  (right-aligned by default)

    std::cout << std::left << std::setw(10) << "Hello" << "\n";
    //                                ^^^^
    //          reserves 10 chars → "Hello     "  (left-aligned)

    // ── EXAMPLE 2: a simple table (like the one in grades.cpp) ───────────────
    std::cout << "\n--- EXAMPLE 2: table ---\n";

    // Header row — each column gets a fixed width
    std::cout << std::left                  // stick everything left
              << std::setw(6)  << "No."
              << std::setw(10) << "Name"
              << std::setw(8)  << "Grade"
              << std::setw(10) << "Status"
              << "\n";

    std::cout << std::string(34, '-') << "\n";   // divider line

    // Data rows — same widths, so columns line up perfectly
    std::cout << std::left << std::setw(6)  << 1
                           << std::setw(10) << "Alice"
                           << std::setw(8)  << 92
                           << std::setw(10) << "PASSED" << "\n";

    std::cout << std::left << std::setw(6)  << 2
                           << std::setw(10) << "Bob"
                           << std::setw(8)  << 68
                           << std::setw(10) << "FAILED" << "\n";

    std::cout << std::left << std::setw(6)  << 3
                           << std::setw(10) << "Carol"
                           << std::setw(8)  << 85
                           << std::setw(10) << "PASSED" << "\n";

    // ── EXAMPLE 3: mixing left and right in one row ───────────────────────────
    std::cout << "\n--- EXAMPLE 3: right-align numbers, left-align text ---\n";

    std::cout << std::left  << std::setw(10) << "Alice"   // name: left
              << std::right << std::setw(5)  << 92        // number: right
              << "\n";

    std::cout << std::left  << std::setw(10) << "Bob"
              << std::right << std::setw(5)  << 68
              << "\n";

    // ── EXAMPLE 4: decimals + setw together ──────────────────────────────────
    std::cout << "\n--- EXAMPLE 4: decimals ---\n";

    std::cout << std::fixed << std::setprecision(2);   // always 2 decimal places

    std::cout << std::left  << std::setw(10) << "Average"
              << std::right << std::setw(7)  << 88.5
              << "\n";

    std::cout << std::left  << std::setw(10) << "GWA"
              << std::right << std::setw(7)  << 1.75
              << "\n";

    // ── THE RULE TO REMEMBER ──────────────────────────────────────────────────
    // setw() only affects the VERY NEXT output, then resets.
    // left/right STICKS until you change it.
    // fixed/setprecision STICKS until you change it.

    return 0;
}