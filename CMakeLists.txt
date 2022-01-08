cmake_minimum_required(VERSION 3.20)
project(interview_access)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_FLAGS "-march=native -o3")
set(CMAKE_BUILD_TYPE "debug")

include_directories(code/cpp)
include_directories(code/cpp/other)

add_executable(interview
        code/cpp/other/cm.cpp
        code/cpp/other/cm.h)

