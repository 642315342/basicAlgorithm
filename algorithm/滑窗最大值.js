
let nums = [1,3,1,2,0,5],  k = 3

function findMax(nums, k) {
  let res = [], temp = [];
  for(let i = 0; i < nums.length; i++) {
    while(temp.length > 0 && temp[temp.length-1] < nums[i]) {
      temp.pop()
    }
    temp.push(nums[i])
    if(i >= k-1) {
      res.push(temp[0])
      if(temp[0] === nums[i-k+1]) {
        temp.shift()
      }
    }
  }
  return res;
}
var maxSlidingWindow = function(nums, k) {
  let n = nums.length;
  if(n == 0) return [];
  if(k == 1) return nums;
  let res = [];
  let left = new Array(n),right = new Array(n);
  left[0] = nums[0];
  right[n-1] = nums[n-1];
  for(let i = 1;i < n;i++){
      if(i % k == 0) left[i] = nums[i];
      else left[i] = Math.max(left[i-1],nums[i]);
      let j = n - i - 1;
      if((j + 1) % k == 0) right[j] = nums[j];
      else right[j] = Math.max(right[j + 1],nums[j]);
  }
  for(let i = 0;i < n - k + 1;i++){
      res[i] = Math.max(left[i + k - 1],right[i]);
  }
  return res;
};


console.log(findMax(nums, k));
