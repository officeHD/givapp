<template>
	<div class="layout">
		<head :back="false" bgcolor="#303030" :hasleft="false" @rightClick="rightClick">
			<text class="leftIcon iconfont" slot="right">&#xe600;</text>
			<div slot="center" class="inputbox" @click="searchClick">
				<text class="searchIcon iconfont">&#xe62a;</text>
				<text class="tips">noteBook</text>
			</div>
		</head>
		<div class="pageContent">
			<div class="header"></div>
			<scroller class="scroller">
				<refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
					<loading-indicator class="indicator"></loading-indicator>
				</refresh>
				<div class="cicle"></div>
				<div class="cicleContent">
					<div class="silderBox">
						<slider class="slider" interval="3000" auto-play="false">
							<div class="frame" v-for="(img,index) in imageList" :key="index">
								<image class="image" resize="cover" :src="img.src" />
							</div>
						</slider>
					</div>
					<div class="bgcf">
						<div class="tabSection">
							<div class="tabItem" v-for="(item,index) in tabSection" :key="index">
								<image class="tabImg" :src="item.img" />
								<text class="tips">{{item.title}}</text>
							</div>
						</div>
						<div class="subSection">
							<div class="leftSub">
								<div class="subTop">
									<text class="topTitle">Seckill</text>
									<div class="timeOut">
										<text class="timeNum">03</text>
										<text class="timesyb">:</text>
										<text class="timeNum">03</text>
										<text class="timesyb">:</text>
										<text class="timeNum">11</text>
									</div>
								</div>
								<image class="limitImg" src="root:img/limit.png"></image>
							</div>
							<div class="rightSub">
								<text class="rightTitle">Annie Oakley</text>
								<text class="rightContent">Detonate low-cost fire and fight for it </text>
								<text class="rightBtn">199subtract100</text>
							</div>
						</div>
						<image class="luckImg" src="root:img/luck.png"></image>
						<div class="secondHand">
							<div class="secondTitle" @click="gonext('root:app/main/center.js')">
								<text class="titleName">second-hand</text>
								<text class="iconfont secondIcon">&#xe6a1;</text>
							</div>
							<scroller scroll-direction="horizontal" class="secondContent">

								<div class="listItem" v-for="item in 10" :key="item" @click="gonext('root:app/goods/goods.js')">
									<image class="SecondImg" src="root:img/goods.png" />
									<view class="secondItem">
										<text class="goodsTitle">Baobao Women's New Style Of Small</text>
										<view class="secondPrice">
											<text class="symbol mr5">$</text>
											<text class="money">52.3</text>

										</view>

									</view>
								</div>
							</scroller>
						</div>
						<div class="recommend">
							<div class="retitle">
								<text class="fz30">recommend</text>
								<text class="iconfont reIcon">view more &#xe6a1;</text>
							</div>
							<div class="recontent">
								<div class="reitem" v-for="item in 10" :key="item">
									<image class="goodsImg" src="root:img/goods.png" @click="gonext('root:app/goods/goods.js')" />
									<view class="contentBox">
										<text class="goodsTitle">Bao Bao Women's New Style Of Small</text>
										<view class="priceInfo">
											<view class="leftInfo">
												<text class="symbol">$</text>
												<text class="money">52.3</text>
												<!-- <text class="reduce">80%</text> -->
												<!-- <text class="shopType">NEW</text> -->
											</view>
											<view class="leftInfo">
												<text class="iconfont shopIcon">&#xe64c;</text>
												<text class="iconfont shopIcon">&#xe634;</text>
												<text class="iconfont shopIcon">&#xe607;</text>
											</view>
										</view>
										<!-- <view class="user">
											<image class="avator" src="root:img/user.jpg" />
											<view class="userInfo">
												<text class="userName">LI YAN</text>
												<text class="c666">Heifei High-Tech Zone </text>
												<text class="c666">18 Minutes ago </text>
											</view>
										</view> -->
									</view>
								</div>
							</div>
						</div>
					</div>
				</div>
			</scroller>
		</div>

	</div>
