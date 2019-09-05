<template>
<div>
  <head title="Raffle"></head>
  <image class="pageBg" src="root:img/activity/pageBg.png" />
  <div class="wrapper">
    <div class="topBtn">
      <div class="btnBox" @click="goNext('root:app/active/luckRule.js',{data: raffle.content})">
        <text class="boxIcon">&#xe612;</text>
        <text class="boxText">Rule</text>
      </div>
      <div class="btnBox" @click="goNext('root:app/active/luckPrize.js')">
        <text class="boxIcon">&#xe636;</text>
        <text class="boxText">Prize</text>
      </div>
    </div>
    <text class="luckTit">lucky wheel</text>
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
          <text class="lName">{{prizeList[7].name}}</text>
        </div>
      </div>
      <div class="imgItem img5Item" @click="prizeZhuan">
        <text class="lottery">lottery</text>
        <text class="lotteryTime">（{{raffle.users_number||0}} times）</text>
      </div>
      <div class="imgItem img6Item" :class="[prizeIndex==3?'activeBg':'']">
        <div class="imgItemLi">
          <text class="lName">{{prizeList[3].name}}</text>
        </div>
      </div>
      <div class="imgItem img7Item" :class="[prizeIndex==6?'activeBg':'']">
        <div class="imgItemLi">
          <text class="lName">{{prizeList[6].name}}</text>
        </div>
      </div>
      <div class="imgItem img8Item" :class="[prizeIndex==5?'activeBg':'']">
        <div class="imgItemLi">
          <text class="lName">{{prizeList[5].name}}</text>
        </div>
      </div>
      <div class="imgItem img9Item" :class="[prizeIndex==4?'activeBg':'']">
        <div class="imgItemLi">
          <text class="lName">{{prizeList[4].name}}</text>
        </div>
      </div>
    </div>
    <div class="massage" v-if="prizeInfoShow">
      <div class="havePrize" v-if="noPrizeShow">
        <div class="oneBar nopr">
          <text class="closeIcon" @click="close()">&#xe608;</text>
          <text class="noPTit">Unfortunately, you didn't win the prize.～</text>
        </div>
        <div class="noline"></div>
        <text class="infroma nopDes">It’s okay, the next time the goddess of luck will care for you.</text>

        <text class="btnDraw" @click="close()">Okay, I know</text>
      </div>

      <div class="havePrize" v-if="havePrizeShow">
        <div class="oneBar">
          <image class="prizeImg" :src="prizeList[prizePosition].image_url" />
          <text class="closeIcon" @click="close()">&#xe608;</text>
        </div>
        <text class="infroma">Congratulations on winning, you can check in the prizes</text>

        <text class="btnDraw" @click="lotteryRecord">Get it right now</text>
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
        users_number: 0
      },

      // mobile: '15114785236',
      prizeIndex: 8,
      clickFlage: true, // 点击事件，防止重复点击
      prizeInfoShow: false, // 显示中奖信息的遮罩层
      noPrizeShow: false, // 没中奖
      havePrizeShow: false, // 中奖了

      timer1: "",
      timer2: "",
      s1: "",
      s2: "",

      prizeList: ["", "", "", "", "", "", "", "", ""], // 奖项列表
      prizePosition: "", // 中奖位置1-8
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
    goNext(url, parmar) {
      this.push(url, parmar);
    },
    get() {
      coRefundTake({ users_id: this.userId }, (res, flag) => {
        if (flag) {
          if (res.code == 200) {
            // this.log(res.data.prize)
            this.prizeList = res.data.prize.sort((a, b) => {
              return a.position - b.position;
            });
            this.raffle = res.data.raffle;

            get_raffle_list({ raffle_id: this.raffle.id }, (res, flag) => {
              this.items = res.data.map(
                item =>
                  item.create_time +
                  " 用户" +
                  item.nickname +
                  " 获得" +
                  item.prize
              );
            });
          }
        }
      });
    },
    prizeZhuan() {
      if (this.raffle.users_number > 0) {
        // 判断剩余抽奖次数
        // console.log(this.$refs.pice)
        if (this.clickFlage) {
          if (this.raffle.status === 1) {
            // 活动开始
            this.clickFlage = false; // 不能点击
            this.timer1 = setInterval(this.move, 50);
            this.raffle.users_number--;
            //获取抽奖结果
            getraffle(
              { users_id: this.userId, raffle_id: this.raffle.id },
              (res, flag) => {
                if (flag) {
                  if (res.code == 200) {
                    this.prizeName = res.data.prize;
                    this.prizeUrl = res.data.prize;
                    for (let i = 0; i < this.prizeList.length; i++) {
                      if (res.data.position == this.prizeList[i].position) {
                        this.prizePosition = i;
                      }
                    }

                    if (res.data.type == 1) {
                      this.havePrizeShow = true;
                      this.noPrizeShow = false;
                    } else {
                      this.noPrizeShow = true;
                      this.havePrizeShow = false;
                    }

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
              }
            );
            // 请求，返回后给s定值
          } else if (this.startStatus === 2) {
            // 已经结束
            this.toast("活动已经结束");
          }
        }
      } else {
        // 没有抽奖机会了
        this.toast("没有抽奖机会");
      }
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

    // 降速
    lowSpeed() {
      clearInterval(this.timer1);
      this.clickFlage = false; // 不能点击
      this.timer2 = setInterval(this.move, 300);
      setTimeout(() => {
        this.s2 = this.prizePosition;
      }, 900);
    },
    // 停止
    stop() {
      this.clickFlage = false; // 不能点击
      this.prizeInfo(); // 弹出是否中奖
    },

    prizeInfo() {
      setTimeout(() => {
        this.prizeInfoShow = true;
        this.s2 = ""; // 不能点击
      }, 800);
    },
    close() {
      // 关闭中奖
      this.prizeInfoShow = false;
      this.noPrizeShow = false;
      this.havePrizeShow = false;
      this.clickFlage = true;
      this.prizeIndex = 8;
    },
    lotteryRecord() {
      this.toast("去领奖");
    }
  }
};
</script>

<style scoped>
.pageBg {
  flex: 1;
}
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  justify-content: center;
  align-items: center;
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

.xiaofu {
  width: 1.7 * 10px;
  height: 1.7 * 10px;
  border-radius: 100%;
  margin: 0 auto 0.3 * 10px;
}

.havePrize {
  width: 526px;
  padding-bottom: 50px;
  border-radius: 40px;
  position: absolute;
  background-color: #fff;
  border-radius: 10px;
  top: 342px;
  left: 110px;
  overflow: hidden;
  align-items: center;
}
.oneBar {
  width: 526px;
  height: 249px;
  background-color: #ffedef;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
  justify-content: center;
  align-items: center;
}
.nopr {
  background-color: #fff;
}
.noline {
  border-bottom-color: #303030;
  border-bottom-style: dashed;
  border-bottom-width: 1px;
  width: 443px;
}
.prizeImg {
  width: 265px;
  height: 140px;
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
.noPTit {
  font-size: 34px;
  line-height: 48px;
  color: #333333;
  width: 388px;
  text-align: center;
}
.nopDes {
  font-size: 26px;
  color: #ea2536;
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
