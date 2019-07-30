<template>

	<scroller>
		<div class="imgDemo">
			<!-- 商品主图轮播 -->
			<div class="swiper-box">
				<slider class="slider" interval="3000" auto-play="true">
					<div class="frame" v-for="swiper in swiperList" :key="swiper.id">
						<image class="itemImg" :src="swiper.img"></image>
					</div>
					<indicator></indicator>
				</slider>
			</div>
			<!-- 标题 价格 -->
			<div class="info-box goods_top">
				<div class="top_left">
					<text class="priceSymbol">￥</text>
					<text class="goods-info-price">{{goodsData.price}}</text>
					<text class="goods-discount">{{goodsData.discount}} NEW</text>
					<text class="goods_cul">Pinkage</text>
				</div>
				<div class="collections">
					<text class="iconfont collecIcon">&#xe7b9;</text>
					<!-- <text class="colectip">Adding collections</text> -->
				</div>
			</div>
			<text class="goods-info-title"> {{goodsData.name}} </text>
			<div class="delivery">
				<text class="de_title">GIV delivery</text>
				<text class="de_cont">Pinkage</text>
			</div>
			<div class="delivery mt20 h100">
				<text class="de_title">color</text>
				<text class="de_cont">red</text>
			</div>
			<!-- 用户信息 -->
			<div class="userInfo">
				<image class="userAvator" src="root:img/user.jpg"></image>
				<div class="userCenter">
					<text class="userName">LI LI</text>
					<div class="userAccount">
						<div class="row">
							<text class="row_title">recommend:</text>
							<text class="row_num">50</text>
						</div>
						<div class="row">
							<text class="row_title">commodity:</text>
							<text class="row_num">50</text>
						</div>
					</div>
				</div>
				<div class="userRight">
					<text class="stroll">stroll</text>
					<text class="iconfont strollIcon">&#xe6a1;</text>
				</div>
			</div>
			<div class="goods_info">
				<text class="info_title"> Details of illustrations and texts</text>
				<image class="good_detail" src="root:img/good_detail.png"></image>
			</div>

			<!-- 底部菜单 -->
			<div class="footer">
				<div class="foot_icons">
					<div class="iconsbox bright" @click="toChat">
						<text class="iconfont textIcon">&#xe605;</text>
						<text class="boxtext">service</text>
					</div>
					<div class="iconsbox boxright" @click="toCart">
						<text class="iconfont textIcon">&#xe64c;</text>
						<text class="boxtext">Cart</text>
					</div>
				</div>
				<div class="btnBox">
					<text class="joinCart" @tap="joinCart">Add to cart</text>
					<text class="buy" @click="buy">payment</text>
				</div>
			</div>

		</div>
	</scroller>
</template>

<script>
	const navigator = weex.requireModule("navigator");

	export default {
		data() {
			return {
				//是否显示返回按钮
				// #ifndef MP
				showBack: true,
				// #endif
				//轮播主图数据
				swiperList: [{
						id: 1,
						img: "https://ae01.alicdn.com/kf/HTB1Mj7iTmzqK1RjSZFjq6zlCFXaP.jpg"
					},
					{
						id: 2,
						img: "https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg"
					},
					{
						id: 3,
						img: "https://ae01.alicdn.com/kf/HTB1dPUMThnaK1RjSZFtq6zC2VXa0.jpg"
					},
					{
						id: 4,
						img: "https://ae01.alicdn.com/kf/HTB1OHZrTXzqK1RjSZFvq6AB7VXaw.jpg"
					}
				],
				//轮播图下标
				currentSwiper: 0,
				anchorlist: [], //导航条锚点
				selectAnchor: 0, //选中锚点
				serviceClass: "", //服务弹窗css类，控制开关动画
				specClass: "", //规格弹窗css类，控制开关动画
				shareClass: "", //分享弹窗css类，控制开关动画
				// 商品信息
				goodsData: {
					id: 1,
					name: "AJOY SAHU Baggage Girls 2019 New Style Small Popular Design Baggage Girls with Skewed Skin and Single Shoulder Baggage Girls",
					price: "52.3",
					discount: "80%",
					number: 1,
					service: [{
							name: "正品保证",
							description: "此商品官方保证为正品"
						},
						{
							name: "极速退款",
							description: "此商品享受退货极速退款服务"
						},
						{
							name: "7天退换",
							description: "此商品享受7天无理由退换服务"
						}
					],
					spec: ["XS", "S", "M", "L", "XL", "XXL"],
					comment: {
						number: 102,
						userface: "../../static/img/face.jpg",
						username: "大黑哥",
						content: "很不错，之前买了很多次了，很好看，能放很久，和图片色差不大，值得购买！"
					}
				},
				selectSpec: null, //选中规格
				isKeep: false, //收藏
				//商品描述html
				descriptionStr: '<div style="text-align:center;"><img width="100%" src="https://ae01.alicdn.com/kf/HTB1t0fUl_Zmx1VjSZFGq6yx2XXa5.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB1LzkjThTpK1RjSZFKq6y2wXXaT.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB18dkiTbvpK1RjSZPiq6zmwXXa8.jpg"/></div>'
			};
		},

		mounted() {},
		methods: {
			buy() {
				navigator.push("root:app/order/confirmation.js");
			},
			// 客服
			toChat() {
				navigator.push("root:app/msg/chat.js");
			},
			toCart() {
				navigator.push("root:app/main/cart.js");
			},

			hideShare() {
				this.shareClass = "hide";
				setTimeout(() => {
					this.shareClass = "none";
				}, 150);
			},
			//收藏
			keep() {
				this.isKeep = this.isKeep ? false : true;
			},
			// 加入购物车
			joinCart() {
				if (this.selectSpec == null) {
					return this.showSpec(() => {
						uni.showToast({
							title: "已加入购物车"
						});
					});
				}
				uni.showToast({
					title: "已加入购物车"
				});
			}
		}
	};
