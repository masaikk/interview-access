# 算法

## 算法记录

### 二叉树的层序遍历

#### 分析

参考[JavaScript——二叉树层序遍历_庸人°的博客-CSDN博客_二叉树层序遍历js](https://blog.csdn.net/wuxian_wj/article/details/121006926)

第一步判断root是否是null，如果为空我们直接返回空数组即可，如果不为空继续我们的代码运行
第二步声明了两个变量result用来承接最后的数组，并作为最后的结果返回。deep用来表示当前节点的层级，方便我们向result对应数组中添加元素。
然后就到了我们的递归方法recursion，recursion的参数是当前节点。在recursion中现实节点深度加一，我们要注意这个深度的流程是，对于二叉树的结构，向下递归一层deep加一，向上return一层deep减一。
判断result对应该层的数组元素是否存在，如果不存在直接等于[root]，如果存在则选择push方式添加当前root。
添加完当前节点就需要判断，当前节点的左节点是否存在，如果存在将当前节点的左节点作为参数递归调用当前recursion函数，如果不存在则跳过
当前节点的右节点是否存在，如果存在将当前节点的右节点作为参数递归调用当前recursion函数，如果不存在则跳过
当左节点右节点都不存在则深度减一并向上返回，或者节点的左节点右节点都已经遍历完毕也是同样深度减一并向上返回。
当全部执行完毕，返回result。

#### 代码

```javascript
  var levelOrder = function(root) {
    if (root === null)
        return []
    let result = [];
    let deep = 0;
    recursion(root);

    function recursion(root) {
        deep++;
        if (result[deep - 1])
            result[deep - 1].push(root)
        else
            result[deep - 1] = [root]
        if (root.left != null)
            recursion(root.left)
        if (root.right !== null)
            recursion(root.right)
        deep--
        return
    }
    return result;
};

```



## C++基本STL

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

## JavaScript库函数

JavaScript库函数参考[JavaScript 标准内置对象 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)

### Array函数

[Array - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)需要注意JavaScript中的，对于列表添加或者去除元素的四个函数，即`unshift()`,`shift()`以及`push()`,`pop()`注意这几个函数是相对应的。

#### 主要函数举例

+ `Array.prototype.includes()`

  用于判断某个元素是否存在于这个列表中，返回一个bool值。

+ `Array.prototype.findIndex()`

  返回一个符合测试函数的元素的坐标，如果没有，就返回-1。这个测试函数需要符合`function(element, index, array){ /* … */ }`形式。

+ `Array.prototype.reduce()`

  回调函数需要满足`function(previousValue, currentValue, currentIndex, array) { /* … */ }`形式

+ `Array.prototype.sort()`

  **这是一个原地函数**

  - 如果 `compareFn(a, b)` 大于 0，b 会被排列到 a 之前。
  - 如果 `compareFn(a, b)` 小于 0，那么 a 会被排列到 b 之前；
  - 如果 `compareFn(a, b)` 等于 0，a 和 b 的相对位置不变。

+ `Array.prototype.forEach()`

  用于遍历，参数为`function(element, index, array){ /* … */ }`

+ `Array.prototype.includes()`

  `includes()` 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 `true`，否则返回 `false`。它还有一个可选参数用于从这个坐标开始，`includes(searchElement, fromIndex)`中从`fromIndex` 索引处开始查找 `valueToFind`。如果为负值，则按升序从 `array.length + fromIndex` 的索引开始搜（即使从末尾开始往前跳 `fromIndex` 的绝对值个索引，然后往后搜寻）。默认为 0。

+ `Array.prototype.splice()`

  **这是一个原地函数**

  它用来删除一部分数据，然后如果第三个参数不为空，就把第三个参数之后的参数加到Array里面。并以数组形式返回被修改的内容。`splice(start, deleteCount, item1)`里面的deleteCount表示删除元素的个数。

+ `Array.prototype.slice()`

  `slice()` 方法返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的**浅拷贝**（包括 `begin`，不包括`end`）。原始数组不会被改变。

+ `Array.length`

  获取数组长度。

对于`Array`类型的函数中，需要注意的是区分`splice()`和`slice()`的参数区别，splice是传入一个坐标，一个个数。slice是传入两个坐标而且不改变数组。

### Set函数

[Set - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

#### 主要函数举例

+ `Set.prototype.add()`

  添加一个元素。

+ `Set.prototype.delete()`

  删除一个元素

+ `Set.prototype.has()`

  返回一个布尔值来指示对应的值是否存在于 Set 对象中。

+ `Set.prototype.size`

  这个属性，获取set的大小。

+ `Set.prototype.forEach()`

  用于遍历整个set，回调函数需要满足`function(value, key, set) { /* ... */ }`形式。因为 `Set` 中没有键，所以 `value` 会被共同传递给这两个参数。

---

## 力扣题实录

[1. 两数之和 - 力扣（LeetCode）](https://leetcode.cn/problems/two-sum/)

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

[20. 有效的括号 - 力扣（LeetCode）](https://leetcode.cn/problems/valid-parentheses/)

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

[21. 合并两个有序链表 - 力扣（LeetCode）](https://leetcode.cn/problems/merge-two-sorted-lists/)

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

[Loading Question... - 力扣（LeetCode） (leetcode-cn.com)](https://leetcode-cn.com/problems/maximum-subarray/)

给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

子数组 是数组中的一个连续部分。

示例 1：

输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
示例 2：

输入：nums = [1]
输出：1
示例 3：

输入：nums = [5,4,-1,7,8]
输出：23


提示：

1 <= nums.length <= 105
-104 <= nums[i] <= 104


进阶：如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的 分治法 求解。

```c++
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
```

[70. 爬楼梯 - 力扣（LeetCode） (leetcode-cn.com)](https://leetcode-cn.com/problems/climbing-stairs/)

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

 

示例 1：

输入：n = 2
输出：2
解释：有两种方法可以爬到楼顶。
1. 1 阶 + 1 阶
2. 2 阶
示例 2：

输入：n = 3
输出：3
解释：有三种方法可以爬到楼顶。
1. 1 阶 + 1 阶 + 1 阶
2. 1 阶 + 2 阶
3. 2 阶 + 1 阶


提示：

1 <= n <= 45

```c++
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
```

**注意递归法不能用，会超时。**

[94. 二叉树的中序遍历 - 力扣（LeetCode） (leetcode-cn.com)](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

给定一个二叉树的根节点 `root` ，返回它的 **中序** 遍历。

 这里给出一个非递归形式的遍历方法，注意条件判断语句。

```c++
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> stk;
        while (root != nullptr || !stk.empty()) {
            while (root != nullptr) {
                stk.push(root);
                root = root->left;
            }
            root = stk.top();
            stk.pop();
            res.push_back(root->val);
            root = root->right;
        }
        return res;
    }
};
```

[136. 只出现一次的数字 - 力扣（LeetCode）](https://leetcode.cn/problems/single-number/)

一开始我还在想对于这个题目中使用每个元素进行遍历，得到那个与众不同的数字，但是这样的时间复杂度是O(n*n)。

然后我又想到了对于一个数列来说，应该是先排序之后，看看有没有元素与前后的元素都不相同，这样的时间复杂度是O(nlogn)。

最后，发现了异或的操作，可以达到O(n)的时间复杂度。

![image-20220829222033646](kishiki.assets/image-20220829222033646.png)

所以对于这个题目来说直接遍历整个数列对于每个元素都求一下异或就可以了。这里可以借助JavaScript的reduce运算符。

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    return nums.reduce((a,b)=>{
        return a^b
    })
};
```

[3. 无重复字符的最长子串 - 力扣（LeetCode）](https://leetcode.cn/problems/longest-substring-without-repeating-characters/) 

给定一个字符串 `s` ，请你找出其中不含有重复字符的 **最长子串** 的长度。

![image-20221009124813182](kishiki.assets/image-20221009124813182.png)

这是一个滑动窗口的问题，这里需要使用set来建立一个lookup表，但是一开始我做不出。在题解中，用到了`while (lookUp.has(s[i]))`感觉很不错，如果有新的元素，就一直从left处开始删除元素。代码如下

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let maxLength = 0;
    let currentLength = 0;
    let left = 0;

    let lookUp = new Set();
    let nums = s.length;
    if (nums === 0) {
        return 0;
    }
    for (let i = 0; i < nums; i++) {
        while (lookUp.has(s[i])) {
            lookUp.delete(s[left]);
            left += 1;
            currentLength -= 1;
        }
        lookUp.add(s[i]);
        currentLength += 1;
        if (maxLength < currentLength) {
            maxLength = currentLength;
        }

    }
    return maxLength;
};

```

https://leetcode.cn/problems/longest-palindromic-substring/

寻找最短的子回文序列并且返回这个序列

题目给出了两个题解，其中之一是使用了动态规划的方法，对于搜索的dp数组来说，分别用i和j来表示搜索的左边和右边，分以下几种条件进行讨论：

1. 如果i比j大，直接false
2. i==j，是true
3. i+1=j，就需要判断这两个元素是否相等，返回s[i]==s[j]
4. 判断s[i+1]到s[j-1]是否为回文序列，再判断收尾两个元素是否相等。

我自己的做法差点超时，而且其实没有用到dp而是用到的递归，在这里记录一下：

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    const TOTAL_LENGTH = s.length;
    // let lookUp = [];
    let left = 0;
    let right = 0;
    let maxLength = 0
    // for (let i = 0; i < TOTAL_LENGTH; i++) {
    //     lookUp.push([]);
    // }
    for (let i = 0; i < TOTAL_LENGTH; i++) {
        for (let j = 0; j < TOTAL_LENGTH; j++) {
            // lookUp[i][j] = calculateIfPalindrome(s, i, j)
            if (calculateIfPalindrome(s, i, j) && j - i > maxLength) {
                maxLength = j - i;
                left = i;
                right = j;
            }
        }
    }
    return s.slice(left, right + 1);
};

/**
 *
 * @param {string} s
 * @param {number} i
 * @param {number} j
 * @return {boolean}
 */
var calculateIfPalindrome = function (s, i, j) {
    if (i > j) {
        return false
    }
    if (i === j) {
        return true;
    } else if (i + 1 === j) {
        return s[i] === s[j]
    } else {
        return s[i] === s[j] && calculateIfPalindrome(s, i + 1, j - 1);
    }
}

```

使用动态规划的时候需要注意的点：

+ 实际上，一个字符串至少有一个长度为1的子串符合条件，所以maxlength可以从1开始。

+ 如果s的长度小于2,可以直接返回

+ 最后需要判断以下代码，不然会导致过多的undefine。

  ```javascript
  if (right - left < 3) {
                      lookUp[left][right] = true;
                  } else {
                      lookUp[left][right] = lookUp[left + 1][right - 1]
                  }
  ```

最终的代码如下所示

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    const TOTAL_LENGTH = s.length;
    let lookUp = [];
    let returnLeft = 0;
    let maxLength = 1
    if (TOTAL_LENGTH <= 1) {
        return s;
    }
    for (let i = 0; i < TOTAL_LENGTH; i++) {
        lookUp.push([]);
    }
    for (let i = 0; i < TOTAL_LENGTH; i++) {
        lookUp[i][i] = true;
    }

    for (let L = 2; L < TOTAL_LENGTH + 1; L++) {
        for (let left = 0; left < TOTAL_LENGTH; left++) {
            let right = left + L - 1;
            if (right >= TOTAL_LENGTH) {
                break;
            }
            if (s[left] !== s[right]) {
                lookUp[left][right] = false;
            } else {
                if (right - left < 3) {
                    lookUp[left][right] = true;
                } else {
                    lookUp[left][right] = lookUp[left + 1][right - 1]
                }
            }
            if (lookUp[left][right] && L > maxLength) {
                returnLeft = left;
                maxLength = L;
            }
        }

    }
    return s.slice(returnLeft, returnLeft + maxLength)
};
```

