let res = 0
function pa(n) {
  go(n, 1)
  go(n, 2)
}
function go(n, pre) {
  if(pre === n) {
    res += 1
  } else if(pre < n) {
    go(n, pre + 1)
    go(n, pre + 2)
  }
}
pa(8)
console.log( res);
