// 数组每一项 都去与它前面所有的向比较， 把所有比他小的都加起来
let arr = [3, 5, 1, 7, 4, 6]
// 暴力循环
function minSum(arr) {
  let sum =0
  for(let i = 1; i < arr.length; i++) {
    for(let j = 0; j < i; j++) {
      if(arr[j] < arr[i]) {
        sum += arr[j]
      }
    }
  }
  return sum
}

console.log(minSum(arr));

// 归并思想
let resSum = 0
function minSum1(arr, left, right) {
  if(left === right) return [arr[left]]
  let mid = Math.floor((left + right) / 2)
  return merge(minSum1(arr, left, mid), minSum1(arr, mid+1, right))
}
function merge(arr1, arr2) {
  let p1 = 0, p2 = 0, res = [], l1 = arr1.length, l2 = arr2.length
  while(p1 < l1 && p2 < l2) {
    if(arr1[p1] < arr2[p2]) {
      resSum += (l2-p2)*(arr1[p1])
      temp = arr1[p1++]
    } else {
      temp = arr2[p2++]
    }
    res.push(temp)
  }
  while(p1 < arr1.length) {
    res.push(arr1[p1++])
  }
  while(p2 < arr2.length) {
    res.push(arr2[p2++])
  }
  return res
}

console.log(minSum1(arr, 0, arr.length-1));
 
console.log(resSum);
 