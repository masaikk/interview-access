//
// Created by b8313 on 2022/3/12.
//

#ifndef INTERVIEW_ACCESS_SOLUTION_H
#define INTERVIEW_ACCESS_SOLUTION_H

#include "TreeNode.h"
#include <vector>

using namespace std;

class Solution {
public:
    int maxDepth(TreeNode *root) {
        if (root == nullptr) {
            return 0;
        } else {
            return 1 + max(maxDepth(root->left), maxDepth(root->right));
        }

    }
};

#endif //INTERVIEW_ACCESS_SOLUTION_H
