//
// Created by b8313 on 2022/3/2.
//

#ifndef INTERVIEW_ACCESS_SOLUTION_H
#define INTERVIEW_ACCESS_SOLUTION_H

#include <vector>

using namespace std;

class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int pre = 0, maxAns = nums[0];
        for (const auto &x: nums) {
            pre = max(pre + x, x);
            maxAns = max(maxAns, pre);
        }
        return maxAns;
    }
};


#endif //INTERVIEW_ACCESS_SOLUTION_H
