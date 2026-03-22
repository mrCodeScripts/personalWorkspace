#include <iostream>
#include <limits>
#include <vector>
#include <iomanip>
#include <algorithm>
#include <numeric>
#include <string>

// ─── Helper: convert numeric grade to letter grade ───────────────────────────
std::string getLetterGrade(int grade)
{
    if (grade >= 99) return "1.00";
    if (grade >= 96) return "1.25";
    if (grade >= 93) return "1.50";
    if (grade >= 90) return "1.75";
    if (grade >= 87) return "2.00";
    if (grade >= 84) return "2.25";
    if (grade >= 81) return "2.50";
    if (grade >= 78) return "2.75";
    if (grade >= 75) return "3.00";
    return "5.00 (FAILED)";
}

// ─── Helper: print a divider line ────────────────────────────────────────────
void printDivider(char c = '-', int width = 45)
{
    std::cout << std::string(width, c) << "\n";
}

// ─── Helper: print a section header ──────────────────────────────────────────
void printHeader(const std::string &title)
{
    std::cout << "\n\033[34m";
    printDivider('=');
    std::cout << "  " << title << "\n";
    printDivider('=');
    std::cout << "\033[0m\n";
}

int main()
{
    // ── Configuration ─────────────────────────────────────────────────────────
    const int MAX_GRADES = 10;
    const int MIN_VALID  = 70;   // lowest accepted numeric grade
    const int MAX_VALID  = 100;
    const int PASSING    = 75;

    std::vector<int> grades;
    grades.reserve(MAX_GRADES);

    // ── Banner ────────────────────────────────────────────────────────────────
    std::cout << "\033[1;36m";
    printDivider('*');
    std::cout << "       STUDENT GRADE MANAGEMENT SYSTEM\n";
    printDivider('*');
    std::cout << "\033[0m\n";

    std::cout << "Enter " << MAX_GRADES << " grades (valid range: "
              << MIN_VALID << " – " << MAX_VALID << ")\n\n";

    // ── Input loop ────────────────────────────────────────────────────────────
    while (static_cast<int>(grades.size()) < MAX_GRADES)
    {
        std::cout << "\033[32mEnter grade " << grades.size() + 1
                  << " of " << MAX_GRADES << ": \033[0m";

        int grade;
        std::cin >> grade;

        // 1) Check for non-numeric input FIRST
        if (std::cin.fail())
        {
            std::cout << "\033[31m[ERROR] Invalid input! Please enter a whole number.\033[0m\n";
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
            continue;
        }

        // 2) Then check range
        if (grade < MIN_VALID || grade > MAX_VALID)
        {
            std::cout << "\033[31m[ERROR] Grade must be between "
                      << MIN_VALID << " and " << MAX_VALID << ".\033[0m\n";
            continue;
        }

        grades.push_back(grade);
    }

    // ── Sort ──────────────────────────────────────────────────────────────────
    std::vector<int> sortedGrades = grades; // keep original insertion order too
    std::sort(sortedGrades.begin(), sortedGrades.end());

    // ══════════════════════════════════════════════════════════════════════════
    //  DISPLAY 1 – Index-based loop (sorted)
    // ══════════════════════════════════════════════════════════════════════════
    printHeader("SORTED GRADES – INDEX-BASED LOOP");
    for (size_t i = 0; i < sortedGrades.size(); i++)
    {
        std::cout << "\033[32m  Grade " << std::setw(2) << i + 1
                  << ": " << std::setw(3) << sortedGrades[i]
                  << "  [" << getLetterGrade(sortedGrades[i]) << "]\033[0m\n";
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  DISPLAY 2 – Range-based loop (sorted)
    // ══════════════════════════════════════════════════════════════════════════
    printHeader("SORTED GRADES – RANGE-BASED LOOP");
    int counter = 0;
    for (const int &g : sortedGrades)
    {
        ++counter;
        std::cout << "\033[32m  Grade " << std::setw(2) << counter
                  << ": " << std::setw(3) << g
                  << "  [" << getLetterGrade(g) << "]\033[0m\n";
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  DISPLAY 3 – Iterator-based loop (sorted)
    // ══════════════════════════════════════════════════════════════════════════
    printHeader("SORTED GRADES – ITERATOR-BASED LOOP");
    int iterCount = 0;
    for (auto it = sortedGrades.begin(); it != sortedGrades.end(); ++it)
    {
        ++iterCount;
        std::cout << "\033[32m  Grade " << std::setw(2) << iterCount
                  << ": " << std::setw(3) << *it
                  << "  [" << getLetterGrade(*it) << "]\033[0m\n";
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  ANALYSIS
    // ══════════════════════════════════════════════════════════════════════════
    printHeader("GRADE ANALYSIS");

    // Use STL algorithms for statistics
    int    highest = *std::max_element(sortedGrades.begin(), sortedGrades.end());
    int    lowest  = *std::min_element(sortedGrades.begin(), sortedGrades.end());
    double total   = std::accumulate(sortedGrades.begin(), sortedGrades.end(), 0.0);
    double average = total / static_cast<double>(sortedGrades.size());

    // GWA: average of the equivalent grade points (1.00–5.00 scale)
    // Using a simple continuous conversion for GWA display
    auto toGWAPoint = [](int g) -> double {
        if (g >= 99) return 1.00;
        if (g >= 96) return 1.25;
        if (g >= 93) return 1.50;
        if (g >= 90) return 1.75;
        if (g >= 87) return 2.00;
        if (g >= 84) return 2.25;
        if (g >= 81) return 2.50;
        if (g >= 78) return 2.75;
        if (g >= 75) return 3.00;
        return 5.00;
    };

    double gwaTotal = 0.0;
    for (const int &g : sortedGrades) gwaTotal += toGWAPoint(g);
    double gwa = gwaTotal / sortedGrades.size();

    int passingCount = static_cast<int>(std::count_if(
        sortedGrades.begin(), sortedGrades.end(),
        [&](int g){ return g >= PASSING; }));
    int failingCount = static_cast<int>(sortedGrades.size()) - passingCount;

    std::cout << "\033[36m  Highest Grade : " << highest
              << "  [" << getLetterGrade(highest) << "]\033[0m\n";
    std::cout << "\033[36m  Lowest Grade  : " << lowest
              << "  [" << getLetterGrade(lowest)  << "]\033[0m\n";
    std::cout << std::fixed << std::setprecision(2);
    std::cout << "\033[36m  Average Grade : " << average << "\033[0m\n";
    std::cout << "\033[36m  GWA (1-5 scale): " << gwa    << "\033[0m\n";
    std::cout << "\033[32m  Passing (>= 75): " << passingCount << "\033[0m\n";
    std::cout << "\033[31m  Failing (<  75): " << failingCount << "\033[0m\n";

    // ══════════════════════════════════════════════════════════════════════════
    //  PASSING GRADES ONLY
    // ══════════════════════════════════════════════════════════════════════════
    printHeader("PASSING GRADES (>= 75)");
    bool anyPassing = false;
    for (size_t i = 0; i < sortedGrades.size(); i++)
    {
        if (sortedGrades[i] >= PASSING)
        {
            std::cout << "\033[32m  Grade " << std::setw(2) << i + 1
                      << ": " << std::setw(3) << sortedGrades[i]
                      << "  [" << getLetterGrade(sortedGrades[i]) << "]\033[0m\n";
            anyPassing = true;
        }
    }
    if (!anyPassing)
        std::cout << "\033[31m  No passing grades.\033[0m\n";

    // ══════════════════════════════════════════════════════════════════════════
    //  FAILING GRADES ONLY
    // ══════════════════════════════════════════════════════════════════════════
    printHeader("FAILING GRADES (< 75)");
    bool anyFailing = false;
    for (size_t i = 0; i < sortedGrades.size(); i++)
    {
        if (sortedGrades[i] < PASSING)
        {
            std::cout << "\033[31m  Grade " << std::setw(2) << i + 1
                      << ": " << std::setw(3) << sortedGrades[i]
                      << "  [5.00 (FAILED)]\033[0m\n";
            anyFailing = true;
        }
    }
    if (!anyFailing)
        std::cout << "\033[32m  No failing grades. Well done!\033[0m\n";

    // ══════════════════════════════════════════════════════════════════════════
    //  SUMMARY TABLE
    // ══════════════════════════════════════════════════════════════════════════
    printHeader("SUMMARY TABLE");
    std::cout << "\033[33m"
              << "  " << std::left  << std::setw(8)  << "No."
              <<         std::setw(10) << "Grade"
              <<         std::setw(14) << "Equiv.(GWA)"
              <<         std::setw(12) << "Status"
              << "\033[0m\n";
    printDivider('-');

    for (size_t i = 0; i < sortedGrades.size(); i++)
    {
        std::string status = (sortedGrades[i] >= PASSING) ? "PASSED" : "FAILED";
        std::string color  = (sortedGrades[i] >= PASSING) ? "\033[32m" : "\033[31m";
        std::cout << color
                  << "  " << std::left  << std::setw(8)  << i + 1
                  <<         std::setw(10) << sortedGrades[i]
                  <<         std::setw(14) << getLetterGrade(sortedGrades[i])
                  <<         std::setw(12) << status
                  << "\033[0m\n";
    }

    printDivider('-');
    std::cout << "\033[1;36m"
              << "  " << std::left << std::setw(8)  << "AVG"
              <<                      std::setw(10) << std::fixed << std::setprecision(2) << average
              <<                      std::setw(14) << std::setprecision(2) << gwa
              <<                      std::setw(12) << (average >= PASSING ? "PASSED" : "FAILED")
              << "\033[0m\n";
    printDivider('=');

    std::cout << "\n\033[1;36m  Program ended successfully.\033[0m\n\n";
    return 0;
}