<template>
<div>
  <head bgcolor="transparent" title="raffle" titleColor="#333"></head>
  <div class="wrapper">
    <!-- <div class="banner">
      <image class="bannerImg" src="root:img/activity/banner.png" />  
      <div class="prizeInfoBtn" @click="activityRecord" v-if="hasRecord">
        <img class="prizeInfoBtnImg" src="root:img/activity/prizeInfo.png" />
      </div>
      <text class="priceChanceBtn">您有{{remainingTimes}}次抽奖机会</text>
    <div class="whiteBar1 whiteBar">
        <image src="root:img/activity/whiteBar.png" />
      </div>
      <div class="whiteBar2 whiteBar">
        <image src="root:img/activity/whiteBar.png" />
      </div>
      <div class="whiteBar3 whiteBar">
        <image src="root:img/activity/whiteBar.png" />
      </div>
      <div class="whiteBar4 whiteBar">
        <image src="root:img/activity/whiteBar.png" />
      </div> 
    </div>-->
    <div class="box">
      <div class="imgItem" v-for="imgLi in prizeList" :key="imgLi.image_url">
        <image class="imgItemLi" :src="imgLi.image_url" v-if="imgLi.image_url" />
      </div>
    </div>
    <div class="massage" v-if="prizeInfoShow" @touchmove="touchMove($event)">
      <div class="noPrize" v-if="noPrizeShow">
        <div class="close" @click="close()">
          <img src="root:img/activity/close.png" alt />
        </div>
        <text>很遗憾，您没有中奖</text>
        <div class="xiaofu">
          <img src="root:img/activity/noprizeXF.png" alt />
        </div>
        <text class="btn" @click="goIndex">去逛逛吧</text>
      </div>
      <img src="root:img/activity/circleLight.png" class="circleLight" v-if="havePrizeShow" alt />
      <div class="havePrize" v-if="havePrizeShow">
        <div class="oneBar">
          <img src="root:img/activity/yellowCycle.png" />
        </div>
        <text>恭喜您抽中{{prizeName}}</text>
        <div class="proImg">
          <img :src="prizeUrl" alt />
        </div>
        <div class="btn" @click="lotteryRecord">
          <text>立即领取</text>
        </div>
      </div>
      <div class="haveLottery" v-if="haveLottery">
        <div class="close" @click="close()">
          <img src="root:img/activity/close.png" alt />
        </div>
        <div class="xiaofu">
          <img src="root:img/activity/receivedXF1.png" alt />
        </div>
        <text>您已经抽过奖啦，不要太贪心哦！</text>
        <text class="btn" @click="close()">我知道啦</text>
      </div>
    </div>

    <looper
      font-size="25"
      @click="ok"
      :data="items"
      color="#BA8833"
      style="  border-radius: 30px;width: 602;height: 50;background-color:#FDF2E9;padding-left:20px"
    ></looper>
  </div>
</div>
</template> 

<script> 
const navigator = weex.requireModule("navigator");
const animation = weex.requireModule("animation");

import {
  coRefundTake,
  getraffle,
  getUserRaffle_list,
  get_raffle_list
} from "../../mixin/ajax";