</template>
<script>
	const navigator = weex.requireModule("navigator");

	export default {
		data() {
			return {
				refreshing: false,
				imageList: [{
						src: "https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjI5NDk2fQ"
					},
					{
						src: "https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg"
					},
					{
						src: "https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg"
					}
				],
				tabSection: [{
						img: "root:img/nav1.png",
						title: "phone"
					},
					{
						img: "root:img/nav2.png",
						title: "Electronics"
					},
					{
						img: "root:img/nav3.png",
						title: "books"
					},
					{
						img: "root:img/nav4.png",
						title: "appliances"
					},
					{
						img: "root:img/nav5.png",
						title: "clothes"
					},
					{
						img: "root:img/nav6.png",
						title: "cosmetics"
					},
					{
						img: "root:img/nav7.png",
						title: "furnture"
					},
					{
						img: "root:img/nav8.png",
						title: "baby"
					}
				]
			};
		},
		props: {},
		methods: {
			onrefresh(event) {
				var s = this;
				s.refreshing = true;
				setTimeout(() => {
					s.refreshing = false;
				}, 1000); 
			},
			onLoad(p) {},
			gonext(url) {
				//this.push('test.js',{name:"ssss"})
				this.log("jdksdjsk", "error");
				navigator.push(url);
			},

			searchClick() {
				this.toast("搜索跳转");
			},
			letfClick() {
				this.toast("左边按钮跳转");
			},
			rightClick() {
				// this.toast("右边边按钮跳转");

				navigator.push("root:app/msg/msg.js");
			}
		},
		created() {}
	};
</script>

