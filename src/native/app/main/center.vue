<template>
	<div class="layout">
		<head bgcolor="#303030" @letfClick="letfClick" @rightClick="rightClick">
			<text class="leftIcon iconfont" slot="right">&#xe600;</text>
			<div slot="center" class="inputbox" @click="searchClick">
				<text class="searchIcon iconfont">&#xe62a;</text>
				<text class="tips">noteBook</text>
			</div>
		</head>
		<scroller class="scroller">
			<slider class="slider" interval="3000" auto-play="false">
				<div class="frame" v-for="(img,index) in imageList" :key="index">
					<image class="image" resize="cover" :src="img.src" />
				</div>
			</slider>
			<div class="header">

			</div>
			<div class="tabSection">
				<div class="tabItem" v-for="(item,index) in tabSection" :key="index">
					<image class="tabImg" :src="item.img" />
					<text class="tips">{{item.title}}</text>
				</div>
			</div>
			<div class="subSection">
				<div class="leftSub"></div>
				<div class="rightSub"></div>
			</div>
			<div class="recommend">
				<div class="retitle">
					<text class="fz30">recommend</text>
				</div>
				<div class="recontent">
					<div class="reitem" v-for="item in 10" :key="item" @click="gonext('root:app/goods/goods.js')">
						<image class="goodsImg" src="root:img/goods.png" />
						<view class="contentBox">
							<text class="goodsTitle">Bao Bao Women's New Style Of Small</text>
							<view class="priceInfo">
								<view class="leftInfo">
									<text class="symbol">￥</text>
									<text class="money">52.3</text>
									<text class="reduce">80%</text>
									<text class="shopType">NEW</text>
								</view>
								<view class="leftInfo">
									<text class="iconfont shopIcon">&#xe64c;</text>
									<text class="iconfont shopIcon">&#xe772;</text>
								</view>
							</view>
							<view class="user">
								<image class="avator" src="root:img/user.jpg" />
								<view class="userInfo">
									<text class="userName">LI YAN</text>
									<text class="c666">Heifei High-Tech Zone </text>
									<text class="c666">18 Minutes ago </text>
								</view>
							</view>
						</view>
					</div>
				</div>
			</div>
		</scroller>
	</div>
</template>
<script>
	const navigator = weex.requireModule("navigator");

	export default {
		data() {
			return {
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
				this.toast("右边边按钮跳转");
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
		background-color: #ffffff;
		flex: 1;
	}

	.scroller {
		flex: 1;

		background-color: #f2f2f2;
	}

	.header {
		height: 310px;
		padding-top: 45px;
		justify-content: flex-start;
		align-items: center;
		margin-top: -310px;
	}

	.inputbox {
		background-color: #fff;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 520px;
		border-radius: 60px;
		height: 60px;
		margin-left: 20px;
		padding: 0 35px;
	}

	.searchIcon {
		color: #666;
		margin-right: 10px;
		font-size: 30px;
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
		width: 750px;
		height: 310px;
	}

	.slider {
		margin-top: 0;
		margin-left: 0;
		width: 750px;
		height: 310px;
	}

	.frame {
		width: 750px;
		height: 310px;

		position: relative;
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
		height: 244px;
		width: 690px;
		margin-left: 30px;
		margin-top: 40px;
		background-color: #ffffff;
		border-radius: 10px;
	}

	.recommend {
		width: 690px;
		margin-left: 30px;
		margin-top: 40px;
	}

	.retitle {
		padding: 10px;
		font-size: 30px;
	}

	.fz30 {
		font-size: 30px;
	}

	.recontent {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-bottom: 30px;
	}

	.reitem {
		height: 600px;
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
