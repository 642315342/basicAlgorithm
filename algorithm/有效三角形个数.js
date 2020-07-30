var triangleNumber = function(nums) {
  let arr = nums.sort((a, b) => a - b), res = 0
  for(let i = 0; i < arr.length-2; i++) {
    k = i + 2
    for(let j = i+1; j < arr.length && arr[i] !== 0; j++) {
      while(arr[i] + arr[j] > arr[k]) {
        k++
      }
      res += k - j - 1
    }
  }
  return res
};
console.log(triangleNumber([0,0,0]));

