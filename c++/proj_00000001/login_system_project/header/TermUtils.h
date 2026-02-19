#pragma once
#include <iostream>
#include <utility>
#ifdef _WIN32
#include <conio.h>
#include <windows.h>
#else
#include <cstdlib>
#include <termios.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/ioctl.h>
#endif

namespace TermUtils
{
	// GET THE TERMINAL SIZE (WIDTH, HEIGHT)
	inline std::pair<int, int> getTerminalSize()
	{
		int width = 80;	 // fallback width
		int height = 25; // fallback height

#ifdef _WIN32
		CONSOLE_SCREEN_BUFFER_INFO csbi;
		HANDLE hOut = GetStdHandle(STD_OUTPUT_HANDLE);
		if (hOut != INVALID_HANDLE_VALUE && GetConsoleScreenBufferInfo(hOut, &csbi))
		{
			width = csbi.srWindow.Right - csbi.srWindow.Left + 1;
			height = csbi.srWindow.Bottom - csbi.srWindow.Top + 1;
		}
#else
		struct winsize w;
		if (ioctl(STDOUT_FILENO, TIOCGWINSZ, &w) == 0)
		{
			width = w.ws_col;
			height = w.ws_row;
		}
#endif

		return {width, height};
	}

	inline std::string detectKey(const std::string &mode = "keyboard_detector")
	{
#ifdef _WIN32
		if (!_kbhit())
			return "";

		int k = _getch();

		// Extended keys (arrows, F1–F12, Insert, Delete, Home, End)
		if (k == 0 || k == 224)
		{
			int ext = _getch();
			switch (ext)
			{
			case 72:
				return (mode == "keyboard_detector") ? "pressedArrowUp" : "";
			case 80:
				return (mode == "keyboard_detector") ? "pressedArrowDown" : "";
			case 75:
				return (mode == "keyboard_detector") ? "pressedArrowLeft" : "";
			case 77:
				return (mode == "keyboard_detector") ? "pressedArrowRight" : "";
			case 59:
				return (mode == "keyboard_detector") ? "pressedF1" : "";
			case 60:
				return (mode == "keyboard_detector") ? "pressedF2" : "";
			case 61:
				return (mode == "keyboard_detector") ? "pressedF3" : "";
			case 62:
				return (mode == "keyboard_detector") ? "pressedF4" : "";
			case 63:
				return (mode == "keyboard_detector") ? "pressedF5" : "";
			case 64:
				return (mode == "keyboard_detector") ? "pressedF6" : "";
			case 65:
				return (mode == "keyboard_detector") ? "pressedF7" : "";
			case 66:
				return (mode == "keyboard_detector") ? "pressedF8" : "";
			case 67:
				return (mode == "keyboard_detector") ? "pressedF9" : "";
			case 68:
				return (mode == "keyboard_detector") ? "pressedF10" : "";
			case 133:
				return (mode == "keyboard_detector") ? "pressedF11" : "";
			case 134:
				return (mode == "keyboard_detector") ? "pressedF12" : "";
			case 71:
				return (mode == "keyboard_detector") ? "pressedHome" : "";
			case 79:
				return (mode == "keyboard_detector") ? "pressedEnd" : "";
			case 82:
				return (mode == "keyboard_detector") ? "pressedInsert" : "";
			case 83:
				return (mode == "keyboard_detector") ? "pressedDelete" : "";
			default:
				return "";
			}
		}

		// Normal keys
		if (mode == "keyboard_input")
		{
			if (isprint(k))
				return std::string(1, k); // include letters, numbers, symbols
		}
		else
		{ // detector mode
			if (k >= 'a' && k <= 'z')
				return std::string(1, k - 32);
			if (k >= 'A' && k <= 'Z')
				return std::string(1, k);
			if (k >= '0' && k <= '9')
				return std::string(1, k);
		}

		// Control keys
		switch (k)
		{
		case 13:
			return (mode == "keyboard_detector") ? "pressedEnter" : "\n";
		case 27:
			return (mode == "keyboard_detector") ? "pressedEsc" : "\033";
		case 8:
			return (mode == "keyboard_detector") ? "pressedBackspace" : "\b";
		case 9:
			return (mode == "keyboard_detector") ? "pressedTab" : "\t";
		case 32:
			return (mode == "keyboard_detector") ? "pressedSpace" : " ";
		default:
			return "INVALID";
		}

#else
		// Linux / POSIX
		struct termios oldt, newt;
		tcgetattr(STDIN_FILENO, &oldt);
		newt = oldt;
		newt.c_lflag &= ~(ICANON | ECHO);
		tcsetattr(STDIN_FILENO, TCSANOW, &newt);

		int oldf = fcntl(STDIN_FILENO, F_GETFL, 0);
		fcntl(STDIN_FILENO, F_SETFL, oldf | O_NONBLOCK);

		char ch;
		std::string result = "";

		if (read(STDIN_FILENO, &ch, 1) > 0)
		{
			if (ch == 27)
			{ // ESC or arrow sequences
				char seq[2];
				if (read(STDIN_FILENO, &seq[0], 1) > 0 && read(STDIN_FILENO, &seq[1], 1) > 0)
				{
					if (seq[0] == '[')
					{
						switch (seq[1])
						{
						case 'A':
							result = (mode == "keyboard_detector") ? "pressedArrowUp" : "";
							break;
						case 'B':
							result = (mode == "keyboard_detector") ? "pressedArrowDown" : "";
							break;
						case 'C':
							result = (mode == "keyboard_detector") ? "pressedArrowRight" : "";
							break;
						case 'D':
							result = (mode == "keyboard_detector") ? "pressedArrowLeft" : "";
							break;
						default:
							result = "INVALID";
							break;
						}
					}
				}
				else
				{
					result = (mode == "keyboard_detector") ? "pressedEsc" : "\033";
				}
			}
			else
			{
				if (mode == "keyboard_input")
				{
					if (isprint(ch))
						result = std::string(1, ch); // letters, numbers, symbols
					else
					{
						switch (ch)
						{
						case 10:
							result = "\n";
							break;
						case 127:
							result = "\b";
							break;
						case 9:
							result = "\t";
							break;
						}
					}
				}
				else
				{ // detector mode
					if (ch >= 'a' && ch <= 'z')
						result = std::string(1, ch - 32);
					else if (ch >= 'A' && ch <= 'Z')
						result = std::string(1, ch);
					else if (ch >= '0' && ch <= '9')
						result = std::string(1, ch);
					else
					{
						switch (ch)
						{
						case 10:
							result = "pressedEnter";
							break;
						case 127:
							result = "pressedBackspace";
							break;
						case 9:
							result = "pressedTab";
							break;
						case 32:
							result = "pressedSpace";
							break;
						default:
							result = "INVALID";
							break;
						}
					}
				}
			}
		}

		tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
		fcntl(STDIN_FILENO, F_SETFL, oldf);
		return result;
#endif
	}

