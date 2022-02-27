# C++算法

## 基本STL

### 参考链接

+ 参考[STL教程：C++ STL快速入门（非常详细） (biancheng.net)](http://c.biancheng.net/stl/)

+ 参考[代码随想录](https://programmercarl.com/)

+ 参考[自己的STL代码笔记](https://gitee.com/masaikk/ct)

### vector

```c++
#include <iostream>
#include <vector>
using namespace std;
 
int main()
{
   // 创建一个向量存储 int
   vector<int> vec; 
   int i;
 
   // 显示 vec 的原始大小
   cout << "vector size = " << vec.size() << endl;
 
   // 推入 5 个值到向量中
   for(i = 0; i < 5; i++){
      vec.push_back(i);
   }
 
   // 显示 vec 扩展后的大小
   cout << "extended vector size = " << vec.size() << endl;
 
   // 访问向量中的 5 个值
   for(i = 0; i < 5; i++){
      cout << "value of vec [" << i << "] = " << vec[i] << endl;
   }
 
   // 使用迭代器 iterator 访问值
   vector<int>::iterator v = vec.begin();
   while( v != vec.end()) {
      cout << "value of v = " << *v << endl;
      v++;
   }
 
   return 0;
}
```

结果

```shell
vector size = 0
extended vector size = 5
value of vec [0] = 0
value of vec [1] = 1
value of vec [2] = 2
value of vec [3] = 3
value of vec [4] = 4
value of v = 0
value of v = 1
value of v = 2
value of v = 3
value of v = 4
```

关于上面实例中所使用的各种函数，有几点要注意：

- push_back( ) 成员函数在向量的末尾插入值，如果有必要会扩展向量的大小。
- size( ) 函数显示向量的大小。
- begin( ) 函数返回一个指向向量开头的迭代器。
- end( ) 函数返回一个指向向量末尾的迭代器。

### map

```c++
#include <iostream>
#include <map>      // pair
#include <string>       // string
using namespace std;

int main() {
    //创建并初始化 map 容器
    std::map<std::string, std::string>myMap{ {"STL教程","http://c.biancheng.net/stl/"},
                                             {"C语言教程","http://c.biancheng.net/c/"},
                                             {"Java教程","http://c.biancheng.net/java/"} };
    //查找键为 "Java教程" 的键值对
    auto iter = myMap.find("Java教程");
    //从 iter 开始，遍历 map 容器
    for (; iter != myMap.end(); ++iter) {
        cout << iter->first << " " << iter->second << endl;
    }
    return 0;
}
```

输出

```shell
Java教程 http://c.biancheng.net/java/
STL教程 http://c.biancheng.net/stl/
```

### set

```c++
#include <iostream>
#include <set>
#include <string>
using namespace std;

int main()
{
    //创建空set容器
    std::set<std::string> myset;
    //空set容器不存储任何元素
    cout << "1、myset size = " << myset.size() << endl;
    //向myset容器中插入新元素
    myset.insert("http://c.biancheng.net/java/");
    myset.insert("http://c.biancheng.net/stl/");
    myset.insert("http://c.biancheng.net/python/");
    cout << "2、myset size = " << myset.size() << endl;
    //利用双向迭代器，遍历myset
    for (auto iter = myset.begin(); iter != myset.end(); ++iter) {
        cout << *iter << endl;
    }
    return 0;
}
```

输出

```shell
1、myset size = 0
2、myset size = 3
http://c.biancheng.net/java/
http://c.biancheng.net/python/
http://c.biancheng.net/stl/
```

---

## 力扣题实录

[1. 两数之和 - 力扣（LeetCode） (leetcode-cn.com)](https://leetcode-cn.com/problems/two-sum/)

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

示例 1：

输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
示例 2：

输入：nums = [3,2,4], target = 6
输出：[1,2]
示例 3：

输入：nums = [3,3], target = 6
输出：[0,1]

```c++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        map<int,int> a;//建立hash表存放数组元素
        vector<int> b(2,-1);//存放结果
        for(int i=0;i<nums.size();i++)
            a.insert(map<int,int>::value_type(nums[i],i));
        for(int i=0;i<nums.size();i++)
        {
            if(a.count(target-nums[i])>0&&(a[target-nums[i]]!=i))
            //判断是否找到目标元素且目标元素不能是本身
            {
                b[0]=i;
                b[1]=a[target-nums[i]];
                break;
            }
        }
        return b;
    };
};
```

https://leetcode-cn.com/problems/valid-parentheses/

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。


示例 1：

输入：s = "()"
输出：true
示例 2：

输入：s = "()[]{}"
输出：true
示例 3：

输入：s = "(]"
输出：false
示例 4：

输入：s = "([)]"
输出：false
示例 5：

输入：s = "{[]}"
输出：true


提示：

1 <= s.length <= 104
s 仅由括号 '()[]{}' 组成

```c++
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
```

https://leetcode-cn.com/problems/merge-two-sorted-lists/

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

示例 1：


输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
示例 2：

输入：l1 = [], l2 = []
输出：[]
示例 3：

输入：l1 = [], l2 = [0]
输出：[0]


提示：

两个链表的节点数目范围是 [0, 50]
-100 <= Node.val <= 100
l1 和 l2 均按 非递减顺序 排列

```c++
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
```

可以考虑递归的方式

```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2, int depth) {
        // If null then retuan another list
        string s(depth, ' ');
        cout << s;
        printList(list1, list2);
        cout << endl;
        if (!list1) {
            return list2;
        } else if(!list2) {
            return list1;
        } else if(list1->val < list2->val) { // Recursion Condition
            list1->next = mergeTwoLists(list1->next, list2, depth+1);
            string s(depth, ' ');
            cout << s;
            printList(list1, list2);
            cout << endl;
            return list1;
        } else {
            list2->next = mergeTwoLists(list1, list2->next, depth+1);
            string s(depth, ' ');
            cout << s;
            printList(list1, list2);
            cout << endl;
            return list2;
        }
    }
    
    void printList(ListNode* list1, ListNode* list2) {
        cout << "[";
        while (list1) {
            cout << list1->val << " ";
            list1 = list1->next;
        }
        cout << "] [";
        while (list2) {
            cout << list2->val << " ";
            list2 = list2->next;
        }
        cout << "]";
    }
};

/作者：loyios
链接：https://leetcode-cn.com/problems/merge-two-sorted-lists/solution/shi-yong-di-gui-by-loyelee-tacu/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```



