let str = "deeedbbcccbdaa"
k = 3

function delete1(str) {
  let stack = [str[0]], len = str.length
  for(let i = 1; i < len; i++) {
    if(str[i] === stack[stack.length - 1]) {
      stack.pop()
    } else {
      stack.push(str[i])
    }
  }
  return stack.join('')
}
function delete2(str, k) {
  let stack = [str[0]], indexArr = [0], same = 0, len = str.length
  for(let i = 1; i < len; i++) {
    if(str[i] === stack[stack.length - 1]) {
      same += 1
      stack.push(str[i])
      indexArr.push(same)
      if(same === k - 1) {
        for(let j = k; j > 0; j--) {
          stack.pop()
          indexArr.pop()
        }
        same = indexArr[indexArr.length - 1]
      }
    } else {
      same = 0
      indexArr.push(same)
      stack.push(str[i])
    }
  }
  return stack.join('')
}