export default {
  data() {
    return {
      swiperName: {
        // 获奖名单
        loop: true, // 当获奖人数大于等于5的时候滚动，否则不滚动
        direction: "vertical",
        slidesPerView: 5,
        freeMode: true,
        freeModeMomentum: true,
        freeModeMomentumVelocityRatio: 1,
        autoplay: 1000
      },
      // mobile: '15114785236',
      prizeIndex: 0,
      arrNum: [0, 1, 2, 5, 8, 7, 6, 3], // 定义转动的顺序
      clickFlage: true, // 点击事件，防止重复点击
      prizeInfoShow: false, // 显示中奖信息的遮罩层
      noPrizeShow: false, // 没中奖
      havePrizeShow: false, // 中奖了
      haveLottery: false, // 已经抽过奖了
      timer1: "",
      timer2: "",
      s1: "",
      s2: "",
      // lotteryDefineId: '3eb7b32ba51b4f9486e3dd368dad24c4', // 抽奖活动的id
      lotteryDefineId: "", // 抽奖活动的id
      winnerNum: "20",
      prizeDesc: [], // 奖品说明
      lotteryDesc: [], // 活动说明
      hasRecord: false, // 是否显示获奖情况
      remainingTimes: "", // 剩余抽奖次数
      prizeList: ["", "", "", "", "", "", "", "", ""], // 奖项列表
      prizeLevel: "", // 中奖等级
      prizeName: "", // 奖品名称
      prizeUrl: "", // 奖品图片
      prizers: [], // 获奖名单
      timeFlag: 0, // 时间标记，抽奖请求时间过长，则返回错误
      startStatus: "", // 活动开始的状态，
      items: [
        
      ]
    };
  },
  beforeCreate() {
    let navbar = weex.requireModule("navbar");
    navbar.setStatusBarStyle("black");
  },
  methods: {
    onLoad() {
      this.get();
    },
    get() {
      coRefundTake(
        {
          users_id: "1212",
          total_order_id: "333"
        },
        (res, flag) => {
          if (flag) {
            if (res.code == 200) {
              this.prizeList = res.data.prize;
              this.prizeList[8] = res.data.prize[1];
              // this.prizeList[1] = res.data.prize[1];
              // this.prizeList[2] = res.data.prize[2];
              // this.prizeList[3] = res.data.prize[3];
              // this.prizeList[4] = res.data.prize[4];
              // this.prizeList[5] = res.data.prize[5];
              // this.prizeList[6] = res.data.prize[6];
              // this.prizeList[7] = res.data.prize[7];
            }
          }
        }
      );
       get_raffle_list({},(res,flag)=>{
         this.log(res)
         this.items=res.data
       })
    },
    statusFun(c, s, e) {
      this.$nextTick(() => {
        if (c < s) {
          // 当前时间小于开始时间，未开始
          this.startStatus = 0;
          // this.$refs.pice[4].style.backgroundImage = "url(" + notStart + ")";
        } else if (c > s && c < e) {
          // 当前时间大于开始时间，并且小于结束时间，已经开始未结束
          this.startStatus = 1;
          // this.$refs.pice[4].style.backgroundImage = "url(" + prizeBtn + ")";
        } else if (c > e) {
          // 当前时间大于结束时间，已经结束
          this.startStatus = 2;
          // this.$refs.pice[4].style.backgroundImage = "url(" + endLottery + ")";
        }
      });
    },
    move() {
      // if (this.prizeIndex === 0) {
      //   this.$refs.pice[this.arrNum[7]].style.backgroundImage =
      //     "url(" + noSelect + ")";
      //   this.$refs.pice[this.arrNum[this.prizeIndex]].style.backgroundImage =
      //     "url(" + isSelect + ")";
      //   this.prizeIndex++;
      // } else if (this.prizeIndex === 8) {
      //   this.prizeIndex = 0;
      //   this.$refs.pice[this.arrNum[7]].style.backgroundImage =
      //     "url(" + noSelect + ")";
      //   this.$refs.pice[this.arrNum[this.prizeIndex]].style.backgroundImage =
      //     "url(" + isSelect + ")";
      //   this.prizeIndex++;
      // } else {
      //   this.$refs.pice[
      //     this.arrNum[this.prizeIndex - 1]
      //   ].style.backgroundImage = "url(" + noSelect + ")";
      //   this.$refs.pice[this.arrNum[this.prizeIndex]].style.backgroundImage =
      //     "url(" + isSelect + ")";
      //   this.prizeIndex++;
      // }
      if (this.s2 && this.prizeIndex == this.s2) {
        clearInterval(this.timer1);
        clearInterval(this.timer2);
        this.stop();
      }
      this.timeFlag += 100;
      if (this.timeFlag >= 10000 && !this.prizeName) {
        clearInterval(this.timer1);
        clearInterval(this.timer2);
        Toast({
          message: "当前抽奖人数过多，稍后再来",
          position: "middle",
          duration: 1500
        });
        this.clickFlage = true; // 能点击
        setTimeout(() => {
          // 刷新后重新加载
          location.reload();
        }, 1500);
      }
    },
    // 停止
    stop() {
      this.clickFlage = false; // 不能点击
      this.prizeInfo(); // 弹出是否中奖
    },
    // 降速
    lowSpeed() {
      clearInterval(this.timer1);
      this.clickFlage = false; // 不能点击
      this.timer2 = setInterval(this.move, 300);
      setTimeout(() => {
        // 顺序打乱
        if (this.prozeLevel == 2) {
          this.s2 = 7;
        } else if (this.prozeLevel == 3) {
          this.s2 = 4;
        } else if (this.prozeLevel == 4) {
          this.s2 = 3;
        } else if (this.prozeLevel == 7) {
          this.s2 = 2;
        } else {
          this.s2 = this.prozeLevel;
        }
      }, 900);
    },

    prizeZhuan() {
      if (this.remainingTimes > 0) {
        // 判断剩余抽奖次数
        // console.log(this.$refs.pice)
        if (this.clickFlage) {
          if (this.startStatus === 1) {
            // 活动开始
            this.clickFlage = false; // 不能点击
            this.timer1 = setInterval(this.move, 100);
            //获取抽奖结果
            // this.$http.get("../../../static/data/prizeInfo.json").then(
            //   myData => {
            //     let res = myData.data;
            //     console.log(res);
            //     if (res.success) {
            //       this.prozeLevel = res.data.level;
            //       this.prizeName = res.data.commodityName;
            //       this.prizeUrl = res.data.picUrlWinning;
            //       console.log(this.prozeLevel);
            //       setTimeout(() => {
            //         clearInterval(this.timer1);
            //         this.lowSpeed();
            //       }, 1200);
            //     } else {
            //       Toast({
            //         message: res.bizMessage,
            //         position: "middle",
            //         duration: 1500
            //       });
            //       this.clickFlage = false; // 不能点击
            //       clearInterval(this.timer1);
            //       clearInterval(this.timer2);
            //       // setTimeout(() => { // 刷新后重新加载
            //       //   location.reload()
            //       // }, 1500)
            //     }
            //   },
            //   false,
            //   true
            // );
            // this.timer1 = setInterval(this.move, 100)
            // 请求，返回后给s定值
          } else if (this.startStatus === 0) {
            // 没开始
            Toast({
              message: "活动尚未开始",
              position: "middle",
              duration: 1500
            });
          } else if (this.startStatus === 2) {
            // 已经结束
            Toast({
              message: "活动已经结束",
              position: "middle",
              duration: 1500
            });
          }
        }
      } else {
        // 没有抽奖机会了
        this.prizeInfoShow = true;
        this.haveLottery = true;
      }
    },
    touchMove(e) {
      e.preventDefault(); // 禁止滚动
      e.stopPropagation();
    },
    prizeInfo() {
      setTimeout(() => {
        this.prizeInfoShow = true;
        this.havePrizeShow = true;
      }, 800);
    },
    close() {
      // 关闭没中奖
      this.prizeInfoShow = false;
      this.noPrizeShow = false;
      this.haveLottery = false;
    },
    goIndex() {
      this.$router.push({ name: "preferIndex" });
      this.prizeInfoShow = false; // 显示中奖信息的遮罩层
      this.noPrizeShow = false; // 没中奖
    },
    lotteryRecord() {
      this.$router.push({
        name: "lotteryRecord",
        query: {
          lotteryDefineId: this.lotteryDefineId
        }
      });
    }
  }
};
</script>

