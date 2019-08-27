<template>
	<div>
		<head title=""></head>
		<scroller class="scroller">
			<div class="imgDemo">
				<!-- 用户信息 -->
				<div class="userInfo" @click="gonext('root:app/goods/userCenter.js',{id:goodInfo.users_id})">
					<image class="userAvator" :src="goodInfo.headimgurl"></image>
					<div class="userCenter">
						<div class="row acenter">
							<text class="userName">{{goodInfo.nickname}}</text>
							<text class="credit">Excellent credit</text>
						</div>
						<div class="row">
							<text class="row_title">ust released in Hefei</text>
							<!-- <text class="row_num">50</text> -->
						</div>
					</div> 
				</div>
				<!-- 标题 价格 -->
				<div class="info-box goods_top">
					<div class="top_left">
						<text class="priceSymbol">$</text>
						<text class="goods-info-price">{{goodInfo.price}}</text>

					</div>
					<!-- <div class="collections" @click="keep">
						<text class="iconfont isKeep" v-if="isKeep">&#xe653;</text>
						<text class="iconfont collecIcon" v-else>&#xe7b9;</text>
				
					</div> -->
				</div>
				<text class="goods-info-title"> {{goodInfo.title}} </text>
				<!-- 商品主图轮播 -->
				<div class="goods-detail">
					<image v-for="(item,index) in goodInfo.thumb_url.split(',')" :key="index" class="itemImg" :src="item"></image>
				</div>
			</div>
			<div class="moreRelate">
				<text class="RelatedT">Related</text>
				<div class="recontent">
					<div class="reitem" v-for="item in shopList" :key="item">
						<image class="goodsImga" :src="item.thumb" @click="gonext('root:app/goods/goods2.js',{id:item.id})" />
						<view class="contentBox">
							<text class="goodsTitle2">{{item.title}}</text>
							<view class="priceInfo">
								<view class="leftInfo">
									<text class="symbol">$</text>
									<text class="money">{{item.price}}</text>
									<!-- <text class="reduce">80%</text> -->
									<!-- <text class="shopType">NEW</text> -->
								</view>
								<view class="leftInfo">
									<text class="iconfont shopIcon">&#xe64c;</text>
									<text class="iconfont shopIcon">&#xe634;</text>
									<text class="iconfont shopIcon">&#xe607;</text>
								</view>
							</view>
						</view>
					</div>
					<div class="reitemS"></div>
				</div>
			</div>
		</scroller>
		<!-- 底部菜单 -->
		<div class="footer">
			<div class="foot_icons">
				<div class="iconsbox boxright" @click="toCollection">
					<text class="iconfont textIcon" v-if="">{{goodInfo.is_collection==0?"&#xe634;":"&#xe60f;"}}</text>
					<text class="boxtext">Collection</text>
				</div>
				<div class="iconsbox boxright" @click="toChat">
					<text class="iconfont textIcon">&#xe600;</text>
					<text class="boxtext">Message</text>
				</div>
			</div>

			<div class="btnBox">
				<!-- <text class="joinCart" @click="addToCart">Add to cart</text> -->
				<text class="buy" @click="gonext('root:app/order/confirmation.js',{id:goodId})">Buy It Now</text>

			</div>
		</div>

	</div>

</template>

