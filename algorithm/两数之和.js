let arr = [0,0,0], target = 0
function sum(arr, target) {
  let map = new Map()
  for(let i = 0; i < arr.length; i++) {
    let sub = target - arr[i]
    if(map.has(sub)) {
      return [i, map.get(sub)]
    } else {
      map.set(arr[i], i)
    }
  }
  return []
}

function three(arr, target) {
  let res = []
  if(arr.length < 3 || !arr) return res
  const len = arr.length
  arr.sort((a, b) => a-b)
  for(let start = 0; start < len - 2; start++) {
    if(arr[start] > 0) break // 第一个大于0 3个加起来肯定大
    if(start > 0 && arr[start] === arr[start-1]) continue // 避免重复
    let mid = start + 1,
      end = len - 1
    while(mid < end) {
      if(arr[start] + arr[mid] + arr[end] === target) {
        res.push([arr[start], arr[mid], arr[end]])
        while(mid < end && arr[mid] === arr[mid+1]) mid++ // 避免重复
        while(mid < end && arr[end] === arr[end-1]) end-- // 避免重复
        mid++
        end--
      }else if(arr[start] + arr[mid] + arr[end] < target) {
        mid++
      }else {
        end--
      }
    }
  }  
  return res
}

console.log(three(arr, target));
