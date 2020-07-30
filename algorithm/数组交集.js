function jiaoji(arr1, arr2) {
  let set = new Set(arr1)
  let res = new Set()
  arr2.forEach(item => {
    if(set.has(item)) {
      res.add(item)
    }
  })
  return [...res]
}
function jiaoji1(arr1, arr2) {
  let res = []
  arr2.forEach(item => {
    let index = arr1.indexOf(item)  
    if(index >= 0) {
      arr1.splice(index, 1)
      res.push(item)
    } 
  })
  return res
}



let arr1 = [1,2,2,1], arr2 = [2,2]
console.log(jiaoji(arr1, arr2));