</script>

<style scoped>
	.iconfont {
		font-family: iconfont;
	}

	.row {
		flex-direction: row;
	}

	.imgDemo {
		background-color: #f2f2f2;
	}

	.swiper-box {
		position: relative;
		width: 750px;
		height: 800px;
		background-color: #f5f5f5;
	}

	.slider {
		width: 750px;
		height: 800px;
	}

	.frame {
		width: 100%;
		height: 800px;
	}

	.itemImg {
		width: 750px;
		height: 800px;
	}

	.goods_info {
		margin-top: 20px;
		background-color: #fff;
	}

	.info_title {
		font-size: 32px;
		padding: 10px 30px;
		color: #323232;
	}

	.good_detail {
		width: 750px;
		height: 1488px;
	}

	.info-box {
		width: 710px;
		padding: 20px;
		background-color: #fff;
		/* margin-bottom: 20px; */
	}

	.goods_top {
		flex-direction: row;
		justify-content: space-between;
		padding: 22px 32px;
		margin-top: 20px;
	}

	.top_left {
		flex-direction: row;
		align-items: center;
	}

	.collections {
		justify-content: center;
		align-items: center;
		color: #999;
	}

	.collecIcon {
		font-size: 32px;
		color: #999;
	}

	.colectip {
		font-size: 20px;
		color: #666;
	}

	.goods_cul {
		margin-left: 50px;
		border-width: 2px;
		border-style: solid;
		border-color: #bb8732;
		padding: 10px 20px;
		border-radius: 50px;
		color: #bb8732;
		height: 47px;
	}

	.priceSymbol {
		font-size: 22px;
		color: #ea464f;
	}

	.goods-info-price {
		font-size: 38px;
		font-weight: 600;
		color: #ea464f;
		margin-right: 9px;
	}

	.goods-discount {
		color: #ea464f;
		font-size: 24px;
	}

	.goods-info-title {
		font-size: 32px;
		padding: 10px 32px 20px;
		color: #000;
		background-color: #fff;
	}

	.delivery {
		border-top-width: 1px;
		border-top-style: solid;
		border-top-color: #ede8e6;
		flex-direction: row;
		padding: 20px 0;
		background-color: #fff;
	}

	.h100 {
		height: 100px;
		align-items: center;
	}

	.mt20 {
		margin-top: 20px;
	}

	.de_title {
		color: #9a9999;
		width: 200px;
		padding-left: 32px;
		font-size: 28px;
	}

	.de_cont {
		font-size: 32px;
		color: #1e1e1e;
		font-size: 28px;
		padding-left: 20px;
	}

	.userInfo {
		width: 750px;
		flex-direction: row;
		padding: 20px 10px 20px 30px;
		background-color: #fff;
		margin-top: 20px;
		align-items: center;
	}

	.userAvator {
		width: 94px;
		height: 94px;
		border-radius: 47px;
	}

	.userCenter {
		flex: 1;
		padding-right: 30px;
		padding-left: 20px;
	}

	.userRight {
		padding: 10px;
		flex-direction: row;
	}

	.stroll {
		font-size: 24px;
		color: #676665;
		margin-right: 15px;
	}

	.strollIcon {
		font-size: 24px;
		color: #676665;
	}

	.userAccount {
		flex-direction: row;
		justify-content: space-between;
	}

	.userName {
		font-size: 34px;
		margin-bottom: 15px;
	}

	.row_title {
		color: #9a9999;
		font-size: 26px;
		margin-right: 15px;
	}

	.row_num {
		color: #323232;
		font-size: 26px;
	}

	.footer {
		position: fixed;
		bottom: 0px;
		width: 750px;
		padding: 0 20px;
		height: 100px;
		border-top-color: #edeaea;
		border-top-width: 1px;
		border-top-style: solid;
		background-color: #fff;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
	}

	.foot_icons {
		flex: 1;
		flex-direction: row;
		align-items: center;
	}

	.iconsbox {
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.bright {
		border-right-color: #dad7d8;
		border-right-style: solid;
		border-right-width: 1px;
	}

	.boxright {
		flex: 1;
	}

	.boxtext,
	.textIcon {
		width: 110px;
		text-align: center;
	}

	.textIcon {
		margin-bottom: 5px;
		font-size: 32px;
	}

	.text {
		justify-content: center;
		width: 100%;
		font-size: 22upx;
		color: #666;
	}

	.btnBox {
		flex-direction: row;
		align-items: center;
	}

	.joinCart,
	.buy {
		height: 70px;
		line-height: 68px;
		padding: 0 30px;
		color: #fff;
		font-size: 30px;
		border-radius: 5px;
		border-width: 1px;
		border-style: solid;
		min-width: 200px;
		text-align: center;
	}

	.joinCart {
		background-color: #fff;
		color: #bb8732;
		border-color: #bb8732;
		margin-right: 15px;
	}

	.buy {
		background-color: #303030;
		border-color: #303030;
		color: #fff;
	}
</style>
