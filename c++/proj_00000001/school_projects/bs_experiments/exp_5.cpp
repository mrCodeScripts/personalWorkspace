#include <iostream>
#include <vector>
#include <algorithm>
#include <limits>
#include <numeric>
#include <iomanip>
#include <string>

int main () {
  std::vector<int> grades = {99, 33, 52, 41, 94, 23, 43};
  std::vector<int> passedGrades;
  int numberOfPassedGrades;
  int 
  int lowestGrade;
  int totalGrade;
  std::vector<int> lowToHighGrades = grades;
  std::vector<int> highToLowGrades = grades;
  
  std::count_if(grades.begin(), grades.end(), [](int grade) { return grade >= 70;});

  std::cout << "MAX" << std::to_string(std::accumulate(grades.begin(), grades.end(), 0.0)) << std::endl;

  std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');

  std::copy_if(grades.begin(), grades.end(), std::back_inserter(passedGrades), [](int grade) { return grade >= 60;});
  numberOfPassedGrades = std::count_if(grades.begin(), grades.end(), [](int g) {return g >= 70;});
  std::sort(lowToHighGrades.begin(), lowToHighGrades.end());
  std::reverse(highToLowGrades.begin(), highToLowGrades.end());



  return 0;
}