<script>
	const navigator = weex.requireModule("navigator");
	const animation = weex.requireModule("animation");
	import {
		get_goods_info,
		add_goods_collection,
		del_goods_collection,
		get_goods_list,
		get_goods_option
	} from "../../mixin/ajax.js";
	import asCore from "../../mixin/core";
	export default {
		data() {
			return {
				goodId: "",
				userId: "",
				//是否显示遮罩层
				showMask: false,
				number: 1,

				//轮播图下标
				currentSwiper: 0,
				shopList: [], //导航条锚点
				selectAnchor: 0, //选中锚点
				serviceClass: "", //服务弹窗css类，控制开关动画
				specClass: "", //规格弹窗css类，控制开关动画
				shareClass: "", //分享弹窗css类，控制开关动画
				// 商品信息
				goodInfo: {
					thumb_url: "root:img/user.jpg",
					subtitle: "",
					price: "1",
					old_price: "1",
					type: "", // 0 自营商品 1 平台二手商品 2 用户发布商品
					is_collection: "",
					users_id:""
				},
				selectSpec: null, //选中规格
				isKeep: false, //收藏
				//商品描述html
				descriptionStr: ''
			};
		},
		beforeCreate() {
			let navbar = weex.requireModule("navbar");
			navbar.setStatusBarStyle("white");
		},
		mounted() {},
		methods: {
			onLoad(param) {

				if (param && param.id) {
					this.goodId = param.id;
				}
				asCore.getBsessionid(userId => {
					this.log(userId)
					this.userId = userId;
					this.getGoodInfo()

					get_goods_list({
						users_id: this.userId,
						keywords: "",
						categoryid: "",
						type: "2",
						status: "1",
						page: 1,
					}, (res, flag) => {
						if (flag) {

							if (res.code == "200") {
								this.shopList = res.data.list;
							} else {
								this.toast(res.message)
							}
						}
					})

				});

			},
			gonext(url, parmar) {
				this.push(url, parmar)

			},
			// 推荐商品

			getGoodInfo() {
				get_goods_info({
					users_id: this.userId,
					id: this.goodId
				}, (res, flag) => {
					if (flag) {
						this.log(res)
						if (res.code == "200") {
							this.goodInfo = res.data;
						}
					}
				})
			},
			confirm() {
				navigator.push("root:app/order/confirmation.js");
			},
			// 客服
			toChat() {
				navigator.push("root:app/msg/chat.js");
			},
			add() {
				if (this.number < 2) {
					this.number++;
				}
			},
			sub() {
				if (this.number > 1) {
					this.number--;
				}
			},
			sum(e) {
				if (e.value > 0 && e.value < 2) {
					this.number = e.value;
				}
			},
			toCart() {
				// navigator.push("root:app/main/cart.js");
			},

			 
			hideShare() {
				this.shareClass = "hide";
				setTimeout(() => {
					this.shareClass = "none";
				}, 150);
			},
			//收藏
			toCollection() {
				// this.isKeep = this.isKeep ? false : true;
 
				if (this.goodInfo.is_collection == 0) {
					add_goods_collection({
						users_id: this.userId,
						goods_id: this.goodId,
					}, (res, flag) => {
						 
						if (flag) {
							this.toast(res.message);
							if (res.code == 200) {
								// this.goodInfo.is_collection == 1;
								this.$set(this.goodInfo,"is_collection",1)
							}
						}
					})
				} else {
					del_goods_collection({
						users_id: this.userId,
						goods_id: this.goodId,
					}, (res, flag) => {
						if (flag) {
							this.toast(res.message);
							if (res.code == 200) {
								this.$set(this.goodInfo,"is_collection",0)
							}
						}
					})
				}



			},

			// 加入购物车
			addToCart() {
				this.toast("加入购物车");
			}
		}
	};
</script>

