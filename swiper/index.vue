<template>
  <div class="container">
    <ul class="tabList">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        :class="curTitleIndex === index ? 'curr' : ''"
        @click="handleTitleClick(index)"
      >{{ tab }}</li>
    </ul>
    <div class="main">
      <div class="wrapper" ref="wrapper" :style="comHeight(curTitleIndex)">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide>
            <div class="item" v-for="(item, index) in rewards" :key="index">
              <div class="item-main">1-{{index}}</div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="item" v-for="(item, index) in computedLists" :key="index">
              <div class="item-main">2-{{index}}</div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="item" v-for="(item, index) in records" :key="index">
              <div class="item-main">3-{{index}}</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
// 手写轮播
export default {
  data() {
    const self = this
    return {
      curTitleIndex: 0,
      tabs: ['奖励明细', '结算中', '提现记录'],
      rewards: [
        {
          policyNo: null,
          businessDate: "2019-11-27 10:42:40",
          changeBalance: -100,
          changeType: "可提现退保",
          insName: "测试产品",
          premium: "12.23",
          tax: null
        },
        {
          policyNo: null,
          businessDate: "2019-11-27 10:37:59",
          changeBalance: 100,
          changeType: "可提现",
          insName: "测试产品",
          premium: "12.23",
          tax: 1.8
        },
        {
          policyNo: null,
          businessDate: "2019-11-27 10:37:59",
          changeBalance: 200,
          changeType: "可提现",
          insName: "测试产品",
          premium: "12.23",
          tax: 3.6
        },
        {
          policyNo: null,
          businessDate: "2019-11-27 10:37:58",
          changeBalance: 300,
          changeType: "可提现",
          insName: "测试产品",
          premium: "12.23",
          tax: 5.4
        },
       
      ],
      computedLists: [
        {
          policyNo: "101-1-593-19-00001539880992533-00",
          businessDate: "2019-11-27 10:57:38",
          changeBalance: 100,
          changeType: "结算中",
          insName: "测试产品",
          premium: "12.23",
          tax: 0
        }
      ],
      records: [
        {
          businessDate: "2020-02-25 12:19:08",
          cardNum: "6222620210011788972111",
          cardType: "中国交通银行",
          changeBalance: 1,
          changeType: "提现中",
          fee: 1
        }
      ],
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        on: {
          slideChange() {
            // self.curTitleIndex = this.activeIndex;
            self.handleTitleClick(this.activeIndex)
          }
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    handleTitleClick(index) {
      this.curTitleIndex = index
      window.scrollTo(0, 0)
      this.swiper.slideTo(index, 1000, true)
    },
    comHeight() {
      let tempHeight = "90vh";
      if (this.curTitleIndex === 0) {
        tempHeight = (this.rewards && this.rewards.length * 250) + "px"
      } else if (this.curTitleIndex === 1) {
        tempHeight =
          (this.computedLists && this.computedLists.length * 250) + "px"
      } else if (this.curTitleIndex === 2) {
        tempHeight = (this.records && this.records.length * 250) + "px"
      }
      return `height: ${tempHeight}`
    },
  },
}
</script>
<style lang="scss">
.container .swiper-slide {
  height: auto;
}
</style>
<style lang="scss" scoped>
.container {
  width: 100%;
  overflow: hidden;
  .tabList {
    width: 100%;
    height: 0.9rem;

    position: fixed;
    z-index: 99;
    top: 0;
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 0.3rem;
    background: #fff;
    margin-bottom: 0.1rem;
    box-shadow: 0 0.05rem 0.1rem 0 rgba(0, 0, 0, 0.08);
    li {
      flex: 1;
    }

    .curr {
      color: #f9736c;
      position: relative;
    }

    .curr:after {
      position: absolute;
      left: 50%;
      margin-left: -0.3rem;
      bottom: -0.29rem;
      background: #f9736c;
      width: 0.6rem;
      height: 0.04rem;
      content: "";
      z-index: 2;
    }
  }
  .main {
    overflow: hidden;
    margin-top: 1rem;
  }
  .item {
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    padding: 0.44rem 0.3rem 0;
    color: #333333;
    font-size: 0.5rem;
    text-align: center;
    border-bottom: 0.1rem solid #333;
  }
}
</style>
