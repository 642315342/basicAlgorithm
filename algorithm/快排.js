const arr = [2,3,4,6,7,4,3]

function fastSort(arr, l, r) {
  if(l >= r) {
    return 
  }
  let [min, max] = pattion(arr, l, r)
  fastSort(arr, l, min) 
  fastSort(arr, max, r) 
}

function pattion(arr, l, r) {
  let min = l - 1, max = r + 1, index = l
  let random = Math.floor(Math.random()*r) + l
  swap(arr, random, r)
  let num = arr[r]
  while(index < max) {
    if(arr[index] < num) {
      swap(arr, ++min, index++)
    } else if(arr[index] > num){
      swap(arr, --max, index)
    } else {
      index++
    }
  }
  return [min, max]
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

fastSort(arr, 0, arr.length-1)
console.log(arr);
