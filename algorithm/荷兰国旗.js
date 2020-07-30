// 一个数组 小于等于放左边 大于放右边

// 找一个小于区域
let arr = [5,2,1,6,2,9,5,2,9,1,5,5]
let num = 5
// 1. 双指针
function sort(arr, num) {
  let l = 0, r = arr.length - 1
  while(l < r) {
    if(arr[l] >= num && arr[r] >= num){
      r--
    } else if(arr[l] < num && arr[r] < num) {
      l++
    } else {
      if(arr[l] >= num && arr[r] < num) {
        swap(arr, l, r)
      }
      l++
      r--
    }
  }
}
// 2. 小于区域
function sort1(arr, num) {
  let min = -1, cur = 0
  while(cur < arr.length) {
    if(arr[cur] < num) {
      swap(arr, cur, ++min)
    }
    cur++
  }
}
// 荷兰国旗 等于放中间
// 小于区域/大于区域
function sort2(arr, num) {
  let min = -1, max = arr.length, cur = 0
  while(cur < max) {
    if(arr[cur] < num) {
      swap(arr, cur, ++min)
      cur++
    } else if(arr[cur] > num) {
      swap(arr, cur, --max)
    } else {
      cur++
    }
  }
}
function swap(arr, l, r) {
  [arr[l], arr[r]] = [arr[r], arr[l]]
}
sort2(arr, num)
console.log(arr);
