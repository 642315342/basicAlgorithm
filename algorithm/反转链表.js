var reverseList = function(head) {
  let pre = null, cur = head
  while(cur) {
    next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
};


