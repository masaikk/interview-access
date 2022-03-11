//
// Created by masaikk on 2022/3/10.
//

#ifndef INTERVIEW_ACCESS_TREENODE_H
#define INTERVIEW_ACCESS_TREENODE_H


//* Definition for a binary tree node.
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;

    TreeNode() : val(0), left(nullptr), right(nullptr) {}

    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}

    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};


#endif //INTERVIEW_ACCESS_TREENODE_H