<style scoped>
.wrapper {
  justify-content: flex-start;
  align-items: center;
  flex: 1;
}

.banner {
  width: 750px;
  height: 350px;
  position: relative;
}
.bannerImg {
  width: 750px;
  height: 350px;
}

.prizeInfoBtn {
  width: 200px;
  height: 127px;
  position: absolute;
  top: 0;
  right: 0;
}
.prizeInfoBtnImg {
  width: 200px;
  height: 127px;
}
.priceChanceBtn {
  height: 0.6 * 10px;
  border-radius: 0.6 * 10px;
  background-color: #ff7a00;
  position: absolute;
  bottom: -0.3 * 10px;
  left: 50%;
  transform: translateX(-50%);
  line-height: 0.6 * 10px;
  font-size: 0.34 * 10px;
  color: #fff;
  font-weight: 500;
  text-align: center;
  padding: 0.06 * 10px 0.4 * 10px;
}
.whiteBar {
  position: absolute;
  z-index: 0;
  transform: rotate(-30deg);
}
img {
  width: 100%;
  height: 100%;
  display: block;
}
.whiteBar1 {
  top: 4 * 10px;
  left: -3 * 10px;
  width: 7.9 * 10px;
  height: 1.8 * 10px;
}
.whiteBar2 {
  top: 4.2 * 10px;
  right: -2 * 10px;
  width: 7.9 * 10px;
  height: 2.3 * 10px;
}
.whiteBar3 {
  top: 9.3 * 10px;
  left: -1.8 * 10px;
  width: 7.9 * 10px;
  height: 1.75 * 10px;
}
.whiteBar4 {
  top: 9.2 * 10px;
  left: 2.5 * 10px;
  width: 7.9 * 10px;
  height: 1.36 * 10px;
}
.box {
  margin: 26px;
  width: 641px;
  /* height: 690px; */
  padding: 20px;
  background-color: #d80115;
  border-radius: 10px;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}
