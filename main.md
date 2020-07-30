# HTML
## margin 百分比 
margin 百分比 是相对于父盒子的宽（不管margin-top，还是margin-left）
定位 top百分比 是相对于父盒子的高
```
.app {
  width: 100px;
  height: 100px;
  margin: 50% auto;
}
```
## css加载会不会阻塞DOM解析/渲染
css加载不会阻塞DOM解析但会阻塞DOM渲染

# VUE
### 列表页进入详情页方式（query、params+动态路由传参）
1. query
```
  {
    path: '/pay',
    name: 'TestPay',
    component: TestPay
  }
  <router-link :to="{path: 'pay', query: {id: 1, name: 'aaa'}}">进入详情页</router-link>
```
2. params+动态路由传参
```
  {
    path: '/pay/:id',
    name: 'TestPay',
    component: TestPay
  }
  <router-link :to="{name: 'TestPay', params: {id: 1, token: 'ssss'}}">进入详情页</router-link>
```

最主要区别：/pay/1   当用户刷新页面时token会消失  传入数据较多时用query

联想：列表页把商品id存入vuex中， 详情页需要使用id请求数据。(1)用vuex中id, (2)用路由参数id。使用第一种刷新页面时id会丢失，因为直接跳过列表页，相当于没存！！

### vue scrollBehavior 必须是history路由
to from 都是route实例
```
scrollBehavior(to, from, savedPosition) {
  if (from.meta.isKeepAlive) {
    from.meta.savedPosition = document.documentElement.scrollTop||document.body.scrollTop;
  }
  if (from.name === 'test2' && to.name === 'test1') {
    from.meta.savedPosition = 0;
  }
  if (savedPosition) {
    return savedPosition;
  }
  return { x: 0, y: to.meta.savedPosition || 0 };
}
// 简洁
scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
  } else {
    if (from.meta.keepAlive) {
      from.meta.savedPosition = document.body.scrollTop;
    }
      return { x: 0, y: to.meta.savedPosition || 0 }
  }
}
```
### 自定义组件v-model .sync
#### v-model 子组件是其他input时， value有特定的含义
默认向下传递props: value, event: input  
子组件中使用model去改变默认props和event
```
<base-checkbox v-model="lovingVue"></base-checkbox>

Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```
#### .sync
子组件要改变自身props，可以省去一步（子组件向父组件传一个事件，然后父组件在这个事件中改变props）   当同子组件中有多个props都需要改变（v-model只能绑定一个prop），需要用到.sync
```
<child-com :isShow.sync="isShow" v-if="isShow"/>

Vue.component('child-com', {
  props: {
    isShow: Boolean
  },
  template: `
    <p @click="$emit('update:isShow', false)">子组件点击关闭子组件</p>
  `
})

```

### watch 相关
基本数据 watch
```
data() {
    return {
      userName: 'aaa'
    };
},
watch: {
    userName(newVal, oldVal) {
      console.log('userName', newVal, oldVal);
    }
}
```
对象/数组 watch  使用 handler 和 deep
```
data() {
    return {
      obj: {
          a: 1,
          b: {
              c: 2
          }
      }
    };
},
watch: {
    obj: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal); //貌似 对象/数组 都没有oldVal 两个都是最新的值
      },
      deep: true
    },
}
```
监听对象中具体属性 两种方式
1. 直接监听
```
watch: {
    'obj.a': {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
      },
      deep: true
    },
}
```
2. 通过computed 监听 与 基本数据 watch 相同
```
computed: {
    aOfObj() {
      return this.obj.a
    }
},
watch: {
    aOfObj(newVal, oldVal) {
      console.log('aOfObj', newVal, oldVal);
    }
}
```

