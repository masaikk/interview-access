//
// Created by b8313 on 2022/3/12.
//

#ifndef INTERVIEW_ACCESS_SOLUTION_H
#define INTERVIEW_ACCESS_SOLUTION_H

#include "TreeNode.h"
#include <iostream>

using namespace std;

class Solution {
public:
    bool check(TreeNode *p, TreeNode *q) {
        if (!p && !q) return true;
        if (!p || !q) return false;
        return p->val == q->val && check(p->left, q->right) && check(p->right, q->left);
    }

    bool isSymmetric(TreeNode* root) {
        return check(root, root);
    }
};

#endif //INTERVIEW_ACCESS_SOLUTION_H