	inline void properClear()
	{
#ifdef _WIN32
		HANDLE hout = GetStdHandle(STD_OUTPUT_HANDLE);
		COORD coordinate = {0, 0};
		SetConsoleCursorPosition(hout, coordinate);
		// // Windows: fully clear screen
		// HANDLE hout = GetStdHandle(STD_OUTPUT_HANDLE);
		// CONSOLE_SCREEN_BUFFER_INFO csbi;
		// DWORD written;

		// GetConsoleScreenBufferInfo(hout, &csbi);
		// DWORD cellCount = csbi.dwSize.X * csbi.dwSize.Y;

		// // Fill the screen with spaces
		// FillConsoleOutputCharacter(hout, ' ', cellCount, {0, 0}, &written);
		// FillConsoleOutputAttribute(hout, csbi.wAttributes, cellCount, {0, 0}, &written);

		// // Move cursor to top-left
		// SetConsoleCursorPosition(hout, {0, 0});
#else
		// Linux/macOS: clear screen completely
		std::system("clear");
#endif
	}

	inline void removeCursor()
	{
#ifdef _WIN32
		HANDLE hout = GetStdHandle(STD_OUTPUT_HANDLE);
		CONSOLE_CURSOR_INFO inf;
		GetConsoleCursorInfo(hout, &inf);
		inf.bVisible = FALSE;
		SetConsoleCursorInfo(hout, &inf);
#else
		std::cout << "\033[?25l";
		std::cout.flush();
#endif
	}

