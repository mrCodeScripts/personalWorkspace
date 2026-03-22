#include <iostream>
#include <vector>
#include <string>
#include <limits>
#include <numeric>
#include <iomanip>
#include <string>
#include <algorithm>

int main()
{
  int numberOfRowSeats, numberOfColumnSeats;
  std::vector<std::vector<int>> studentGrades;

  bool working = true;

  while (working)
  {
    int option;

    std::cout << "\n\nChoose option: " << std::endl;
    std::cout << "0. exit" << std::endl;
    std::cout << "1. Create table and store quiz scores." << std::endl;
    std::cout << "2. Display table and quiz scores.\n\n" << std::endl;
    std::cout << "INPUT: ";
    std::cin >> option;

    if (std::cin.fail())
    {
      std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
      std::cout << "\033[31m[ERROR] Invalid input! Please enter a whole number.\033[0m\n";
      std::cin.clear();

      continue;
    }

    if (option == 1)
    {
      if (!studentGrades.empty())
        studentGrades = {};

      std::cout << "\n\nNumber of rows of seats: ";
      std::cin >> numberOfRowSeats;
      std::cout << "Number of columns of seats: ";
      std::cin >> numberOfColumnSeats;

      std::cout << std::endl;

      std::cout << "Table is now created. Please insert quiz scores." << std::endl;

      std::cout << std::endl;
      int columnIteration = 1;
      while ((studentGrades.size() + 1) <= numberOfRowSeats)
      {
        int rowIteration = 1;
        std::vector<int> gradeRow;
        while ((gradeRow.size() + 1) <= numberOfColumnSeats)
        {
          int score;
          std::cout << "What is the quiz score of R" << "[" << rowIteration << "] C[" << columnIteration << "] :";
          std::cin >> score;
          gradeRow.push_back(score);

          if (std::cin.fail())
          {
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
            std::cout << "\033[31m[ERROR].\033[0m\n";
            std::cin.clear();

            continue;
          }

          rowIteration++;
        }
        studentGrades.push_back(gradeRow);
        columnIteration++;
      }
    }
    else if (option == 2 && studentGrades.size() > 0)
    {
      int DEFAULT_SPACING = 7;

      std::string rowHeaderName = "R";
      std::string colHeaderName = "C";
      std::string av = "Average";

      int numberOfSpaceOfRowHeader = rowHeaderName.size();
      int numberOfSpaceOfColHeader = colHeaderName.size();
      int numberOfSpaceOfAverageHeader = av.size();

      std::vector<double> averageScorePerRow;
      for (int j = 0; j < numberOfRowSeats; j++)
        averageScorePerRow.push_back(0.0);
      int rowcount = 0;
      for (auto &row : studentGrades)
      {
        int accumulatedScores = std::accumulate(row.begin(), row.end(), 0.0);
        averageScorePerRow[rowcount] += (accumulatedScores / numberOfRowSeats);
        rowcount++;
      }

      std::vector<double> averageScorePerCol;
      for (int j = 0; j < numberOfColumnSeats; j++)
        averageScorePerCol.push_back(0.0);
      for (int i = 0; i < studentGrades.size(); i++)
      {
        for (int j = 0; j < studentGrades[0].size(); j++)
        {
          averageScorePerCol[j] += (studentGrades[i][j] / numberOfColumnSeats);
        }
      }

      std::cout << "\n\n";
      for (int i = 0; i < studentGrades.size(); i++)
      {
        std::string header1 = rowHeaderName + std::to_string(i);
        std::string header2 = colHeaderName + std::to_string(i);
        if (i == 0)
        {
          std::cout << std::right << std::setw(DEFAULT_SPACING) << colHeaderName << (i + 1);
        }
        else
        {
          std::cout << std::right << std::setw(DEFAULT_SPACING) << colHeaderName << (i + 1);
        }
      }

      std::cout << "\n";
      for (int i = 0; i < studentGrades.size(); i++)
      {
        // std::cout << std::left << std::setw(DEFAULT_SPACING) <<
        std::string header1 = rowHeaderName + std::to_string(i);
        std::string header2 = colHeaderName + std::to_string(i);

        std::cout << std::left << std::setw(DEFAULT_SPACING) << header1;
        for (int j = 0; j < studentGrades[0].size(); j++)
        {
          std::cout << std::left << std::setw(DEFAULT_SPACING) << studentGrades[i][j];
        }
        std::cout << "\n";
      }

      std::cout << "\n";
      std::cout << "\n";
      std::cout << av << " per Row: " << std::endl;
      for (int i = 0; i < averageScorePerRow.size(); i++)
      {
        std::cout << "Row " << (i + 1) << ": " << averageScorePerRow[i] << std::endl;
      }
      std::cout << "\n";
      std::cout << av << " per Column: " << std::endl;
      for (int i = 0; i < averageScorePerCol.size(); i++)
      {
        std::cout << "Column " << (i + 1) << ": " << averageScorePerCol[i] << std::endl;
      }

      int highest = 0;
      int lowest = 100;
      for (int i = 0; i < studentGrades.size(); i++)
      {
        for (int j = 0; j < studentGrades[0].size(); j++)
        {
          int g = studentGrades[i][j];
          if (g > highest)
              highest = g;
          if (g < lowest)
              lowest = g;
        }
      }

      std::cout << "\n";
      std::cout << "\n";
      std::cout << "Higest Grade in the Classroom: " << highest << std::endl;
      std::cout << "Lowest Grade in the Classroom: " << lowest << std::endl;
      std::cout << "\n\n\n";
    }
    else if (option == 0) {
      std::cout << "\033[32mGOODBYE.\033[0m\n";
      break;
    }
    else
    {
      std::cout << "\033[31m[SOMETHING WENT WRONG].\033[0m\n";
      continue;
    }
  }

  return 0;
}