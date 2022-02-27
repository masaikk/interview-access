//
// Created by b8313 on 2022/2/27.
//

#ifndef INTERVIEW_ACCESS_LISTNODE_H
#define INTERVIEW_ACCESS_LISTNODE_H


//Definition for singly-linked list.
struct ListNode {
    int val;
    ListNode *next;

    ListNode() : val(0), next(nullptr) {}

    ListNode(int x) : val(x), next(nullptr) {}

    ListNode(int x, ListNode *next) : val(x), next(next) {}
};


#endif //INTERVIEW_ACCESS_LISTNODE_H
