function findK(arr, left, right) {
  let temp = arr[right], min= left-1,max = right+1
  for(let i = left; i < max;) {
    if(arr[i] < temp) {
      swap(arr, ++min, i)
      i++
    } else if(arr[i] > temp){
      swap(arr, --max, i)
    } else {
      i++
    }
  }
  return [min+1, temp]
}
function findMid(arr) {
  let len = arr.length-1
  if(len % 2) {
    return Math.floor((find(Math.floor(len/2))+find(Math.floor(len/2)+1))/2)
  }else {
    return find(Math.floor(len/2))
  }
}
function find(mid) {
  let left = 0, right = arr.length-1
  let res = findK(arr, left, right)
  while(mid !== res[0]) {
    if(mid < res[0]) {
      right = res[0]-1
      res = findK(arr, left, right)
    }else{
      left = res[0]+1
      res = findK(arr, left, right)
    }
  }
  return res[1]
}
function swap(arr, i, k) {
  [arr[i], arr[k]] = [arr[k], arr[i]]
}
let arr = [4,2,6,1,4]

console.log(findMid(arr));