<style scoped>
	.iconfont {
		font-family: iconfont;
	}

	.layout {
		background-color: #f2f2f2;
		flex: 1;
	}

	.pageContent {
		flex: 1;
		position: relative;
	}

	.scroller {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
	}

	.header {
		height: 400px;
		/* padding-top: 45px; */
		justify-content: flex-start;
		align-items: center;
		background-color: #303030;
	}

	.refresh {
		width: 750px;
		-ms-flex-align: center;
		-webkit-align-items: center;
		-webkit-box-align: center;
		align-items: center;
	}

	.indicator {
		margin-top: 30px;
		margin-bottom: 20px;
		height: 70px;
		width: 70px;
		color: #ce2020;
	}

	.inputbox {
		background-color: #fff;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		flex: 1;
		border-radius: 40px;
		height: 80px;
		padding: 0 40px;
		margin-left: 32px;
	}

	.searchIcon {
		color: #666;
		margin-right: 10px;
		font-size: 30px;
	}

	.cicle {
		background-color: #f2f2f2;
		border-top-left-radius: 600px;
		border-bottom-right-radius: 600px;
		width: 750px;
		height: 750px;
		transform: rotate(45deg);
		margin-top: 60px;
	}

	.cicleContent {
		margin-top: -750px;
	}

	.tips {
		color: #666;
	}

	.leftIcon {
		color: #ffffff;
		font-size: 40px;
	}

	.img {
		width: 200px;
		height: 200px;
		margin-top: -100px;
	}

	.text {
		color: black;
		margin-top: 30px;
		font-size: 70px;
		font-weight: bold;
		margin-bottom: 50px;
	}

	.image {
		width: 690px;
		height: 290px;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		border-bottom-left-radius: 20px;
		overflow: hidden;
	}

	.silderBox {
		width: 690px;
		height: 290px;
		margin-left: 30px;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		border-bottom-left-radius: 20px;
		overflow: hidden;
	}

	.slider {
		flex: 1;
	}

	.frame {
		width: 690px;
		height: 290px;

		position: relative;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		border-bottom-left-radius: 20px;
		overflow: hidden;
	}

	.bgcf {
		background-color: #f2f2f2;
	}

	.tabSection {
		width: 690px;
		height: 350px;
		background-color: #ffffff;
		border-radius: 10px;
		margin-left: 30px;
		margin-top: 40px;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;

		align-items: center;
		padding-top: 30px;
	}

	.tabItem {
		width: 172.5px;
		justify-content: center;
		align-items: center;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.tabImg {
		width: 90px;
		height: 90px;
	}

	.subSection {
		width: 690px;
		margin-left: 30px;
		margin-top: 20px;
		flex-direction: row;
		justify-content: space-between;
	}

	.leftSub {
		width: 330px;
		height: 230px;
		border-radius: 10px;
		background-color: #fff;
	}

	.subTop {
		flex-direction: row;
		padding: 20px 30px;
		justify-content: space-between;
		align-items: flex-end;
	}

	.topTitle {
		color: #bb8732;
		font-size: 38px;
	}

	.limitImg {
		width: 305px;
		margin-left: 8px;
		height: 140px;
	}

	.timeOut {
		flex-direction: row;
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

	.rightSub {
		width: 330px;
		height: 230px;
		border-radius: 10px;
		background-color: #fff;
		padding: 20px 25px;
		justify-content: space-between;
	}

	.rightTitle {
		font-size: 42px;
		color: #bb8732;
		text-align: center;
		width: 280px;
	}

	.rightContent {
		font-size: 28px;
		color: #666;
		width: 280px;
		lines: 2;
		text-overflow: ellipsis;
	}

	.rightBtn {
		background-color: #bb8732;
		height: 45px;
		width: 280px;
		line-height: 45px;
		border-radius: 30px;
		text-align: center;
		color: #fff;
		font-size: 34px;
	}

	.luckImg {
		width: 686px;
		height: 138px;
		margin-left: 32px;
		margin-top: 50px;
		margin-bottom: 50px;
	}

	.secondHand {
		width: 750px;
		background-color: #FFFFFF;
		height: 440px;
	}

	.secondTitle {
		height: 100px;
		flex-direction: row;
		justify-content: space-between;
		padding: 20px;
		align-items: center;
	}

	.secondItem {
		width: 220px;
	}

	.secondPrice {
		margin-top: 5px;
		flex-direction: row;
		align-items: flex-end;
	}

	.mr5 {
		margin-right: 5px;
	}

	.titleName {
		font-size: 34px;
		color: #C09345;
	}

	.secondIcon {
		font-size: 32px;
		color: #666666;
	}

	.secondContent {
		width: 750px;
		height: 340px;
		flex-direction: row;
	}

	.listItem {
		padding: 20px;
		width: 240px;
		height: 340px;
	}

	.SecondImg {
		width: 200px;
		height: 200px;
	}

	.recommend {
		width: 690px;
		margin-left: 30px;
		margin-top: 30px;
	}

	.retitle {
		width: 690px;
		padding: 20px 0;
		font-size: 30px;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
	}

	.fz30 {
		font-size: 34px;
	}

	.reIcon {
		color: #666666;
		font-size: 28px;
	}

	.recontent {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-bottom: 30px;
	}

	.reitem {
		height: 500px;
		margin-top: 10px;
		margin-bottom: 10px;
		background-color: #fff;
		border-radius: 10px;
		justify-content: space-between;
	}

	.goodsImg {
		width: 336px;
		height: 336px;
	}

	.contentBox {
		width: 336px;
		padding: 10px 20px;
	}

	.goodsTitle {
		font-size: 28px;
		color: #000;
		text-overflow: ellipsis;
		lines: 2;
		word-wrap: break-word;
	}

	.priceInfo {
		margin-top: 20px;
		flex-direction: row;
		justify-content: space-between;
	}

	.leftInfo {
		flex-direction: row;
		align-items: flex-end;
	}

	.symbol {
		color: red;
		margin-bottom: 5px;
		margin-right: 5px;
	}

	.money {
		color: red;
		font-size: 32px;
		font-weight: bold;
		margin-right: 5px;
	}

	.reduce {
		color: red;
		margin-right: 5px;
	}

	.shopType {
		color: red;
	}

	.shopIcon {
		font-size: 32px;
		margin-left: 10px;
	}

	.user {
		flex-direction: row;
		margin-top: 15px;
	}

	.avator {
		width: 40px;
		height: 40px;
		border-radius: 40px;
		margin-top: 15px;
	}

	.userInfo {
		flex: 1;
		padding-left: 15px;
	}

	.userName {
		font-size: 32px;
		color: #333;
	}

	.c666 {
		color: #666;
		margin-top: 5px;
	}
</style>