.imgItem {
  width: 170px;
  background-color: #fff;
  height: 160px;
  margin: 10px;
  justify-content: center;

  align-items: center;
}
.imgItemLi {
  width: 170px;
  height: 160px;
}

.massage {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.noPrize {
  width: 5.3 * 10px;
  height: 4.4 * 10px;
  background-color: #fff;
  position: absolute;
  top: 3.2 * 10px;
  left: 1.1 * 10px;
  border-radius: 0.4 * 10px;
}
.close {
  position: absolute;
  width: 0.51 * 10px;
  height: 0.51 * 10px;
  top: -0.8 * 10px;
  right: 0;
}
.xiaofu {
  width: 1.7 * 10px;
  height: 1.7 * 10px;
  border-radius: 100%;
  margin: 0 auto 0.3 * 10px;
}
.btn {
  width: 3.7 * 10px;
  height: 0.9 * 10px;
  margin: 0 auto;
  /* background: url("root:img/lottery/btn.png") no-repeat; */
  background-size: 100%;
  font-size: 0.36 * 10px;
  color: #fff;
  line-height: 0.9 * 10px;
  text-align: center;
  font-weight: 600;
}
.haveLottery {
  width: 5.3 * 10px;
  height: 4.4 * 10px;
  background-color: #fff;
  position: absolute;
  top: 3.2 * 10px;
  left: 1.1 * 10px;
  border-radius: 0.4 * 10px;
}
.close {
  position: absolute;
  width: 0.51 * 10px;
  height: 0.51 * 10px;
  top: -0.8 * 10px;
  right: 0;
}
.xiaofu {
  width: 1.7 * 10px;
  height: 1.7 * 10px;
  margin: 0.3 * 10px auto 0.2 * 10px;
}
p {
  font-size: 0.3 * 10px;
  color: #707070;
  margin: 0.21 * 10px auto 0.37 * 10px;
  text-align: center;
}
.btn {
  width: 3.7 * 10px;
  height: 0.9 * 10px;
  margin: 0 auto;
  /* background: url("root:img/lottery/btn.png") no-repeat; */
  background-size: 100%;
  font-size: 0.36 * 10px;
  color: #fff;
  line-height: 0.9 * 10px;
  text-align: center;
  font-weight: 600;
}
.circleLight {
  width: 9.22 * 10px;
  height: 9.22 * 10px;
  position: absolute;
  top: 0.8 * 10px;
  left: 50%;
  margin-left: -4.61 * 10px;
  animation: rotate 20s infinite linear;
  transform-origin: 50% 50%;
}
.havePrize {
  width: 5.3 * 10px;
  padding-bottom: 0.5 * 10px;
  border-radius: 0.4 * 10px;
  position: absolute;
  top: 2.42 * 10px;
  left: 1.1 * 10px;
  /* background: #fff url("root:img/lottery/prizinig.png") no-repeat; */
  background-position: top center;
  background-size: 5.3 * 10px 1.42 * 10px;
}
.oneBar {
  width: 1.18 * 10px;
  height: 0.46 * 10px;
  position: absolute;
  top: -0.1 * 10px;
  right: 1.1 * 10px;
}
p {
  padding: 0 0.1 * 10px;
  font-size: 0.3 * 10px;
  color: #707070;
  font-weight: 600;
  margin: 1.72 * 10px auto 0.2 * 10px;
  text-align: center;
}
.proImg {
  width: 4.1 * 10px;
  height: 2 * 10px;
  margin: 0 auto 0.36 * 10px;
}
img {
  width: 100%;
  height: 100%;
}
.btn {
  width: 3.7 * 10px;
  height: 0.9 * 10px;
  margin: 0 auto;
  /* background-image: url("root:img/lottery/btn.png") no-repeat; */
  background-size: 100%;
  text-align: center;
}
a {
  font-size: 0.36 * 10px;
  color: #fff;
  line-height: 0.9 * 10px;
  text-align: center;
  font-weight: 600;
}
</style>
