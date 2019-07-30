<template>
	<div class="wrapper">
		<head :back="true" bgcolor="#303030" title="preferential" ></head>
		 
	 
		<div class="curActC">
			<scroller class="shopType"  scroll-direction="horizontal">
				<text class="typeItem " 
				:class="[activeType==item?'typeActive':'']"
				v-for="(item,index) in shopType" :key="index" @click="activeType=item">{{item}}</text>
				  
			</scroller>
			<text class="iconfont search">&#xe62a;</text>
		</div>
		<scroller class="shopScro">
			<div class="shopItem" v-for="(item,index) in [1,1,1,1,1,1]" :key="index">
				 <image class="shopImg" src="root:img/goods.png"></image>
				 <div class="shopCon">
				 	<div class="shopTop">
					 	<text class="shopTit">Tata/2019 summer counter same asd dadsadf</text>
				 		<text class="titBorder">2 pieces of eight fold</text>
					 </div>
				 	
				 	<div class="shopBot">
					 	<div class="priceInfo">
						 	<div class="priceBx">
							 <text class="symbol">$</text>
							 <text class="cuPrice">52.30</text>
							 
							 </div>
						 	
				 			<text class="oldPrice">$ 333.00</text>
						 </div>
					 
				 		<text class="payBtn">payment</text> 
					 </div>
				 </div>
			</div>
		 	<div class="mt20"></div>
		</scroller>
	</div>
</template>

<script>
const navigator = weex.requireModule("navigator");
export default {
  data() {
    return {
      passwd: "",
      activeTime: "1",
      shopType: ["recommend", "shoes", "clothes", "books", "cosmetics"],
      activeType: "recommend",
      timeArr: [
        { time: "10:20", title: "soon", value: "1" },
        { time: "11:00", title: "soon", value: "2" },
        { time: "12:20", title: "soon", value: "3" },
        { time: "13:20", title: "soon", value: "4" },
        { time: "14:20", title: "soon", value: "5" },
        { time: "15:20", title: "soon", value: "6" },
        { time: "16:20", title: "soon", value: "7" }
      ],
      loginType: "email"
    };
  },
  beforeCreate() {
    let navbar = weex.requireModule("navbar");
    navbar.setStatusBarStyle("white");
  },
  methods: {
    next() {
      navigator.push("root:app/login/vertifyCode.js");
    }
  }
};
</script>

<style scoped>
 
.iconfont {
  font-family: iconfont;
}
.wrapper {
  background-color: #f5f5f5;
}
 
.curActC {
  flex-direction: row;
  justify-content: space-between;
  width: 750px;
  align-items: center;
  height: 88px;
  padding-left: 32px;
  background-color: #fff;
}
.mt20 {
  margin-top: 20px;
}
.curTit {
  color: #333;
  font-size: 22px;
}
.curCon {
  flex-direction: row;
  align-items: center;
}
.endTime {
  margin-right: 20px;
}
.timeNum {
  width: 30px;
  height: 30px;
  background-color: #bb8732;
  color: #fff;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  font-size: 20px;
}

.timesyb {
  color: #bb8732;
  margin: 0 2px;
}

.shopType {
  flex: 1;
}
.search {
  width: 88px;
  text-align: center;
  line-height: 88px;
  font-size: 40px;
  color: #333;
}
.shopType {
  flex-direction: row;
  align-items: center;
}
.typeItem {
  height: 88px;
  line-height: 88px;
  font-size: 30px;
  margin: 0 20px;
  color: #505050;
}
.typeActive {
  border-bottom-color: #ba8833;
  border-bottom-style: solid;
  border-bottom-width: 4px;
}
.shopScro {
  width: 750px;
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
}
.shopItem {
  width: 686px;
  height: 268px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 16px;
  margin-top: 20px;
  padding: 24px;
  flex-direction: row;
}
.shopCon {
  flex: 1;
  height: 220px;
  align-items: flex-start;
  justify-content: space-between;
}
.shopTop {
  align-items: flex-start;
}
.shopImg {
  width: 220px;
  height: 220px;
}
.shopTit {
  lines: 1;
  text-overflow: ellipsis;
  font-size: 22px;
  color: #1e1e1e;
}
.titBorder {
  height: 46px;
  border-radius: 23px;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(196, 133, 21, 1);
  line-height: 46px;
  padding: 0 23px;
  font-size: 22px;
  color: #1e1e1e;
  margin-top: 15px;
}
.shopBot {
  width: 418px;
  height: 80px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
}
.priceInfo {
  align-items: flex-start;
}
.priceBx {
  flex-direction: row;
  align-items: center;
  height: 45px;
}
.symbol {
  font-size: 20px;
  color: #e52424;
  margin-right: 5px;
}
.cuPrice {
  color: #e52424;
  font-size: 32px;
}
.oldPrice {
  font-size: 22px;
  color: #999999;
  margin-top: 5px;
  text-decoration: line-through;
}
.payBtn {
  height: 44px;
  line-height: 44px;
  background-color: #ec414d;
  color: #fff;
  border-radius: 22px;
  text-align: center;
  padding: 0 20px;
}
</style>
