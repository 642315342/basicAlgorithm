function reverse(num) {
  let res = 0
  let flag = num > 0 ? true : false
  num = Math.abs(num)
  while(num) {
    res = res*10 + num%10
    num = Math.floor(num/10)
  }
  if(!flag) {
    return res > Math.pow(2, 31) ? 0 : -res 
  } 
  return res > Math.pow(2, 31) - 1 ? 0 : res 
}
console.log(reverse(-1223));

