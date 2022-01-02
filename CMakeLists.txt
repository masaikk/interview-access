cmake_minimum_required(VERSION 3.20)
project(interview_access)

set(CMAKE_CXX_STANDARD 14)

include_directories(code/cpp)
include_directories(code/cpp/other)

add_executable(interview_access
        code/cpp/other/fork.cpp
        code/cpp/other/fork.h)
