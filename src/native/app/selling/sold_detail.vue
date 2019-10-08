<template>
<div class="wrapper">
  <head title="line item"></head>
  <scroller>
    <div class="stepBox">
      <text class="line"></text>
      <text class="cicle active">1</text>
      <text class="cicle" :class="[goodInfo.type_2>=1?'active':'']">2</text>
      <text class="cicle" :class="[goodInfo.type_2>1?'activeStep':'']">3</text>
      <text class="cicle" :class="[goodInfo.type_2==3?'activeStep':'']">4</text>
      <div class="ciclebox">
        <text class="step1 activeStep">Unpaid</text>
        <text class="step2" :class="[goodInfo.type_2>=1?'activeStep':'']">Waiting for shipping</text>
        <text class="step3" :class="[goodInfo.type_2>1?'activeStep':'']">Shipped</text>
        <text class="step4" :class="[goodInfo.type_2==3?'activeStep':'']">Successful trade</text>
      </div>
    </div>

    <div class="section1">
      <!-- 未支付状态 -->
      <div class="secTop" v-if="!goodInfo.type_2">
        <text class="secTit">Buyer unpaid</text>
        <text class="secinfo">Payment will be cancelled in 23 hours and 59 minutes</text>
      </div>
      <!-- 已支付未发货 -->
      <div class="waitShip" v-if="goodInfo.type_2==1">
        <div class="orderMes">
          <text class="paidtip">Buyer paid,Please deliver the goods as soon as possible.</text>
          <text
            class="shipTime"
          >5 days, 23 hours, 59 minutes, the system will automatically cancel the transaction, please ship as soon as possible</text>
          <text class="buyers">{{goodInfo.name}} {{goodInfo.phone}}</text>
          <text class="buyAddress">{{goodInfo.address}}</text>
          <div class="connectBox">
            <text class="connect">Contact buyers</text>
          </div>
        </div>
      </div>
      <!-- 物流输入 -->
      <div class="wuliuMes" v-if="goodInfo.type_2==1">
        <div class="inputBox">
          <text class="inputTit">shipment number</text>
          <input class="inputCell" />
        </div>
        <div class="inputBox">
          <text class="inputTit">Delivery company</text>
          <div class="inputCell"></div>
        </div>
      </div>
      <!-- 物流信息 -->
      <div class="wuliuMes" v-if="goodInfo.type_2>1">
        <text class="paidtip">Delivery tracking</text>
        <div class="devList">
          <div class="itemList">
            <div class="lineBox">
              <text class="itemTit">Commodities have shipped</text>
              <text class="itemDec">The parcel is waiting for the rush</text>
            </div>
            <text class="radio"></text>
          </div>
          <div class="itemList">
            <div class="lineBox">
              <text class="itemTit">Commodities have shipped</text>
              <text class="itemDec">The parcel is waiting for the rush</text>
            </div>
            <text class="radio"></text>
          </div>
          <div class="Expand">
            <text class="ExpandTxt">Expand</text>
            <text class="ExpandIcon">&#xe60a;</text>
          </div>
        </div>
      </div>
      <div class="secCon">
        <text class="conBtn">Contact buyers</text>
        <text class="orders">orders</text>
        <div class="conSec" v-for="(item,index) in goodInfo.list" :key="index">
          <image class="goodImg" :src="item.thumb" />
          <div class="goodInfo">
            <text class="goodsName">{{item.title}}</text>
            <text class="goodsStu">Brand new</text>
            <div class="goodsPri">
              <text class="price">$ {{item.price}}</text>
              <text class="priTips">（Free shipping）</text>
            </div>
          </div>
        </div>
        <text class="orderTime">Order time：{{goodInfo.create_time}}</text>
        <text class="orderTime">Payment time：{{goodInfo.pay_time}}</text>
        <text class="orderTime">Trading method：{{goodInfo.take_type==1?'Delivery':'Delivery'}}</text>
      </div>
    </div>
  </scroller>
</div>
</template>

<script>
import { get_order_coInfo } from "../../mixin/ajax.js";
import asCore from "../../mixin/core";
export default {
  data() {
    return {
      users_id: "",
      orderId: "",
      goodInfo: {
        list: []
      }
    };
  },
  methods: {
    onLoad(parmar) {
      this.orderId = parmar.id;
      asCore.getBsessionid(userId => {
        this.users_id = userId;
        this.getOrderDetail();
      });
    },
    getOrderDetail() {
      get_order_coInfo(
        { users_id: this.users_id, co_order_id: this.orderId },
        (res, flag) => {
          this.log(res);
          if (flag) {
            if (res.code == 200) {
              this.goodInfo = res.data;
            }
          }
        }
      );
    }
  }
};
</script>

<style scoped>
.wrapper {
  background-color: #f5f5f5;
}

.stepBox {
  width: 750px;
  height: 275px;
  position: relative;
  background-color: #ffffff;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
}

