<template>
	<div>
		<!-- <image class="pageImg" src="root:img/page/13.png"></image> -->
		<head :back="true" bgcolor="#303030" title="Order details"></head>
		<div class="pageContent">
			<div class="orderDetail">
				<div class="order_top">
					<image class="googPic" src="root:img/goods.png"></image>
					<div class="goods_info">
						<text class="goods_title">{{goods_title}}</text>
						<div class="goods_spec">
							<div class="priceInfo">
								<text class="symbol">￥</text> <text class="money">{{sumPrice}}</text>
							</div>
							<div class="specInfo">
								<text class="specText">red</text>
								<text class="iconDown">&#xe613;</text>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="methodBox row jbew acen ">
				<text class="meth_title">Shipping method</text>
				<div class="meth_right row jend acen">
					<text class="shipping">Free shipping</text>
					<text class="shippingMoney">￥0.00</text>
				</div>
			</div>
			<div class="messagebox" @click="setAddress">
				<div class="locationBox row jbew atop ">
					<text class="meth_title locaTit">Location</text>
					<div class="meth_right   row jend atop">
						<text class="cityName">Hefei City ,Anhui Province</text>
						<text class="rightIcon">&#xe6a1;</text>
					</div>
				</div>
				<div class="locationBox row jbew atop ">
					<text class="meth_title locaTit">Address</text>
					<div class="meth_right   row jend atop">
						<text class="cityName">Hefei City ,Anhui Province AnhuiAnhuiAnhui</text>
						<text class="rightIcon">&#xe6a1;</text>
					</div>
				</div>
			</div>
			<div class="footer">
				<div class="settlement">
					<div class="sum"><text class="sumTitle">Order total:</text> <text class="symbol">￥</text> <text class="money">{{sumPrice}}</text></div>
					<text class="btn" @click="toPay">confirm</text>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const navigator = weex.requireModule("navigator");
export default {
  data() {
    return {
      sumPrice: "52.30",
      goods_title:
        "AJOY SAHU Baggage Girls 2019 New Style Small Popular Design Baggage Girls with Skewed Skin and Single Shoulder Baggage Girls"
    };
  }, 
  methods: {
    setAddress() {
      navigator.push("root:app/user/address/edit.js");
    },
    toPay() {
      navigator.push("root:app/pay/payment.js");
    }
  }
};
</script>

<style scoped>
.pageImg {
  width: 750px;
  height: 1334px;
}

.pageContent {
  /* margin-top: -1334px; */
  background-color: #f2f2f2;
  flex: 1;
  width: 750px;
}

.orderDetail {
  padding: 30px;
  background-color: #fff;
}

.order_top {
  flex: 1;
  flex-direction: row;
  border-bottom-style: solid;
  border-bottom-color: #e6e6e6;
  border-bottom-width: 2px;
  padding-bottom: 40px;
}

.googPic {
  width: 220px;
  height: 220px;
}

.goods_info {
  padding-left: 30px;
  flex: 1;
}

.goods_title {
  font-size: 28px;
  line-height: 36px;
}

.goods_spec {
  padding-top: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 30px;
}

.priceInfo {
  flex-direction: row;
  align-items: center;
}

.specInfo {
  height: 42px;
  justify-content: space-between;
  padding: 0 5px;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-color: #e6e6e6;
  flex-direction: row;
  /* background-color: #f2f22f; */
}

.specText {
  font-size: 22px;
  height: 40px;
  line-height: 40px;
  margin-left: 10px;
  margin-right: 25px;
  color: #999;
}

.iconDown {
  font-size: 22px;
  font-family: iconfont;
  line-height: 40px;
  color: #999;
}

.methodBox {
  width: 750px;
  height: 80px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0 32px;
  background-color: #fff;
}

.messagebox {
  width: 750px;
  padding: 0 30px 30px;
  background-color: #fff;
}

.locationBox {
  width: 690px;

  border-bottom-style: solid;
  border-bottom-color: #e6e6e6;
  border-bottom-width: 2px;
  padding: 30px 0;
}

.meth_title {
  color: #323232;
  font-size: 30px;
}

.locaTit {
  width: 230px;
}

.meth_right {
  flex: 1;
}

.shipping {
  margin-right: 30px;
  font-size: 30px;
  color: #999999;
}

.cityName {
  margin-right: 30px;
  font-size: 30px;
  color: #666666;
  flex: 1;
}

.shippingMoney {
  color: #ed404c;
  font-size: 30px;
}

.rightIcon {
  font-family: iconfont;
  font-size: 26px;
  color: #999;
}

.row {
  flex-direction: row;
}

.jbew {
  justify-content: space-between;
}

.jend {
  justify-content: flex-end;
}

.atop {
  align-items: flex-start;
}

.acen {
  align-items: center;
}

.footer {
  width: 750px;
  background-color: #ffffff;
  height: 100px;
  justify-content: flex-end;
  align-items: center;
  font-size: 28px;
  position: fixed;
  bottom: 0px;
}

.settlement {
  width: 750px;
  height: 100px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.sum {
  flex: 1;
  font-size: 28px;
  padding-left: 30px;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
}

.sumTitle {
  font-size: 30px;
  margin-right: 20px;
}

.symbol {
  color: #ed404c;
}

.money {
  font-weight: 600;
  color: #ed404c;
  font-size: 36px;
}

.btn {
  width: 230px;
  height: 100px;
  line-height: 100px;
  background-color: #303030;
  color: #fff;
  text-align: center;
  font-size: 30px;
}
</style>