watch 一般都是数据变化才会执行 可以使用immediate: true 使其初始化就触发一次，此时基本数据也必须写成 handler 格式
```
watch: {
    obj: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
      },
      deep: true,
      immediate: true
    },
    userName: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
      },
      deep: true,
      immediate: true
    }
}
```
### v-for 遍历 一般遍历数组
1. 遍历数组 item是数组中每一个值 index 是当前值的索引
```
v-for="(item, index) in arr"
```
2. 遍历对象 item是当前值 key 是当前键 index 是当前值的索引  
在遍历对象时，会按 Object.keys() 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下都一致
所以如果有顺序要求， 一般不要把数据结构设计成对象
```
v-for="(item, key, index) in arr"
```
### 函数式组件 
```
<template functional>
  <div>
      {{props.aaa}}  // 必须props.aaa  直接{{aaa}}不行 因为现在没有this
  </div>
</template>
<script>
export default {
    props: ['aaa']
};
</script>
```
### 取消响应式
1. v-once
```
<span v-once>{{ msg }}</span>
```
2. Object.freeze

### props 验证
1. type 类型： String, Number, Boolean, Array, Object, Date, Function, Symbol, 自定义的构造函数
```
function Person (firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}
props: {
  author: Person
}
// 验证 author prop 的值是否是通过 new Person 创建的。
```

2. 默认值
```
// 基本类型 
propA: {
  type: String,
  default: ''
}
// 对象或数组 必须用函数返回
propB: {
  type: Object,
  default: function() {
    return {message: 'hello'}
  }
}
```
3. 自定义校验  validator
```
propC: {
  type: String,
  validator: function (value) {
    // 这个值必须匹配下列字符串中的一个
    return ['success', 'warning', 'danger'].indexOf(value) !== -1
  }
}
```
4. 传入一个对象的所有属性
如果你想要将一个对象的所有属性都作为 prop 传入，你可以使用不带参数的 v-bind (此时不能用：代替v-bind)(取代 v-bind:prop-name)。
**v-bind="$attrs"** 写组件库时会用到此性质
例如，对于一个给定的对象 post：
```
post: {
  id: 1,
  title: 'My Journey with Vue'
}
// v-bind
<blog-post v-bind="post"></blog-post>
<blog-post :="post"></blog-post> // 报错
// 等价于
<blog-post
  :id="post.id"
  :title="post.title"
></blog-post>
```

### 非porp特性
一个非 prop 特性是指传向一个组件，但是该组件并没有相应 prop 定义的特性。因为显式定义的 prop 适用于向一个子组件传入信息，然而组件库的作者并不总能预见组件会被用于怎样的场景。这也是为什么组件可以接受任意的特性，而这些特性会被添加到这个组件的**根元素**上。
#### 禁用特性继承
如果你不希望组件的根元素继承特性，你可以在组件的选项中设置 inheritAttrs: false。例如：
```
Vue.component('my-component', {
  inheritAttrs: false,
  // ...
})
```
这尤其适合配合实例的 $attrs 属性使用。 $attrs：继承所有的父组件属性（除了prop申明的属性、class 和 style ）
1. 默认
```
// 父组件中
<HelloWorld
  placeholder="请输入"
  type="password"
  value="111"
  title="试是"
/>
// 子组件
<div>
  <input type="text">
</div>

props: {
  title: String,
  value: String,
},
```
子组件会被渲染成。由于title和value被props申明过，所以不会添加到子组件的根元素上
```
<div placeholder="请输入" type="password">
  <input type="text">
</div>
```
2. inheritAttrs: false,
```
// 子组件
<div>
  <input type="text">
</div>

inheritAttrs: false,
props: {
  title: String,
  value: String,
},
```
子组件会被渲染成：
```
<div >
  <input type="text">
</div>
```
3. 结合$attrs使用
```
// 子组件
<div>
  <input type="text" v-bind="$attrs">
</div>

inheritAttrs: false,
props: {
  title: String,
  value: String,
},
```
子组件会被渲染成：type="text" 被覆盖
```
<div >
  <input placeholder="请输入" type="password">
</div>
```


### 插槽
具名插槽
```
<div>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>
  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>
  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</div>
```

