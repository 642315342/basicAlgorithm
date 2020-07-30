function ListNode(val) {
  this.val = val;
  this.next = null;
}
var mergeTwoLists = function(l1, l2) {
 let res = new ListNode()
 let head = res
 while(l1 && l2) {
   if(l1.val > l2.val) {
     res.next = l2
     l2 = l2.next
   } else {
     res.next = l1
     l1 = l1.next
   }
   res = res.next
 }
 res.next = l1 ? l1 : l2
 return head.next
};

var sortList = function(head) {
 if(!head.next) return head
 let mid = findMid(head)
 let left = head
 let right = mid.next
 mid.next = null

 return mergeTwoLists(sortList(left), sortList(right))
};


function findMid(head) {
 let fast = slow = head
 while(fast.next && fast.next.next) {
   slow = slow.next
   fast = fast.next.next
 }
 return slow
}