---
lang: zh-CN
description: "javascript 数据结构与算法 前端 插入排序"
---

# 插入排序

> 插入排序的算法思想是，在一组乱序的元素中，不断将尚未排好序的元素插入到已经排好序的部分，在插入排序中，经过每一轮的处理后，数组前端的数是排好序的。时间复杂度为O(n^2)，空间复杂度为O(1)。

例子：

对数组[2, 1, 7, 9, 5, 8]进行插入排序

```javascript
function insertSort(nums) {
  for (let i = 1; i < nums.length; i++) {
    for (let j = i; j >= 0; j--) {
      if (nums[j] < nums[j - 1]) {
        const temp = nums[j - 1];
        nums[j - 1] = nums[j];
        nums[j] = temp;
      }
    }
  }
  return nums;
}
```

