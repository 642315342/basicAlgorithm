function fn(arr) {
  arr = arr.sort((a, b) => a[0] - b[0])
  for(let i = 0; i < arr.length - 1; i++) {
    if(arr[i][1] >= arr[i+1][0]) {
      if(arr[i][1] > arr[i+1][1]) {
        arr[i][1] = arr[i][1]
      } else {
        arr[i][1] = arr[i+1][1]
      }
      arr[i+1] = arr[i]
      arr[i] = [0, 0]
    }
  }
  return arr.filter(i => !(i[0] === 0 && i[1] === 0))
}
let arr = [
  [9, 16],
  [1, 10],
  [5, 8],
  [15, 20],
  [30, 500]
];
console.log(fn(arr));