作用域插槽。插槽内容能够访问子组件中才有的数据
子组件传递插槽props-->v-bind:user="user"
父组件接收--> v-slot="childProps"
```
// child 组件 内部有user对象
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
// 父组件
<child>
  <template v-slot="childProps">
    <p>{{childProps.user.firstName}}</p>
  </template>
</child>
```
缩写
具名插槽
```
<template #header>
  <h1>Here might be a page title</h1>
</template>
```
动态插槽名
```
<template v-slot:[dynamicSlotName]>
  <h1>Here might be a page title</h1>
</template>
<template #[dynamicSlotName]>
  <h1>Here might be a page title</h1>
</template>
```
作用域插槽
```
<template #="childProps">
  <p>{{childProps.user.firstName}}</p>
</template>
```
结构
```
<template #="{user}">
  <p>{{user.firstName}}</p>
</template>
```

### 处理加载状态
这里的异步组件工厂函数也可以返回一个如下格式的对象：
```
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

### ref 直接访问子组件
父组件需要直接获取子组件的元素、属性或方法时 用ref

子组件 Child
```
<div>child</div>
data() {return { a: 'child data a' }}
methods: { b() {console.log(child methods b)} }
```
父组件
```
<Child ref="child" />
获取子组件的data:  this.$refs.child.a --->  child data a
调用子组件的methods:  this.$refs.child.b() --->  child methods b
```
### 依赖注入
provide  inject 跨多层传递属性或方法, 可以把依赖注入看作一部分“大范围有效的 prop”除了：
祖先组件不需要知道哪些后代组件使用它提供的属性
后代组件不需要知道被注入的属性来自哪里

父组件
```
provide () {
    return {
        provideMethod: this.provideMethod,
        provideprops: 'aaaaaaaa'
    }
},
methods: {
    provideMethod () {
        console.log('provideMethod 00000000------')
    }
}
```
N代子组件中直接可以获取到provide中的属性/方法，中间层不需要做任何操作
```
inject: ['provideMethod', 'provideprops']
```
### keep-alive
会缓存不活动的组件实例，而不是销毁它们。mounted/destoryed不会多次调用。 取而代之的是 activated/deactived。
max: 最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。（LRU算法 Least Recently Used ：最近最少使用）
判断缓存中是否已缓存了该实例，缓存了则直接获取，并调整 key 在 keys 中的位置（移除 keys 中 key ，并放入 keys 数组的最后一位）
如果没有缓存，则缓存该实例，若 keys 的长度大于 max （缓存长度超过上限），则移除 keys[0] 缓存

### assets与static
assets 中的资源会被webpack处理（hash/压缩等）， static中的资源不会做任何处理，会直接拷贝一份。 run build后，dist文件夹是index.html和一个static文件夹。 
## ts Vue
1. 
```
import { Component, Vue, Prop } from 'vue-property-decorator';
import { componentA, componentB } from '@/components';

@Component({
    components:{ componentA, componentB},
})
export default class HelloWorld extends Vue{
  @Prop(Number) readonly propA!: number | undefined
  // 原data
  message = 'Hello' 
  // 计算属性
	private get reversedMessage (): string[] {
  	return this.message.split('').reverse().join('')
  }
  // method
  public changeMessage (): void {
    this.message = 'Good bye'
  }
}
```









## JS
### set WeakSet map WeakMap
#### set WeakSet
1. 键值一样(可以说只有值)  不能重复（=== 差不多只是认为NaN=NaN）
2. set 可以存任意值， WeakSet 只能存对象
3. WeakSet的对象是弱引用 如果没有其他对象引用存储的对象，就会被回收（因此不可遍历）
#### map WeakMap
1. WeakMap键只能是对象 弱引用只对键名 键值还是正常引用
2. 注意，只有对同一个对象的引用，Map/WeakSet/WeakMap 结构才将其视为同一个键。
```
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined
```
### replace
replace() 方法的参数 replacement 可以是函数而不是字符串。在这种情况下，每个匹配都调用该函数，它返回的字符串将作为替换文本使用。该函数的第一个参数是匹配模式的字符串。接下来的参数是与模式中的子表达式匹配的字符串，可以有 0 个或多个这样的参数。接下来的参数是一个整数，声明了匹配在 stringObject 中出现的位置。最后一个参数是 stringObject 本身。
```
'bac-abc-cc'.replace(/-(\w)/g, (_, str) => {
  return str ? str.toUpperCase() :  ''
}) // bacAbcCc
```

