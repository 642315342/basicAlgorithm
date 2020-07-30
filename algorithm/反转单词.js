let word = 'ab cde f gh'
let word1 = '  ab cde f gh'
let word2 = '  i    am  a   good   boy  '

function fn(w) {
  let res = temp = ''
  let left = 0, right = w.length-1
  while(w[left] === ' ') left++
  while(w[right] === ' ') right--
  while(left <= right) {
    if(w[left] === ' ' && temp) {
      res = ' ' + temp + res
      temp = ''
    }else if(w[left] !== ' '){
      temp += w[left]
    }
    left++
  }
  res = temp + res
  return res
}

// console.log(res);
console.log(fn(word));
console.log(fn(word1));
console.log(fn(word2));
