s1 = "abc3[cd]xyz" // "abcabccdcdcdef"

s2 = "3[a2[c]]" // "accaccacc"

s3 = "2[abc]3[cd]ef" //"abcabccdcdcdef"

s4 = "abc3[cd]xyz" //"abccdcdcdxyz"

function decode(s) {
  let res = '', num = 0, str = '', stack = [], flag = true
  
  for(let i = 0; i < s.length; i++) {
    if(!isNaN(parseInt(s[i]))) {
      flag = false
      num = num * 10 + parseInt(s[i])
    } else {
      if(!flag) {
        stack.push(num)
        num = 0
        flag = true
      }
      if(s[i] === ']') {
        let temp = stack.pop(), ts = ''
        while(temp !== '[') {
          str = temp + str
          temp = stack.pop()
        }
        let len = stack.pop()
        for(let i = 0; i < len; i++) {
          ts += str
        }
        if(stack.length) {
          stack.push(ts)
        } else {
          res += ts
        }
        num = 0
        str = ''
      } else {
        stack.push(s[i])
      }
    }
  }
  for(let i = 0; i < stack.length; i++) {
    res += stack[i]
  }
  return res
}

console.log(decode(s1));
