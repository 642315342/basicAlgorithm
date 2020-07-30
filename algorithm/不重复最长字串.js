let s = "abcabcbb"
function subStr(s) {
  if(!s) return 0
  let set = new Set()
  let r = -1, len = s.length, res =-1
  for(let i = 0; i < len;i++) {
    if(i !== 0) {
      set.delete(s[i-1])
    }
    while(r+1 < len && !set.has(s[r+1])) {
      r++
      set.add(s[r+1])
    }
    res = Math.max(res, r - i + 1)
  }
  return res
}


console.log(subStr(s))