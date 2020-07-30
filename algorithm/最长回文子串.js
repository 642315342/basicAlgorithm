let str = 'babad'

function ish(i, j, s) {
  while(i < j) {
    if(s[i] === s[j]) {
      i++
      j--
    } else {
      return false
    }
  }
  return true
}

function zui(s) {
  if(s.length < 2) return s
  for(let i = s.length; i > 0; i--) {
    for(let j = 0; j + i <= s.length; j++) {
      let ss = s.slice(j, i+j)
      if(ish(j, i+j-1, s)) {
        return s.slice(j, i+j)
      }
    }
  }
}
console.log(zui('bbbba'));
