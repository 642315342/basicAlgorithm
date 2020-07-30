let p1 = new Promise((res) => {
  setTimeout(() => {
    res('p1 promise')
  }, 1000);
})
let p2 = new Promise((res) => {
  setTimeout(() => {
    res('p2 promise')
  }, 2000);
})
let p3 = new Promise((res) => {
  setTimeout(() => {
    res('p3 promise')
  }, 3000);
})
function* gen () {
  console.log('gen start')
  let pro1 = yield p1
  console.log('p1-->: pro1')
  let pro2 = yield p2
  console.log('p2-->: pro2')
  let pro3 = yield p3
  console.log('p3-->: pro3')
  console.log('gen end')
}

function run(fn) {
  let g = fn()
  function next(data) {
    let res = g.next(data)
    if(!res.done) {
      res.value.then(next)
    }else {
      return res.value
    }
  }
  next()
}

// run(gen)
// let a1 = g.next().value
// a1.then(res1 => {
//   let a2 = g.next(res1).value
//   a2.then(res2 => {
//     let a3 = g.next(res2).value
//     a3.then(res3 => {
//       let a4 = g.next(res3).value
//     })
//   })
// })
Promise.resolve()
.then(() => {
  console.log(1);
  Promise.resolve()
      .then(() => {
        console.log(2);
      })
      .then(() => {
        console.log(3);
      })
      .then(() => {
        console.log(4);
      })
  Promise.resolve()
  .then(() => {
    console.log(6);
    Promise.resolve()
    .then(() => {
      console.log(7);
    })
  })
})

