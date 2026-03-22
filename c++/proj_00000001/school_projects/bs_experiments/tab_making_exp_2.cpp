#include <iostream>
#include <iomanip>
#include <string>
#include <vector>
#include <algorithm>  // std::max

int main()
{
    // ── Your data ─────────────────────────────────────────────────────────────
    std::vector<std::string> names   = { "Alice", "Bob", "Christopher", "Jo" };
    std::vector<int>         grades  = { 92, 78, 85, 100 };
    std::vector<std::string> statuses = { "PASSED", "PASSED", "PASSED", "PASSED" };

    // ── Column headers ────────────────────────────────────────────────────────
    std::string h1 = "Name";
    std::string h2 = "Grade";
    std::string h3 = "Status";

    // ── Step 1: calculate column widths dynamically ───────────────────────────
    // Start with the header width as the minimum, then check each data value.
    // Whatever is widest wins — that becomes the column width.

    size_t col1 = h1.size();   // start at header width
    for (const auto &n : names)
        col1 = std::max(col1, n.size());   // expand if data is wider

    size_t col2 = h2.size();
    for (const int &g : grades)
        col2 = std::max(col2, std::to_string(g).size());

    size_t col3 = h3.size();
    for (const auto &s : statuses)
        col3 = std::max(col3, s.size());

    // ── Step 2: add padding so it doesn't feel cramped ────────────────────────
    const int PAD = 3;   // breathing room between columns
    col1 += PAD;
    col2 += PAD;
    col3 += PAD;

    // ── Step 3: print header ──────────────────────────────────────────────────
    size_t totalWidth = col1 + col2 + col3;

    std::cout << std::left
              << std::setw(col1) << h1
              << std::setw(col2) << h2
              << std::setw(col3) << h3
              << "\n";

    std::cout << std::string(totalWidth, '-') << "\n";

    // ── Step 4: print rows using the SAME widths ──────────────────────────────
    for (size_t i = 0; i < names.size(); i++)
    {
        std::cout << std::left
                  << std::setw(col1) << names[i]
                  << std::setw(col2) << grades[i]
                  << std::setw(col3) << statuses[i]
                  << "\n";
    }

    // ── CENTERING (bonus) ─────────────────────────────────────────────────────
    // C++ has no built-in center, so you calculate the padding manually.
    // It's only 2 lines of math:

    std::cout << "\n--- centered text example ---\n";

    auto centerText = [](const std::string &text, size_t width) -> std::string {
        if (text.size() >= width) return text;
        size_t totalPad = width - text.size();
        size_t leftPad  = totalPad / 2;
        size_t rightPad = totalPad - leftPad;
        return std::string(leftPad, ' ') + text + std::string(rightPad, ' ');
    };

    // Now use it in a loop with the same col widths
    std::cout << centerText(h1, col1)
              << centerText(h2, col2)
              << centerText(h3, col3)
              << "\n";

    std::cout << std::string(totalWidth, '-') << "\n";

    for (size_t i = 0; i < names.size(); i++)
    {
        std::cout << centerText(names[i],                 col1)
                  << centerText(std::to_string(grades[i]), col2)
                  << centerText(statuses[i],               col3)
                  << "\n";
    }

    return 0;
}