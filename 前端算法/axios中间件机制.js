// let axios = Object.create(null)

// 先构造一个对象 存放拦截器
axios.interceptors = {
  request: [],
  response: [],
};
// 注册请求拦截器
axios.useRequestInterceptor = (resolved, rejected) => {
  axios.interceptors.request.push({ resolved, rejected });
};

// 注册响应拦截器
axios.useResponseInterceptor = (resolved, rejected) => {
  axios.interceptors.response.push({ resolved, rejected });
};

axios.run = (config) => {
  const chain = [
    {
      resolved: axios,
      rejected: undefined,
    },
  ];
  axios.interceptors.request.forEach(reqItem => {
    chain.unshift(reqItem)
  })
  axios.interceptors.response.forEach(resItem => {
    chain.push(resItem)
  })

  let promise = Promise.resolve(config)
  while(chain.length) {
    let {resolved, rejected} = chain.shift()
    promise = promise.then(resolved, rejected)
  }
  return promise
}


axios.useRequestInterceptor(config => {
  return {
    ...config,
    extraParams1: 'extraParams11',
  };
});

axios.useRequestInterceptor(config => {
  return {
    ...config,
    extraParams2: 'extraParams22',
  };
});

axios.useResponseInterceptor(
  resp => {
    const {
      extraParams1,
      extraParams2,
      message
      // result: { code, message },
    } = resp;
    console.log('resp', resp);
    
    return `${extraParams1} ${extraParams2} ${message}`;
  },
  error => {
    console.log('error', error)
  },
);

(async function() {
  const result = await axios.run({
    message: 'message1',
  });
  console.log('result1: ', result);
})();