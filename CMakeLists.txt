cmake_minimum_required(VERSION 3.19)
project(interview_access)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_FLAGS "-march=native -o3")
set(CMAKE_BUILD_TYPE "debug")

include_directories(code/cpp)
include_directories(code/cpp/other)
include_directories(code/cpp/other/top100)
include_directories(code/cpp/other/top100/94-easy)

add_executable(interview
        code/cpp/other/top100/94-easy/TreeNode.h
        code/cpp/other/top100/94-easy/Solution.h
        code/cpp/other/top100/94-easy/main.cpp
        )

