//
// Created by b8313 on 2022/2/27.
//



#ifndef INTERVIEW_ACCESS_SOLUTION_H
#define INTERVIEW_ACCESS_SOLUTION_H

#include <string>
#include <stack>

using namespace std;

const char LEFT1 = '(';
const char LEFT2 = '[';
const char LEFT3 = '{';
const char RIGHT1 = ')';
const char RIGHT2 = ']';
const char RIGHT3 = '}';

class Solution {
public:
    stack<int> punches = {};

    bool isValid(string s) {
        const int LENGTH = s.length();
        punches.push(0);
        if (LENGTH % 2 != 0) {
            return false;
        }
        for (int i = 0; i <= LENGTH; i++) {
            switch (s[i]) {
                case LEFT1: {
                    punches.push(1);
                    break;
                }
                case LEFT2: {
                    punches.push(2);
                    break;
                }
                case LEFT3: {
                    punches.push(3);
                    break;
                }
                case RIGHT1: {
                    if (punches.top() == 1) {
                        punches.pop();
                    } else {
                        return false;
                    }
                    break;
                }
                case RIGHT2: {
                    if (punches.top() == 2) {
                        punches.pop();
                    } else {
                        return false;
                    }
                    break;
                }
                case RIGHT3: {
                    if (punches.top() == 3) {
                        punches.pop();
                    } else {
                        return false;
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        }
        if (punches.size() == 1) {
            return true;
        } else {
            return false;
        }
    };
};

#endif //INTERVIEW_ACCESS_SOLUTION_H
