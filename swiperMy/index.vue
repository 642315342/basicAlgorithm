<template>
  <div class="container" ref="container">
    <ul class="tabList">
      <li
        v-for="(tab,index) in tabs"
        :key="index"
        :class="curTitleIndex === index ? 'curr' : ''"
        @click="handleTitleClick(index)"
      >{{ tab }}</li>
    </ul>
    <div class="main" ref="main">
      <div class="wrapper" ref="wrapper">
        <div class="wrapper-item reward-lists">
          <div class="reward-item" v-for="reward in rewards" :key="reward.id">
            <div class="item-main">
              <div class="item-top">
                <p class="name">{{ reward.insName }}</p>
                <p class="reward-status">{{ reward.changeType | rewardStatus}}</p>
              </div>
              <div class="item-middle">
                <p class="info">保费：￥{{ reward.premium |feeFormat}}</p>
                <p class="money">
                  <span>+</span>
                  ￥{{ reward.premium |feeFormat}}
                </p>
              </div>
              <div class="item-bottom">
                <p>{{ reward.businessDate |applyDate}}</p>
                <p>已扣税 ￥{{reward.premium |feeFormat}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="wrapper-item computed-lists">
          <div class="computed-item" v-for="reward in rewards" :key="reward.id">
            <div class="item-main">
              <div class="item-top">
                <p class="name">{{ reward.insName }}</p>
                <p class="reward-status">{{ reward.changeType | rewardStatus}}</p>
              </div>
              <div class="item-middle">
                <p class="info">保费：￥{{ reward.premium |feeFormat}}</p>
                <p class="money computed-money">
                  <span>+</span>
                  ￥{{ reward.premium |feeFormat}}
                </p>
              </div>
              <div class="item-bottom">
                <p>{{ reward.businessDate |applyDate}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="wrapper-item computed-lists">
          <div class="computed-item" v-for="reward in rewards" :key="reward.id">
            <div class="item-main">
              <div class="item-top">
                <p class="name">{{ reward.insName }}</p>
                <p class="reward-status">{{ reward.changeType | rewardStatus}}</p>
              </div>
              <div class="item-middle">
                <p class="info">保费：￥{{ reward.premium |feeFormat}}</p>
                <p class="money computed-money">
                  <span>+</span>
                  ￥{{ reward.premium |feeFormat}}
                </p>
              </div>
              <div class="item-bottom">
                <p>{{ reward.businessDate |applyDate}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 手写轮播
export default {
  name: "RewardDetail",
  data() {
    return {
      titleFix: ["aa", "bb", "cc", "dd", "ee", "ff"],
      curTitleIndex: 0,

      tabs: ["奖励明细", "月度收入", "提现记录"],
      rewards: [
        {
          accountId: 7553354084384768,
          businessDate: "2019/11/24 00:00:00",
          changeBalance: 26.56,
          changeType: "INSURE",
          companyId: 19,
          id: 441,
          insName: "111111111111111111",
          policyNo: "101-1-593-19-0000220509-00",
          premium: 113,
          sellerId: 3239102644224,
          source: "DIRECT"
        },
        {
          accountId: 7553354084384768,
          businessDate: "2019/11/24 00:00:00",
          changeBalance: 26.56,
          changeType: "INSURE",
          companyId: 19,
          id: 442,
          insName: "京2222222222222222222",
          policyNo: "101-1-593-19-0000220509-00",
          premium: 113,
          sellerId: 3239102644224,
          source: "DIRECT"
        },
        {
          accountId: 7553354084384768,
          businessDate: "2019/11/24 00:00:00",
          changeBalance: 26.56,
          changeType: "INSURE",
          companyId: 19,
          id: 444,
          insName: "京3333333333333333333",
          policyNo: "101-1-593-19-0000220509-00",
          premium: 113,
          sellerId: 3239102644224,
          source: "DIRECT"
        },
        {
          accountId: 7553354084384768,
          businessDate: "2019/11/24 00:00:00",
          changeBalance: 26.56,
          changeType: "INSURE",
          companyId: 19,
          id: 445,
          insName: "京444444444444444444444",
          policyNo: "101-1-593-19-0000220509-00",
          premium: 113,
          sellerId: 3239102644224,
          source: "DIRECT"
        },
        {
          accountId: 7553354084384768,
          businessDate: "2019/11/24 00:00:00",
          changeBalance: 26.56,
          changeType: "INSURE",
          companyId: 19,
          id: 446,
          insName: "京55555555555555555555",
          policyNo: "101-1-593-19-0000220509-00",
          premium: 113,
          sellerId: 3239102644224,
          source: "DIRECT"
        },
        {
          accountId: 7553354084384768,
          businessDate: "2019/11/24 00:00:00",
          changeBalance: 26.56,
          changeType: "INSURE",
          companyId: 19,
          id: 447,
          insName: "京66666666666666666666666",
          policyNo: "101-1-593-19-0000220509-00",
          premium: 113,
          sellerId: 3239102644224,
          source: "DIRECT"
        },
        {
          accountId: 7553354084384768,
          businessDate: "2019/11/24 00:00:00",
          changeBalance: 26.56,
          changeType: "INSURE",
          companyId: 19,
          id: 448,
          insName: "京7777777777777777777777777",
          policyNo: "101-1-593-19-0000220509-00",
          premium: 113,
          sellerId: 3239102644224,
          source: "DIRECT"
        }
      ],
      records: [
        {
          id: 1
        }
      ]
    };
  },
  mounted() {
    //   setTimeout((() => {
    this.$nextTick(() => {
      let self = this;
      let wrapper = this.$refs.wrapper; // wrapper
      let main = this.$refs.main; // wrapper
      let body = document.documentElement || document.body;
      let wrapperWidth = wrapper.offsetWidth; // 每一个wrapper宽
      let childNum = wrapper.children.length; // 有几个需要划的盒子
      let startX = 0,
        endX = 0,
        startY = 0,
        endY = 0;
      let subX = 0; // X差
      let subY = 0; // Y差
      // let tranY = 0 // Y 最后滑动Y  // Y轴也监听 手动改值 时候
      let dir = 0; // 方向  >0 X轴 < 0 Y轴
      let flag = true; // 往哪边划 只算一次
      let fixedY = 0; // fixed距离
      // body.addEventListener('touchstart', function(e) {
      //       console.log('body-----touchstart');

      // })
      // body.addEventListener('touchmove', function(e) {
      //       console.log('body-----touchmove');

      // })
      wrapper.addEventListener("touchstart", function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        // 每次 touchstart 都 需要重置
        subX = 0;
        subY = 0;
        dir = 0;
        flag = true;
        fixedY = 0;
        // tranY = 0   // Y轴也监听 手动改值 时候
      });
      wrapper.addEventListener("touchmove", function(e) {
        endX = e.touches[0].clientX;
        endY = e.touches[0].clientY;
        console.log("touchmove");

        subX = endX - startX - subX;
        subY = endY - startY - subY;
        // tranY = endY-startY  // Y轴也监听 手动改值 时候
        // touchmove 都是操作 X 轴 滚动 当判断到是向Y 滚就直接return 后续X滑动
        if (dir < 0) {
          // wrapper.style= `transition: all 0s linear;transform: translateY(${ endY-startY}px)`
          return;
        } else {
          e.preventDefault();
        }
        if (flag && Math.abs(subY) > Math.abs(subX)) {
          flag = false;
          dir = -1; // 向 Y 轴 移动
          return;
        } else if (flag && Math.abs(subY) < Math.abs(subX)) {
          // 向 X 轴 移动 fixed
          dir = 1;
          flag = false;
          fixedY =
            document.documentElement.scrollTop || document.body.scrollTop;
          document.body.style = `position: fixed;top:${-fixedY}px;`;
        }
        if (childNum === 1) {
          //只有 一个 不能划
          return;
        } else if (
          (subX < 0 && self.curTitleIndex !== childNum - 1) ||
          (subX > 0 && self.curTitleIndex !== 0)
        ) {
          wrapper.style = `transition: all 0s linear;transform: translate3d(${-self.curTitleIndex *
            wrapperWidth +
            (endX - startX)}px, 0px, 0px)`;
        }
      });
      wrapper.addEventListener("touchend", function(e) {
        console.log();

        if (dir < 0) {
          wrapper.style = `transition: all 0.3s linear;transform: translate3d(${-self.curTitleIndex *
            wrapperWidth}px, 0px, 0px)`;
          // wrapper.style= `transition: all 0s linear;transform: translateY(${tranY}px)` // Y轴也监听 手动改值 时候
          return;
        }
        if (startX && endX && Math.abs(subX) > wrapperWidth * 0.05) {
          if (startX < endX && self.curTitleIndex > 0) {
            self.curTitleIndex -= 1;
          } else if (startX > endX && self.curTitleIndex < childNum - 1) {
            self.curTitleIndex += 1;
          }
        }
        self.curTitleIndex = self.curTitleIndex;
        wrapper.style = `transition: all 0.3s linear;transform: translate3d(${-self.curTitleIndex *
          wrapperWidth}px, 0px, 0px)`;
        self.$nextTick(() => {
          document.body.style = `position: relative`;
          document.documentElement.scrollTop = document.body.scrollTop = fixedY;
        });
      });

      //   }), 1000)
    });
  },
  filters: {
    rewardStatus(changeType) {
      switch (changeType) {
        case "INSURE":
          return "可提现";
          break;
        case "CANCEL":
          return "退保中";
          break;
      }
    },
    feeFormat(number) {
      if (number) {
        return number.toFixed(2);
      } else {
        return 0.0;
      }
    },
    applyDate(date) {
      if (date) {
        date = new Date(date);
        // date = +date + 3 * 1000 * 60 * 60 * 24;
        // date = new Date(date);

        return date;
      } else {
        return null;
      }
    }
  },
  methods: {
    handleTitleClick(index) {
      let wrapper = this.$refs.wrapper; // wrapper
      let wrapperWidth = wrapper.offsetWidth; // 每一个wrapper宽
      this.curTitleIndex = index;
      this.curTitleIndex = index;
      wrapper.style = `transition: all 0.3s linear;transform: translate(${-this
        .curTitleIndex * wrapperWidth}px)`;
    }
  }
};
</script>

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
  .wrapper {
    display: flex;
    color: #fff;
    font-size: 30px;
    line-height: 50px;
    margin-bottom: 1.5rem;
    transition: all 0.3s linear;
  }
  .wrapper-item {
    width: 100%;
    flex-shrink: 0;
    .reward-item,
    .computed-item {
      width: 100%;
      padding: 0.44rem 0.3rem 0;
    }
    .item-main {
      border-bottom: 0.01rem solid #e3e6eb;
    }
    .item-top,
    .item-middle,
    .item-bottom {
      font-size: 0.3rem;
      color: #666;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        width: 5.33rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        line-height: 0.4rem;
      }
      .reward-status {
        padding: 0.1rem 0.14rem;
        line-height: 0.4rem;
        font-family: "jd black";
        background: #a8bd44;
        border-radius: 0.04rem;
        font-size: 0.24rem;
        color: #ffffff;
        line-height: 0.24rem;
      }
      .back {
        background: #f97d75;
      }
      .computed {
        background: #9eb2c0;
      }
      .info {
        font-size: 0.24rem;
        color: #666666;
        line-height: 0.4rem;
      }
      .money {
        opacity: 0.99;
        font-family: JDZhengHei-01-Regular;
        font-size: 0.4rem;
        color: #333333;
        line-height: 0.3rem;
      }
      .computed-money {
        position: absolute;
        top: 0.3rem;
        right: 0;
      }
    }
    .item-top {
      margin-bottom: 0.35rem;
    }
    .item-middle {
      font-size: 0.28rem;
      line-height: 0.24rem;
      margin-bottom: 0.25rem;
      position: relative;
    }
    .item-bottom {
      font-size: 0.24rem;
      line-height: 0.24rem;
      color: #848484;
      margin-bottom: 0.3rem;
    }
  }
}
</style>
