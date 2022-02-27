//
// Created by b8313 on 2022/2/27.
//

#ifndef INTERVIEW_ACCESS_SOLUTION_H
#define INTERVIEW_ACCESS_SOLUTION_H

#include "ListNode.h"

class Solution {
public:
    ListNode *mergeTwoLists(ListNode *list1, ListNode *list2) {
        if (list1 == nullptr)
            return list2;
        if (list2 == nullptr)
            return list1;
        ListNode *myList = nullptr;
        ListNode *headIndexNode = myList;
        while (list1 != nullptr && list2 != nullptr) {
            if (list1->val < list2->val) {
                if (headIndexNode == nullptr) {
                    myList = new ListNode(list1->val);
                    headIndexNode = myList;
                } else {
                    headIndexNode->next = new ListNode(list1->val);
                    headIndexNode = headIndexNode->next;
                }
                list1 = list1->next;
            } else {
                if (headIndexNode == nullptr) {
                    myList = new ListNode(list2->val);
                    headIndexNode = myList;
                } else {
                    headIndexNode->next = new ListNode(list2->val);
                    headIndexNode = headIndexNode->next;
                }
                list2 = list2->next;
            }
        }
        if (list1 == nullptr)
            headIndexNode->next = list2;
        if (list2 == nullptr)
            headIndexNode->next = list1;
        return myList;
    }
};

#endif //INTERVIEW_ACCESS_SOLUTION_H
