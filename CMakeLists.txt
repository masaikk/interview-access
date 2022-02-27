cmake_minimum_required(VERSION 3.20)
project(interview_access)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_FLAGS "-march=native -o3")
set(CMAKE_BUILD_TYPE "debug")

include_directories(code/cpp)
include_directories(code/cpp/other)
include_directories(code/cpp/other/top100)
include_directories(code/cpp/other/top100/21-easy)

add_executable(interview
        code/cpp/other/top100/21-easy/Solution.h
        code/cpp/other/top100/21-easy/ListNode.h
        code/cpp/other/top100/21-easy/Solution.cpp)

