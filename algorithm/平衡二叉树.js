// var isBalanced = function(root) {
//   if(!root) return true
//   return heightAndBal(root)[0]
// };

// function heightAndBal(root) {
//   if(!root) return [true, 0]
//   let left = heightAndBal(root.left)
//   let right = heightAndBal(root.right)
//   return [left[0] && right[0] && Math.abs(left[1] - right[1]) <= 1, Math.max(left[1], right[1]) + 1]
// }

var isBalanced = function(root) {
  if(!root) return true
  return heightAndBal(root) > 0
};

function heightAndBal(root) {
  if(!root) return 0
  let left = heightAndBal(root.left)
  let right = heightAndBal(root.right)
  if(left === -1 || right === -1 || Math.abs(left - right) > 1) return -1
  return 1 + Math.max(left, right)
}