<style scoped>
	.iconfont {
		font-family: iconfont;
	}

	.scroller {
		flex: 1;
	}

	.row {
		flex-direction: row;
	}

	.recontent {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-bottom: 30px;
		width: 686px;
		margin-left: 32px;
	}

	.reitem {
		height: 516px;
		margin-top: 10px;
		margin-bottom: 10px;
		background-color: #fff;
		border-radius: 10px;
		/* justify-content: space-between; */
	}

	.reitemS {
		width: 336px;
	}

	.goodsImga {
		width: 336px;
		height: 336px;
	}

	.contentBox {
		width: 336px;
		padding: 0 20px;
	}

	.goodsTitle {
		font-size: 20px;
		height: 56px;
		line-height: 28px;
		margin-top: 12px;
		color: #1E1E1E;
		text-overflow: ellipsis;
		lines: 2;
		word-wrap: break-word;
	}

	.goodsTitle2 {
		font-size: 26px;
		height: 74px;
		line-height: 37px;
		margin-top: 16px;
		color: #1E1E1E;
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

	.acenter {
		align-items: center;
	}

	.imgDemo {
		background-color: #FFF;
	}

	.moreRelate {
		background-color: #F2F2F2;
	}

	.RelatedT {
		color: #BA8833;
		font-size: 32px;
		font-weight: 600;
		text-align: center;
		margin: 32px 0;
	}

	.goods-detail {
		/* background-color: #f5f5f5; */
		padding: 20px 0;
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
		width: 686px;
		height: 800px;
		margin-left: 32px;
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
		margin-bottom: 100px;
	}

	.info-box {
		width: 750px;
		/* padding: 20px; */
		background-color: #fff;
		/* margin-bottom: 20px; */
	}

	.goods_top {
		flex-direction: row;
		justify-content: space-between;
		padding: 22px 32px;
		/* margin-top: 20px; */
	}

	.top_left {
		flex-direction: row;
		align-items: center;
	}

	.collections {
		justify-content: center;
		align-items: center;
		color: #999;
		width: 60px;
		height: 60px;
	}

	.collecIcon {
		font-size: 32px;
		color: #999;
	}

	.isKeep {
		font-size: 32px;
		color: #ea464f;
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

	.goods-old_price {
		color: #ea464f;
		font-size: 24px;
		text-decoration: line-through;
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
		width: 686px;
		flex-direction: row;
		padding: 20px 0;
		background-color: #fff;
		margin: 30px 32px;
		align-items: center;
		border-width: 1px;
		border-style: solid;
		border-color: #E8E8E8;
		border-left-width: 0;
		border-right-width: 0;
	}

	.userAvator {
		width: 94px;
		height: 94px;
		border-radius: 47px;
		background-color: #F2F2F2;
	}

	.userCenter {
		flex: 1;
		padding-right: 30px;
		padding-left: 20px;
		height: 80px;
		justify-content: space-between;
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
	}

	.credit {
		color: #41EFF2;
		margin-left: 20px;
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
		flex-direction: row;
	}

	.bright {
		border-right-color: #dad7d8;
		border-right-style: solid;
		border-right-width: 1px;
	}

	.boxright {
		flex: 1;
	}


	.textIcon {
		font-size: 32px;
		margin-right: 10px;
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

	.hidemask {
		height: 0;
	}

	.maskAlert {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 780px;
		top: 0;
		/* background-color: rgba(0, 0, 0, 0); */
	}

	.shopAlert {
		position: fixed;
		left: 0;
		bottom: -780px;
		width: 750px;
		height: 780px;
		background-color: #ffffff;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		align-items: center;
		padding: 32px;
	}

	.alertTop {
		width: 750px;
		padding: 0 32px;
		flex-direction: row;
		flex-wrap: nowrap;
	}

	.goodsImg {
		width: 228px;
		height: 228px;
	}

	.goodsTit {
		flex: 1;
		height: 228px;
		position: relative;
		padding-left: 20px;
	}

	.alertClose {
		width: 44px;
		height: 44px;
		text-align: center;
		line-height: 44px;
		position: absolute;
		right: 0;
		font-size: 30px;
		color: #666666;
	}

	.rowPrice {
		flex-direction: row;
		align-items: center;
		margin-top: 15px;
	}

	.price {
		color: #ec414d;
		font-size: 36px;
	}

	.symbol {
		font-size: 22px;
		color: #ec414d;
		margin-right: 5px;
	}

	.intro {
		lines: 4;
		width: 426px;
		margin-top: 14px;
		color: #666666;
		font-size: 26px;
		line-height: 40px;
		text-overflow: ellipsis;
	}

	.alertScroll {
		flex: 1;
	}

	.styleBox {
		width: 686px;
		align-items: flex-start;
		padding-top: 20px;
		padding-bottom: 32px;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: #e8e8e8;
	}

	.styleTitle {
		color: #1e1e1e;
		font-size: 30px;
	}

	.itemBox {
		flex-direction: row;
		margin-top: 16px;
	}

	.styleItem {
		border-width: 2px;
		border-style: solid;
		border-color: #1e1e1e;
		color: #1e1e1e;
		border-radius: 5px;
		height: 56px;
		line-height: 56px;
		padding: 0 30px;
	}

	.styleActive {
		color: #ba8833;
		border-color: #ba8833;
	}

	.price-number {
		width: 686px;
		height: 100px;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: #e8e8e8;
	}

	.num-title {
		font-size: 30px;
		color: #1e1e1e;
	}

	.gnumber {
		flex-direction: row;
		align-items: center;
		height: 62px;
	}

	.numaction {
		width: 44px;
		height: 44px;
		/* background-color: #e7e7e7; */
		justify-content: center;
		align-items: center;
		border-width: 1px;
		border-style: dashed;
		border-color: #888888;
	}

	.numinputbox {
		width: 100px;
		background-color: #fdfeff;
	}

	.numinput {
		width: 100px;
		text-align: center;
		font-size: 44px;
		height: 62px;
		line-height: 62px;
		color: #ec414d;
	}

	.numIcon {
		color: #1e1e1e;
		font-weight: 600;
	}

	.sureBtn {
		width: 686px;
		height: 80px;
		line-height: 80px;
		border-radius: 10px;
		margin-bottom: 14px;
		background-color: #303030;
		color: #fff;
		text-align: center;
		font-size: 30px;
	}
</style>
