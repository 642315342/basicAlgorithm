
const arr = [2,3,4,6,7,4,3,4]
function partation(arr, left, right) {
  let l = left-1, r = right+1, temp = arr[right]
  for(let i = left; i < r;) {
    if(arr[i] < temp) {
      swap(arr, i++, ++l)
    } else if(arr[i] > temp) {
      swap(arr, i, --r)
    } else {
      i++
    }
  }
  return [l+1, temp]
}

function swap(arr, l, r) {
  let t = arr[l]
  arr[l] = arr[r]
  arr[r] = t
}
function topK(arr, k) {
  let left = 0, right = arr.length-1
  let res = partation(arr, left, right)
  while(res[0] !== k-1) {
    if(res[0] < k-1) {
      left = res[0]+1
      res = partation(arr, left, right)
    } else {
      right = res[0]-1
      res = partation(arr, left, right)
    }
  }
  return res[1]
}
console.log(topK(arr, 7));
console.log('dui--', dui(arr, 7));

function dui(arr, k) {
  arr.sort((a, b) => a-b)
  return arr[k-1]
}
