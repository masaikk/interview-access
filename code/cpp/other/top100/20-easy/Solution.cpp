//
// Created by b8313 on 2022/2/27.
//

#include "Solution.h"
#include <iostream>
#include <string>
#include <stack>

using namespace std;

int main() {



    Solution solution = Solution();
    const char thisSentence[] = "]{";
    bool flag = solution.isValid(thisSentence);
    cout << thisSentence << " is " << flag << endl;


}