.line {
  width: 657px;
  height: 2px;
  background-color: #d8d8d8;
  position: absolute;
  top: 141px;
  left: 47px;
}

.ciclebox {
  position: absolute;
  width: 750px;
  height: 275px;
  left: 0;
  top: 0;

  justify-content: space-around;
  align-items: center;
  flex-direction: row;
}

.cicle {
  border-radius: 75px;
  width: 75px;
  height: 75px;
  border-width: 1px;
  border-style: solid;
  border-color: #d8d8d8;
  background-color: #ffffff;
  text-align: center;
  line-height: 75px;
}

.step1 {
  margin-left: 40px;
  margin-top: 150px;
  font-size: 28px;
  color: #999999;
}

.step2 {
  margin-bottom: 150px;
  color: #999999;
  font-size: 28px;
}

.step3 {
  margin-top: 150px;
  color: #999999;
  font-size: 28px;
}

.step4 {
  margin-bottom: 150px;
  font-size: 28px;
  color: #999999;
}

.active {
  background-color: #ba8833;
  border-color: #ba8833;
  color: #ffffff;
}

.activeStep {
  color: #ba8833;
}

.section1 {
  margin-top: 20px;
  width: 750px;
  background-color: #ffffff;
}

.secTop {
  width: 750px;
  padding: 32px 32px 25px;
  border-bottom-width: 1px;
  border-bottom-color: #e8e8e8;
  border-style: solid;
}

.secTit {
  font-size: 32px;
  color: #383838;
}

.secinfo {
  margin-top: 10px;
  font-size: 22px;
  color: #383838;
}

.waitShip {
  background-color: #ffffff;
}

.orderMes {
  padding: 32px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #d8d8d8;
}

.paidtip {
  font-size: 32px;
  color: #383838;
}

.shipTime {
  color: #383838;
  font-size: 22px;
  margin-top: 16px;
  margin-bottom: 16px;
}

.buyers {
  color: #303030;
  font-size: 26px;
  margin-top: 20px;
  font-weight: 600;
  margin-bottom: 15px;
}

.buyAddress {
  color: #303030;
  font-size: 26px;
}

.connectBox {
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 20px;
  padding-bottom: 10px;
}

.connect {
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #303030;
  color: #ffffff;
  border-radius: 5px;
  text-align: center;
}

.connect:active {
  background-color: #dddddd;
}

.wuliuMes {
  padding: 32px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #d8d8d8;
}

.inputBox {
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
}

.inputTit {
  color: #333333;
  font-size: 24px;
  width: 210px;
}

.inputCell {
  flex: 1;
  height: 48px;
  border-width: 1px;
  border-color: #cdcdcd;
  border-style: solid;
  border-radius: 4px;
  padding-left: 20px;
}

.devList {
  padding-top: 20px;
  position: relative;
}
.Expand {
  position: absolute;
  right: 0;
  bottom: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.ExpandTxt {
  color: #888888;
  font-size: 16px;
  margin-right: 15px;
}
.ExpandIcon {
  font-family: iconfont;
  color: #888888;
  font-size: 30px;
}
.itemList {
  padding-left: 6px;
  margin-left: 6px;
  /* border-left-width: 1px;
		border-left-style: solid;
		border-left-color: #D8D8D8; */
  position: relative;
}

.lineBox {
  border-left-width: 1px;
  border-left-style: solid;
  border-left-color: #d8d8d8;
  padding-left: 20px;
  padding-bottom: 20px;
}

.radio {
  position: absolute;
  left: 0px;
  top: 0;
  background-color: #888888;
  width: 12px;
  height: 12px;
  border-radius: 6px;
}

.itemTit {
  color: #888888;
  font-size: 20px;
}

.itemDec {
  color: #888888;
  font-size: 16px;
}

.secCon {
  padding: 32px;
  position: relative;
}

.conBtn {
  position: absolute;
  right: 32px;
  top: 40px;
  background-color: #303030;
  height: 60px;
  line-height: 60px;
  color: #ffffff;
  font-size: 32px;
  padding: 0 20px;
}

.conBtn:active {
  background-color: #dddddd;
}

.orders {
  color: #303030;
  font-size: 32px;
}

.conSec {
  margin-top: 20px;
  flex-direction: row;
  margin-bottom: 20px;
}

.goodImg {
  width: 132px;
  height: 132px;
  margin-right: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: #dfdfdf;
}

.goodInfo {
  justify-content: flex-end;
}

.goodsName {
  color: #303030;
  font-size: 30px;
}

.goodsStu {
  margin-top: 10px;
  margin-bottom: 10px;
  color: #888888;
  font-size: 22px;
}

.goodsPri {
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}

.price {
  color: #ec414d;
  font-size: 30px;
  margin-right: 15px;
}

.priTips {
  font-size: 26px;
  color: #666666;
}

.orderTime {
  font-size: 26px;
  color: #888888;
  margin-top: 10px;
}
</style>
