// 归并排序
const arr = [3, 5, 1, 7, 4]

function guibing(arr, left, right) {
  if(left === right) return [arr[left]]
  let mid = Math.floor((left + right) / 2)
  return merge(guibing(arr, left, mid), guibing(arr, mid+1, right))
}

function merge(arr1, arr2) {
  let p1 = p2 = 0, res = []
  while(p1 < arr1.length && p2 < arr2.length) {
    let temp = arr1[p1] > arr2[p2] ? arr2[p2++]: arr1[p1++]
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

console.log(guibing(arr, 0, arr.length-1));