	inline void hardClear()
	{
#ifdef _WIN32
		system("cls");
#else
		system("clear");
#endif
	}

	inline void showCursor()
	{
#ifdef _WIN32
		HANDLE hout = GetStdHandle(STD_OUTPUT_HANDLE);
		CONSOLE_CURSOR_INFO inf;
		GetConsoleCursorInfo(hout, &inf);
		inf.bVisible = TRUE;
		SetConsoleCursorInfo(hout, &inf);
#else
		std::cout << "\033[?25h";
		std::cout.flush();
#endif
	}

	inline void moveCursor(int row, int col)
	{
#ifdef _WIN32
		HANDLE hout = GetStdHandle(STD_OUTPUT_HANDLE);
		COORD coordinate = {(SHORT)col, (SHORT)row};
		SetConsoleCursorPosition(hout, coordinate);
#else
		std::cout << "\033[" << row + 1 << ";" << col + 1 << "H";
		std::cout.flush();
#endif
	}

	inline std::string makeTopBottomEdgeBorder(int bxLen, const std::string &rEdgeChar, const std::string &lEdgeChar, const std::string &midEdge)
	{
		SetConsoleCP(CP_UTF8);
		SetConsoleOutputCP(CP_UTF8);
		std::string frame;
		for (int i = 0; i < bxLen; i++)
		{
			if (i == 0)
				frame += lEdgeChar;
			else if (i == (bxLen - 1))
				frame += rEdgeChar;
			else
				frame += midEdge;
		}
		return frame;
	}

	inline std::string makeTopBottomEdgeBorderWithColors(int bxLen, const std::string &rEdgeChar, const std::string &lEdgeChar, const std::string &midEdge, std::vector<std::pair<std::string, std::string>> &colors)
	{
		SetConsoleCP(CP_UTF8);
		SetConsoleOutputCP(CP_UTF8);
		std::string frame;
		for (int i = 0; i < bxLen; i++)
		{
			if (i == 0)
				frame += colors[0].first + lEdgeChar + colors[0].second;
			else if (i == (bxLen - 1))
				frame += colors[0].first + rEdgeChar + colors[0].second;
			else
				frame += colors[0].first + midEdge + colors[0].second;
		}
		return frame;
	}

	inline std::string makeCenteredTextWithColors(std::string &phrase, std::vector<std::pair<std::string, std::string>> &colors, int &xTabSize, int &yTabSize, std::string &midVertEdge, bool coloredText)
	{
		int index = 0;
		std::string textFrame;
		std::string topBottomPadding;
		std::string leftPadding;
		std::string rightPadding;
		std::string frame;
		if (yTabSize > 0)
		{
			int xfullSpace = (xTabSize * 2) + phrase.size();
			for (int j = 1; j <= yTabSize; j++)
			{
				for (int i = 1; i <= xfullSpace; i++)
				{
					if (i == 1 || i == xfullSpace)
						topBottomPadding += colors[0].first + midVertEdge + colors[0].second;
					else
						topBottomPadding += " ";
				}
			}
		}
		if (xTabSize > 0)
		{
			for (int i = 1; i <= xTabSize; i++)
			{
				if (i == 1)
					leftPadding += colors[0].first + midVertEdge + colors[0].second;
				else
					leftPadding += ' ';
			}
			for (int i = 1; i <= xTabSize; i++)
			{
				if (i == xTabSize)
					rightPadding += colors[0].first + midVertEdge + colors[0].second;
				else
					rightPadding += ' ';
			}
		}
		for (const char &c : phrase)
		{
			coloredText ? textFrame += colors[index].first + std::string(1, c) + colors[index].second : textFrame += "\033[1m" + std::string(1, c) + "\033[0m";
			index++;
			if (index >= colors.size())
				index = 0;
		}
		frame += leftPadding;
		frame += textFrame;
		frame += rightPadding;
		return frame;
	}

