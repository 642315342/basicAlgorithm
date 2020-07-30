var removeNthFromEnd = function(head, n) {
 if(!head) return null
  let pre = new ListNode(0)
  pre.next = head
  let fast = pre, slow = pre
  while(n-- && fast) {
    fast = fast.next
  }
  fast = fast.next
  while(fast) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next
  return pre.next
};