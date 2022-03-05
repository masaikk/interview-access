//
// Created by masaikk on 2022/03/05.
//

#ifndef INTERVIEW_ACCESS_SOLUTION_H
#define INTERVIEW_ACCESS_SOLUTION_H
#include <vector>

using namespace std;

class Solution {
public:
    int climbStairs(int n) {
        vector<int>stepArray={};
        stepArray.push_back(1);
        stepArray.push_back(1);
        int i=2;
        while(i<=n){
            stepArray.push_back(stepArray[i-2]+stepArray[i-1]);
            i++;
        }
        return stepArray[n];

    }


};

#endif //INTERVIEW_ACCESS_SOLUTION_H