	inline std::string makeCenteredTexts(std::string &phrase, int &xTabSize, int &yTabSize, std::string &midVertEdge)
	{
		int index = 0;
		std::string topBottomPadding;
		std::string leftPadding;
		std::string rightPadding;
		std::string frame;
		if (yTabSize > 0)
		{
			int xfullSpace = (xTabSize * 2) + phrase.size();
			for (int j = 1; j <= yTabSize; j++)
			{
				for (int i = 1; i <= xfullSpace; i++)
				{
					if (i == 1 || i == xfullSpace)
						topBottomPadding += midVertEdge;
					else
						topBottomPadding += " ";
				}
			}
		}
		auto paddAction = [&](std::string &padding, int midVertPos, const std::string &midVertEdge)
		{
			for (int i = 1; i <= xTabSize; i++)
				if (i == midVertPos)
					padding += midVertEdge;
				else
					padding += ' ';
		};
		if (xTabSize > 0)
		{
			paddAction(leftPadding, 1, midVertEdge);
			paddAction(rightPadding, xTabSize, midVertEdge);
		}
		frame += leftPadding;
		frame += phrase;
		frame += rightPadding;
		return frame;
	}

	inline char getch_crossplatform()
	{
#ifdef _WIN32
		return _getch();
#else
		struct termios oldt, newt;
		char ch;
		tcgetattr(STDIN_FILENO, &oldt);
		newt = oldt;
		newt.c_lflag &= ~(ICANON | ECHO); // disable buffering and echo
		tcsetattr(STDIN_FILENO, TCSANOW, &newt);
		ch = getchar();
		tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
		return ch;
#endif
	}

	inline std::string getPassword_hidden_v2(const char mask, bool &exit)
	{
		std::string pwd;
		char c;

		while (true)
		{
			std::string guard = TermUtils::detectKey();
			c = getch_crossplatform();

			// ENTER (covers both "\n" and "\r")
			if (c == '\n' || c == '\r')
			{
				std::cout << "\n";
				break;
			}

			if (guard == "pressedEsc")
			{
				exit = true;
				break;
			}

			// BACKSPACE (covers both 8 and 127)
			if (c == 127 || c == 8)
			{
				if (!pwd.empty())
				{
					pwd.pop_back();
					std::cout << "\b \b" << std::flush;
				}
				continue;
			}

			// ignore weird control keys
			if (c < 32 || c > 126)
				continue;

			pwd.push_back(c);
			std::cout << mask << std::flush;
		}

		return pwd;
	}

	inline std::string getPassword_mask_v1(const char mask, bool &accessOtherAccount)
	{
		std::string pwd;
		char c;
		while (true)
		{
			c = _getch();
			if (c == 27)
			{
				// reset and set username exist to false
				accessOtherAccount = true;
				break;
			}
			if (c == 13) // Enter
			{
				std::cout << "\n";
				break;
			}
			if (c == 8) // Backspace
			{
				if (!pwd.empty())
				{
					pwd.pop_back();
					std::cout << "\b \b";
				}
				continue;
			}
			if (pwd.size() >= 5) continue;
			pwd.push_back(c);
			std::cout << mask; 
		}
		return pwd;
	}
}
