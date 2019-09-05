<template>
<div>
  <head title="Raffle"></head>
  <div class="wrapper">
    <div class="topBtn">
      <div class="btnBox" @click="goNext('root:app/active/luckRule.js')">
        <text class="boxIcon">&#xe612;</text>
        <text class="boxText">Rule</text>
      </div>
      <div class="btnBox" @click="goNext('root:app/active/luckPrize.js')">
        <text class="boxIcon">&#xe636;</text>
        <text class="boxText">Prize</text>
      </div>
    </div>
    <text class="luckTit">lucky wheel</text>
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
    <image class="luckBg" src="root:img/activity/luckBg.png" />
    <div class="luckBox">
      <div class="imgItem img1Item" :class="[prizeIndex==0?'activeBg':'']">
        <div class="imgItemLi">
          <text class="lName">{{prizeList[0].name}}</text>
        </div>
      </div>
      <div class="imgItem img2Item" :class="[prizeIndex==1?'activeBg':'']">
        <div class="imgItemLi">
          <text class="lName">{{prizeList[1].name}}</text>
        </div>
      </div>
      <div class="imgItem img3Item" :class="[prizeIndex==2?'activeBg':'']">
        <div class="imgItemLi">
          <text class="lName">{{prizeList[2].name}}</text>
        </div>
      </div>
      <div class="imgItem img4Item" :class="[prizeIndex==7?'activeBg':'']">
        <div class="imgItemLi">
          <text class="lName">{{prizeList[3].name}}</text>
        </div>
      </div>
      <div class="imgItem img5Item" @click="prizeZhuan">
        <text class="lottery">lottery</text>
        <text class="lotteryTime">（{{raffle.users_number}} times）</text>
      </div>
      <div class="imgItem img6Item" :class="[prizeIndex==3?'activeBg':'']">
        <div class="imgItemLi">
          <text class="lName">{{prizeList[4].name}}</text>
        </div>
      </div>
      <div class="imgItem img7Item" :class="[prizeIndex==6?'activeBg':'']">
        <div class="imgItemLi">
          <text class="lName">{{prizeList[5].name}}</text>
        </div>
      </div>
      <div class="imgItem img8Item" :class="[prizeIndex==5?'activeBg':'']">
        <div class="imgItemLi">
          <text class="lName">{{prizeList[6].name}}</text>
        </div>
      </div>
      <div class="imgItem img9Item" :class="[prizeIndex==4?'activeBg':'']">
        <div class="imgItemLi">
          <text class="lName">{{prizeList[7].name}}</text>
        </div>
      </div>
    </div>
    <div class="massage" v-if="prizeInfoShow">
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
          <text class="closeIcon">&#xe608;</text>
        </div>
        <text class="infroma">Congratulations on winning, you can check in the prizes</text>

        <text class="btnDraw" @click="lotteryRecord">Get it right now</text>
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
    <div class="looperBox">
      <text class="loopIcon">&#xe60c;</text>
      <looper
        font-size="18"
        @click="ok"
        :data="items"
        color="#303030"
        style="width: 552;height: 25;"
      ></looper>
    </div>
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
import asCore from "../../mixin/core";
export default {
  data() {
    return {
      userId: "",
      raffle: {
        id: 1,
        title: "标题",
        num: 1,
        number: 0,
        cost: "10.00",
        content: null,
        status: 1,
        goods_id: "25,28",
        create_time: "2019-07-17 10:00:07",
        update_time: null,
        users_number: 2
      },
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
      prizeIndex: 8,
      arrNum: [0, 1, 2, 4, 7, 6, 5, 3], // 定义转动的顺序
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
      startStatus: 1, // 活动开始的状态，
      items: []
    };
  },
  beforeCreate() {
    // let navbar = weex.requireModule("navbar");
    // navbar.setStatusBarStyle("black");
  },
  methods: {
    onLoad() {
      asCore.getBsessionid(userId => {
        this.userId = userId;
        this.get();
      });
    },
    goNext(url) {
      this.push(url);
    },
    get() {
      coRefundTake({ users_id: this.userId }, (res, flag) => {
        if (flag) {
          if (res.code == 200) {
            this.prizeList = res.data.prize;
            this.raffle = res.data.raffle;
          }
        }
      });
      get_raffle_list({}, (res, flag) => {
        this.log(res);
        this.items = res.data.map(
          item =>
            item.create_time + " 用户" + item.nickname + " 获得" + item.prize
        );
      });
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
      this.prizeIndex++;
      if (this.prizeIndex > 7) {
        this.prizeIndex = 0;
      }
      if (this.s2 && this.prizeIndex == this.s2) {
        clearInterval(this.timer1);
        clearInterval(this.timer2);
        this.stop();
      }
      this.timeFlag += 100;
      if (this.timeFlag >= 10000 && !this.prizeName) {
        clearInterval(this.timer1);
        clearInterval(this.timer2);
        this.toast("当前抽奖人数过多，稍后再来");
        this.clickFlage = true; // 能点击
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
      if (this.raffle.users_number > 0) {
        // 判断剩余抽奖次数
        // console.log(this.$refs.pice)
        if (this.clickFlage) {
          if (this.startStatus === 1) {
            // 活动开始
            this.clickFlage = false; // 不能点击
            this.timer1 = setInterval(this.move, 50);
            //获取抽奖结果
            getraffle({}, (res, flag) => {
              if (flag) {
                if (res.code == 200) {
                  this.prozeLevel = res.data.position;
                  this.prizeName = res.data.prize;
                  this.prizeUrl = res.data.prize;
                  setTimeout(() => {
                    clearInterval(this.timer1);
                    this.lowSpeed();
                  }, 1200);
                } else {
                  this.toast(res.message);
                  this.clickFlage = false; // 不能点击
                  clearInterval(this.timer1);
                  clearInterval(this.timer2);
                }
              }
            });

            // this.timer1 = setInterval(this.move, 100)
            // 请求，返回后给s定值
          } else if (this.startStatus === 0) {
            this.toast("活动尚未开始");
            // 没开始
          } else if (this.startStatus === 2) {
            // 已经结束
            this.toast("活动已经结束");
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
.topBtn {
  width: 750px;
  padding: 24px 32px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.btnBox {
  width: 136px;
  height: 48px;
  border-radius: 29px;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
  background-image: linear-gradient(to right, #ff7868, #ff4337);
}
.boxText {
  color: #fff;
  font-size: 30px;
}
.boxIcon {
  color: #ff4337;
  font-family: iconfont;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: #fff;
  text-align: center;
  line-height: 32px;
}
.luckTit {
  line-height: 112px;
  text-align: center;
  font-size: 80px;
  color: #fb4136;
  margin-top: 54px;
  margin-bottom: 30px;
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
.luckBg {
  width: 640px;
  height: 608px;
}
.luckBox {
  width: 640px;
  height: 608px;
  margin-top: -608px;
  position: relative;
}
.imgItem {
  width: 168px;

  height: 141px;

  justify-content: center;

  align-items: center;
  position: absolute;
  /* background-color: #FFEDEF; */
  box-shadow: 0px 10px 5px #b0adae;
  border-radius: 20px;
}
.activeBg {
  background-color: #b0adae;
}

.img1Item {
  left: 62px;
  top: 57px;
}

.img2Item {
  left: 237px;
  top: 57px;
}
.img3Item {
  left: 414px;
  top: 57px;
}

.img4Item {
  left: 62px;
  top: 217px;
}

.img5Item {
  left: 237px;
  top: 217px;
}
.img6Item {
  left: 414px;
  top: 217px;
}
.img7Item {
  left: 62px;
  top: 375px;
}
.img8Item {
  left: 237px;
  top: 375px;
}
.img9Item {
  left: 414px;
  top: 375px;
}
.imgItemLi {
  width: 146px;
  height: 80px;
  background-color: #ec3e33;
  justify-content: center;
  align-items: center;
}
.lName {
  font-size: 20px;
  color: #ffffff;
  line-height: 28px;
  text-align: center;
  lines: 2;
}
.lottery {
  color: #f44035;
  font-size: 36px;
  line-height: 50px;
}
.lotteryTime {
  font-size: 24px;
  color: #f44035;
}

.massage {
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
  width: 526px;
  padding-bottom: 50px;
  border-radius: 40px;
  position: absolute;
  background-color: #fff;
  border-radius: 10px;
  top: 242px;
  left: 110px;
  align-items: center;
  overflow: hidden;
}
.oneBar {
  width: 526px;
  height: 249px;
  background-color: #ffedef;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
}
.closeIcon {
  position: absolute;
  right: 20px;
  top: 20px;
  font-family: iconfont;
  font-size: 30px;
  color: #fff;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: #bfbfbf;
  text-align: center;
  line-height: 48px;
}

.infroma {
  width: 430px;
  margin: 40px 0;
  text-align: center;
  color: #333;
  font-size: 26px;
  line-height: 37px;
}
.btnDraw {
  width: 370;
  height: 68px;
  line-height: 68px;
  color: #fff;
  font-size: 34px;
  text-align: center;
  background-color: #303030;
  border-radius: 34px;
}
.looperBox {
  width: 602px;
  height: 40px;
  margin-top: 27px;
  background-color: rgba(255, 181, 181, 1);
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.loopIcon {
  font-family: iconfont;
  font-size: 28px;
  margin: 0 12px;
  color: #d80115;
}
</style>
