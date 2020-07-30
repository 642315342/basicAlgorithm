function handleFetchQueue(urls, max, callback) {
  let i = 0, curNum = 0, fin = [], len = urls.length, resNum = 0
  return (function() {
    function hadleUrl(url, index) {
      curNum++
      
      fetch(url).then((res) => {
        resNum++
        curNum--
        console.log(res, '执行完了')
        
        fin[index] = res
        if(curNum < max && i < len) {
          hadleUrl(urls[i++], i-1)
        }
        if(resNum === len) {
          callback(fin)
          return 
        }
      })
      if(curNum < max && i < len) {
        hadleUrl(urls[i++], i-1)
      }
    }
    hadleUrl(urls[i++], i-1)
    

  })()
}

const urls = [0,1,2,3,4,5,6,7,8,9]
const fetch = function (idx) {
  return new Promise(resolve => {
    // console.log(`start request ${idx}`);
    const timeout = parseInt(Math.random() * 5000 + 2000);
    setTimeout(() => {
      // console.log(`end request ${idx}`);
      resolve(idx)
    }, timeout)
  })
};


handleFetchQueue(urls, 4, (res) => {
  console.log(res);
})
// const urls = Array.from({length: 10}, (v, k) => k);

// const fetch = function (idx) {
//   return new Promise(resolve => {
//     console.log(`start request ${idx}`);
//     const timeout = parseInt(Math.random() * 1e4);
//     setTimeout(() => {
//       console.log(`end request ${idx}`);
//       resolve(idx)
//     }, timeout)
//   })
// };

// const max = 4;

// const callback = () => {
//   console.log('run callback');
// };


// handleFetchQueue(urls, max, callback);
