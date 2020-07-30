const arr = [1,2,5,7,9,0,8,6,3,4,4,3,7,9]
const arr1 = [1,2,5,7,9,0,8,6,3,4,4,3,7,9]
arr1.sort()
console.log(arr1);
function heapSort(arr) {
  const len = arr.length - 1
  for(let i = 0; i <= len; i++) {
    heapInsert(arr, i)
  }
  swap(arr, 0, len)
  for(let j = len-1; j > 0; j--) {
    heapify(arr, j)
    swap(arr, 0, j)
  }
} 
function heapify(arr, size) {
  let i = 0
  while(i < size) {
    let left = 2 * i + 1
    if(left <= size) {
      let largest = left+1 <= size && arr[left+1] > arr[left] ? left + 1 : left
      if(arr[largest] > arr[i]) {
        swap(arr, i, largest)
        i = largest
      } else {
        break
      }
    } else {
      break
    }
  }
}
function heapInsert(arr, i) {
  while(i > 0) {
    const f = Math.floor((i - 1) / 2)
    if(arr[i] > arr[f]) {
      swap(arr, i, f)
      i = f
    }else {
      break
    }
  }
}
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}
heapSort(arr)
console.log(arr);
