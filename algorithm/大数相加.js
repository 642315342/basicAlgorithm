const num1 = '1'
const num2 = '922222222222222333333333339922222222222222333333333339222222222222223333333333399222222222222223333333333399222222222222223333333333399922222222222222333333333339922222222222222333333333339922222222222222333333333339992222222222222233333333333992222222222222233333333333992222222222222233333333333999222222222222223333333333399222222222222223333333333399222222222222223333333333399922222222222222333333333339922222222222222333333333339922222222222222333333333339992222222222222233333333333992222222222222233333333333992222222222222233333333333999922222222222222333333333339922222222222222333333333339922222222222222333333333339922222222222222333333333339922222222222222333333333339922222222222222333333333339922222222222222333333333339922222222222222333333333339922222222222222333333333339922222222222222333333333339922222222222222333333333339922222222222222333333333339922222222222222333333333339922222222222222333333333339922222222222222333333333339922222222222222333333333339922222222222222333333333339'

function add(num1, num2) {
  let res = ''
  let len1 = num1.length
  let len2 = num2.length
  sub = len1 - len2
  if(sub > 0) {
    while(sub > 0) {
      num2 = '0' + num2
      sub -= 1
    }
  } else {
    while(sub < 0) {
      num1 = '0' + num1
      sub += 1
    }
  }
  let fLen = num1.length - 1
  let flag = 0
  while(fLen >= 0) {
    res = ((+num1[fLen] + +num2[fLen] + flag)%10) + res
    flag = Math.floor((+num1[fLen] + +num2[fLen] + flag)/10)
    fLen--
  }
  if(flag) {
    res = flag + res
  }
  return res
}
function listAdd(l1, l2) {
  let node = new ListNode('head')
  let temp = node
  let flag = 0
  while(l1 || l2) {
    let num1 = l1 && l1.val ? l1.val : 0
    let num2 = l2 && l2.val ? l2.val : 0
    let sum = num1 + num2 + flag
    temp.next = new ListNode(sum % 10)
    flag = sum >= 10 ? 1 : 0
    temp = temp.next
    l1 = l1 && l1.next
    l2 = l2 && l2.next
  }
  if(flag) {
    temp.next = new ListNode(flag)
  }
  return node.next
}
console.log(add(num1, num2));


let s1 = '12323'
let s2 = '9567812'

// console.log(add(s1, s2));
// console.log(+s1 + +s2)

function add(s1, s2) {
  let l1 = s1.length - 1
  let l2 = s2.length - 1
  let temp = 0, res = ''
  while(s1[l1] !== undefined && s2[l2] !== undefined ) {
    let a = +s1[l1] + +s2[l2] + temp
    res = a%10 + res
    temp = a >= 10 ? 1 : 0
    l1--
    l2--
  }
  while(s1[l1] !== undefined) {
    let a = +s1[l1] + temp
    res = a%10 + res
    temp = a >= 10 ? 1 : 0
    l1--
  }
  while(s2[l2] !== undefined) {
    let a = +s2[l2] + temp
    res = a%10 + res
    temp = a >= 10 ? 1 : 0
    l2--
  }
  if(temp) {
    res = temp + res
  }
  return res
}
function mult(s1, s2) {
  let res = '', i = s2.length - 1, j = 0
  while(i >= 0) {
    let temp = ''
    let a = mult1(s1, s2[i])
    for(let k = 0; k < j; k++) {
      temp += '0'
    }
    res = add(res, a + temp)
    i--
    j++
  }
  return res
}
function mult1(s1, s2) {
  let res = '', temp = 0, i = s1.length - 1
  while(i >= 0) {
    let a = +s1[i] * +s2 + temp
    res = a%10 + res
    temp = Math.floor(a/10)
    i--
  }
  if(temp) {
    res = temp + res
  }
  return res
}
console.log( a('13345', '93343'));
console.log(93343 + 13345);
// 最简洁方法
function a(s1, s2) {
  let i = s1.length - 1, j = s2.length - 1, res = '', temp = 0
  while(i >= 0 || j >= 0) {
    let a = s1[i] !== undefined ? +s1[i--] : 0
    let b = s2[j] !== undefined ? +s2[j--] : 0
    let c = a + b + temp
    res = c % 10 + res
    temp = c >= 10 ? 1 : 0
  }
  if(temp) {
    res = temp + res
  }
  return res
}
// 相乘
function m(s1, s2) {
  let res = []
  for(let i = s1.length - 1; i >= 0; i--) {
    for(let j = s2.length - 1; j >= 0; j--) {
      let index1 = i + j
      let index2 = i + j + 1
      let b = +s1[i] * +s2[j] + (res[index2] || 0)
      res[index1] = Math.floor(b / 10) +  (res[index1] || 0)
      res[index2] = b % 10
    }
  }
  return res.join('').replace(/^0*/, '')
}

