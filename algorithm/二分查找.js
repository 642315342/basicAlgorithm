let arr = [1,2,3,4,5,6], target = 3

function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1
  while(left <= right) {
    let mid = Math.floor((left + right) / 2)
    if(arr[mid] === target) {
      return mid
    } else if(arr[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return -1
}

// console.log(binarySearch(arr, 0));
// console.log(binarySearch(arr, 1));
// console.log(binarySearch(arr, 2));
// console.log(binarySearch(arr, 3));
// console.log(binarySearch(arr, 4));
// console.log(binarySearch(arr, 5));
// console.log(binarySearch(arr, 6));
// console.log(binarySearch(arr, 7));

// 重复值 找出数组中第一次和最后一次出现的值的位置
let arr1 = [1,1,1,1,1,2,3]

function Search(arr, target) {
  return [l(arr, target), r(arr, target)]
}
function l(arr, target) {
  let left = 0, right = arr.length - 1, res = - 1
  while(left <= right) {
    let mid = Math.floor((left + right) / 2)
    if(arr[mid] === target) {
      res = mid
      right = mid - 1
    } else if(arr[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return res
}
function r(arr, target) {
  let left = 0, right = arr.length - 1, res = - 1
  while(left <= right) {
    let mid = Math.floor((left + right) / 2)
    if(arr[mid] === target) {
      res = mid
      left = mid + 1
    } else if(arr[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return res
}
console.log(Search(arr1, 0));
console.log(Search(arr1, 1));
console.log(Search(arr1, 2));
console.log(Search(arr1, 3));
console.log(Search(arr1, 4));
console.log(Search(arr1, 5));
console.log(Search(arr1, 6));
console.log(Search(arr1, 7));
