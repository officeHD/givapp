<template>
	<div>
		<!-- <image class="pageImg" src="root:img/page/13.png"></image> -->
		<head title="Order details"></head>
		<div class="pageContent">
			<div class="orderDetail">
				<div class="order_top" v-for="item in goodLst">
					<div class="imgBox">
						<image class="googPic" :src="item.thumb" resize="contain"></image>
					</div>
					<div class="goods_info">
						<text class="goods_title">{{item.title}}</text>
						<div class="goods_spec">
							<div class="priceInfo">
								<text class="symbol">$</text> <text class="money">{{item.price}}</text>
							</div>
							<div class="specInfo" v-if="item.sss">
								<text class="specText">red</text>
								<text class="iconDown">&#xe613;</text>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="messagebox mt20" @click="setAddress">
				<div class="locationBox row jbew atop ">
					<text class="meth_title locaTit">Address</text>
					<div class="meth_right   row jend acen">
						<text class="cityName " v-if="addressData.id">{{addressData.province}} {{addressData.city}} {{addressData.area}}
							{{addressData.address}}</text>
						<text class="cityName " v-if="!addressData.id"> Set place</text>

						<text class="rightIcon">&#xe6a1;</text>
					</div>
				</div>
				<!-- <div class="locationBox row jbew atop ">
					<text class="meth_title locaTit">Address</text>
					<div class="meth_right   row jend atop">
						<text class="cityName">{{addressData.address}}</text>
						<text class="rightIcon">&#xe6a1;</text>
					</div>
				</div> -->
			</div>
			<div class="methodBox row jbew acen ">
				<text class="meth_title">Delivery Fee</text>
				<div class="meth_right row jend acen">
					<!-- <text class="shipping">{{selected.label}}</text> -->
					<text class="shippingMoney">${{goodInfo.postage}}</text>
				</div>
			</div>
			<div class="footer">
				<div class="settlement">
					<div class="sum"><text class="sumTitle">Order total:</text> <text class="symbol">$</text> <text class="money">{{sumPrice}}</text></div>
					<text class="btn" @click="toPay">confirm</text>
				</div>
			</div>
		</div>
		<div :class="[showMask?'maskAlert':'hidemask']" @click="changeAlert('hide')"></div>
		<!-- 邮费弹出框 -->
		<div class="shopAlert" ref="shopAlert" @click="e=>e.stopPropagation()">
			<text class="alertTop">Shipping method</text>
			<scroller class="alertScroll">
				<div class="selectLi" v-for="item in shippWay" :key="item.value" @click="selected=item">
					<text class="liIcon" :class="[selected.value==item.value?'selected':'']">{{selected.value==item.value?"&#xe602;":"&#xe67f;"}}</text>
					<text class="liTxt" :class="[selected.value==item.value?'selected':'']">{{item.label}}</text>
				</div>

			</scroller>
			<text class="sureBtn" @click="confirm">confirm</text>
		</div>

	</div>
</template>

<script>
	const navigator = weex.requireModule("navigator");
	const animation = weex.requireModule("animation");
	const selectAddress = new BroadcastChannel("selectAddress");
	import {
		get_goods_info,
		get_orderConfirm,
		get_address_list
	} from "../../mixin/ajax.js";

	import asCore from "../../mixin/core";
	export default {
		data() {
			return {
				//是否显示遮罩层
				showMask: false,
				selected: {
					value: "1",
					label: "Australia post"
				},
				goodLst: [],
				shippWay: [{
						value: "1",
						label: "Australia post"
					},
					{
						value: "2",
						label: "Giv delivery"
					},
					{
						value: "3",
						label: "Local pick up"
					}
				],
				goodInfo: {
					thumb_url: "root:img/user.jpg",
					subtitle: "",
					price: "1",
					old_price: "1",
					type: "", // 0 自营商品 1 平台二手商品 2 用户发布商品
					is_collection: ""
				},
				addressData: {

				},
				sumPrice: "52.30",
				goods_title: " "
			};
		},
		created() {
			selectAddress.onmessage = this.changeAddress;
		},
		methods: {
			onLoad(param) {
				this.log(param.data)
				let list = JSON.parse(param.data)
				this.goodLst = list;
				if (param && param.id) {
					this.goodId = param.id;

				}

				asCore.getBsessionid(userId => {
					this.log(userId)
					this.userId = userId;

					this.getList()


				});

			},

			toPay() {
				get_orderConfirm({
					users_id: this.userId,
					order_id: "",
					goods_id: this.goodId,
					number: 1,
					take_type: 1,
					address_id: this.addressData.id,
					is_coupon: 1
				}, (res, flag) => {
					this.log(res)
					if (flag) {
						if (res.code == 200) {
							this.push("root:app/pay/payment.js", {
								id: res.data.total.co_order_id
							});
						} else {
							this.toast(res.message)
						}
					}

				})
			},
			getList() {
				get_address_list({
					users_id: this.userId,
					page: 1,
					page_num: 10
				}, (res, flag) => {
					if (flag) {
						this.log(res.data.list)
						if (res.code == 200) {
							if (res.data.list.length > 0) {
								this.addressData = res.data.list[0];
							}
						}
					}
				})
			},
			confirm() {
				this.changeAlert("hide")
				// get_orderConfirm

			},
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
			changeAlert(type) {
				var testEl = this.$refs.shopAlert;
				let transform = "100%";
				this.showMask = false;

				if (type == "show") {
					transform = "-100%";
					this.showMask = true;
				}
				animation.transition(
					testEl, {
						styles: {
							transform: `translateY(${transform})`
						},
						duration: 400, //ms
						timingFunction: "ease",
						delay: 0 //ms
					},
					function() {}
				);
			},
			changeAddress(msg) {
				// this.log(msg.data)
				this.addressData = msg.data
			},

			setAddress() {
				this.push("root:app/user/address/address.js", {
					type: "shop"
				});
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

	.mt20 {
		margin-top: 20px;
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
		padding-bottom: 20px;
		padding-top: 10px;
	}

	.imgBox {
		width: 220px;
		height: 200px;
		justify-content: flex-start;
		align-items: center;
	}

	.googPic {
		width: 220px;
		height: 200px;
	}

	.goods_info {
		height: 220px;
		padding-left: 30px;
		padding-bottom: 10px;
		flex: 1;
		justify-content: space-between;
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
		padding-bottom: 0;

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
		padding: 0 30px;
		background-color: #fff;
	}

	.locationBox {
		width: 690px;

		/* 	border-bottom-style: solid;
		border-bottom-color: #e6e6e6;
		border-bottom-width: 2px; */
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

	.hidemask {
		height: 0;
	}

	.maskAlert {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 456px;
		top: 0;
		/* background-color: rgba(0, 0, 0, 0); */
	}

	.shopAlert {
		position: fixed;
		left: 0;
		bottom: -456px;
		width: 750px;
		height: 456px;
		background-color: #ffffff;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		align-items: center;
		padding: 32px;
	}

	.alertTop {
		width: 686px;
		text-align: left;
		padding-bottom: 32px;
		font-size: 28px;
		color: #333333;
	}

	.alertScroll {
		flex: 1;
	}

	.selectLi {
		/* margin-bottom: 30px; */
		height: 70px;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: 750px;
		;
		padding-left: 32px;
	}

	.liIcon {
		font-size: 40px;
		font-family: iconfont;
		color: #999999;
		margin-right: 10px;
	}

	.liTxt {
		color: #999999;
		font-size: 28px;
	}

	.selected {
		color: #BA8833;
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
