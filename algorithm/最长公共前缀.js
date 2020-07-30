let strs = ["flower","flow","flight"]
var longestCommonPrefix = function(strs) {
  let res = '', flag = false
  if(!strs.length) return res
  let first = strs[0]
  for(let i = 0; i < first.length; i++) {
    let temp = first[i]
    for(let j = 0; j < strs.length; j++) {
      if(strs[j][i] !== temp) {
        flag = true
      }
    }
    if(!flag) {
      res += temp
    } else {
      break
    }
  }
  return res
};
console.log(longestCommonPrefix(strs));

