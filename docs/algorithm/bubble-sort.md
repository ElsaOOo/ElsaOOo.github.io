---
lang: zh-CN
description: "javascript 数据结构与算法 前端"
---

# 冒泡排序

> 冒泡排序的算法思想：在一堆乱序的元素中，指针从数组的第一个元素开始，每次比较指针指定的那个元素和指针后面的那个元素，元素较大者利用空间换位置排在后面，指针每次加1，直到一轮循环结束，这一轮数组中的最大值(或最小值)就排到**数组最后一位**。第二轮循环还是从数组第一个元素开始，重复以上步骤，直到数组长度减1的位置。重复以上步骤，时间复杂度为O(n^2)，空间复杂度为O(1)。



例题：给定数组[2, 1, 7, 9, 5, 8]，要求按照从左到右，从小到大的顺序进行排序。

```javascript
function bubbleSort(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        const temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
      }
    }
  }
  return nums;
}
```

