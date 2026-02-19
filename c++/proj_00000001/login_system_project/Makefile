# Compiler
CXX = g++
CXXFLAGS = -std=c++17 -O2 -mavx2 -Ivendor/argon2/include -Ivendor/uuid_v4

# Source files
SRC_CPP = src/main.cpp src/Database.cpp src/UserEntity.cpp
SRC_C   = vendor/argon2/src/argon2.c \
          vendor/argon2/src/core.c \
          vendor/argon2/src/blake2/blake2b.c \
          vendor/argon2/src/thread.c \
          vendor/argon2/src/encoding.c

# Object files
OBJ_CPP = $(SRC_CPP:.cpp=.o)
OBJ_C   = $(SRC_C:.c=.o)

# Target executable
TARGET = main.exe

# Default target
all: $(TARGET)

# Compile C++ sources
%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Compile C sources
%.o: %.c
	gcc -O2 -mavx2 -Ivendor/argon2/include -c $< -o $@

# Link everything
$(TARGET): $(OBJ_CPP) $(OBJ_C)
	$(CXX) $(OBJ_CPP) $(OBJ_C) -o $(TARGET)

# Clean
clean:
	rm -f $(TARGET) $(OBJ_CPP) $(OBJ_C)

