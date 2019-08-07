<template>
	<div>
		<!-- <image class="pageImg" src="root:img/page/13.png"></image> -->
		<head title="Refund"></head>
		<div class="pageContent">
			<div class="orderDetail">
				<div class="order_top">
					<image class="googPic" src="root:img/goods.png"></image>
					<div class="goods_info">
						<text class="goods_title">{{goods_title}}</text>
						<text class="specText">red</text>
						<!-- <div class="goods_spec">
							<div class="priceInfo">
								<text class="symbol">￥</text> <text class="money">{{sumPrice}}</text>
							</div>
							<div class="specInfo">
								<text class="specText">red</text>
								<text class="iconDown">&#xe613;</text>
							</div>
						</div> -->
					</div>
				</div>
			</div>

			<div class="messagebox">
				<div class="locationBox row jbew atop bb"  @click="changeAlert('show')">
					<text class="meth_title locaTit">Service type</text>
					<div class="meth_right   row jend atop">
						<text class="cityName">Please choose</text>
						<text class="rightIcon">&#xe6a1;</text>
					</div>
				</div>
				<div class="locationBox row jbew atop bb"  @click="changeAlert('show')">
					<text class="meth_title locaTit">Delivery status</text>
					<div class="meth_right   row jend atop">
						<text class="cityName">Please choose</text>
						<text class="rightIcon">&#xe6a1;</text>
					</div>
				</div>
				<div class="locationBox row jbew atop "  @click="changeAlert('show')">
					<text class="meth_title locaTit">Reasons for refund</text>
					<div class="meth_right   row jend atop">
						<text class="cityName">Please choose</text>
						<text class="rightIcon">&#xe6a1;</text>
					</div>
				</div>
			</div>
			<div class="selBox">
				<textarea class="textarea" placeholder="Please upload item receipt"> </textarea>
				<div class="imgBox">
					<image class="clickPhoto" :src="src" v-if="src"></image>
					<image @click="pickPhoto" class="clickPhoto" src="root:img/photo.png"></image>
				</div>
			</div>
			
			<div class="footer">
				<div class="settlement">
					<text class="btn" @click="changeAlert('s')">Submit</text>
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
		const photo = weex.requireModule("photo");
	const net = weex.requireModule("net");
	export default {
		data() {
			return {
				//是否显示遮罩层
				showMask: false,
				selected: {
					value: "1",
					label: "Australia post"
				},
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
				addressData: {
					"id": 11,
					"name": "LiLi",
					"phone": "15145112434",
					"province": "HuNan Province ",
					"city": "ChangSha City",
					"area": "Shushan District",
					"address": " Huangshan Road, Science Avenue",
					"is_default": 1,
					"create_time": "2019-04-18 15:09:22"
				},
				sumPrice: "52.30",
				goods_title: "AJOY SAHU Baggage Girls 2019 New Style Small Popular Design Baggage Girls with Skewed Skin and Single Shoulder Baggage Girls"
			};
		},
		created() {
			selectAddress.onmessage = this.changeAddress;
		},
		methods: {

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
			confirm() {
				this.changeAlert("hide")
			},
			setAddress() {
				navigator.push("root:app/user/address/address.js");
			},
			toPay() {
				navigator.push("root:app/pay/payment.js");
			},
			pickPhoto() {
				var self = this;
				photo.open(500, 800, "#000000", "#ffffff", "#ffffff", function(e) {
					self.src = e.path;
					var param = {};
					var header = {};
					var path = {};
					path.file = e.path;
					net.postFile(
						"http://xxx/upload",
						param,
						header,
						path,
						() => {
							//start
						},
						e => {
							//succcess
							var modal = weex.requireModule("modal");
							modal.toast({
								message: "上传成功！"
							});
						},
						() => {
							//compelete
						},
						() => {
							//exception
							var modal = weex.requireModule("modal");
							modal.toast({
								message: "上传异常！"
							});
						}
					);
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

	.orderDetail {
		padding: 30px;
		background-color: #fff;
	}

	.order_top {
		flex: 1;
		flex-direction: row;
		align-items: flex-start;
		/* border-bottom-style: solid;
		border-bottom-color: #e6e6e6;
		border-bottom-width: 2px; */
		/* padding-bottom: 20px; */
	}

	.googPic {
		width: 120px;
		height: 120px;
	}

	.goods_info {
		padding-left: 30px;
		flex: 1;
		justify-content: flex-start;
	}

	.goods_title {
		font-size: 22px;
		line-height: 30px;
		color: #666666;
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
		font-size: 20px;
		/* height: 40px;
		line-height: 40px; */
		/* margin-left: 10px; */
		margin-right: 25px;
		color: #666;
		margin-top: 10px;
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
		margin-top: 20px;
		padding: 0 30px 30px;
		background-color: #fff;
	}

	.locationBox {
		width: 690px;

		padding: 30px 0;
	}
	.bb{
		
		border-bottom-style: solid;
		border-bottom-color: #EDEDED;
		border-bottom-width: 1px;
	}

	.meth_title {
		color: #323232;
		font-size: 30px;
	}

	.locaTit {
		width: 300px;
	}

	.meth_right {
		flex: 1;
		justify-content: flex-end;
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
		text-align: right;
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
		justify-content: center;
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
		width: 686px;
		height: 80px;
		line-height: 80px;
		background-color: #303030;
		color: #fff;
		text-align: center;
		font-size: 30px;
		border-radius:4px;
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
	
	.textarea {
		height: 160px;
		padding: 20px 0;
	}
	
	.imgBox {
		margin-bottom: 30px;
		flex-direction: row;
	}
	.selBox {
		width: 750px;
		padding: 15px 32px;
		margin-top: 20px;
		background-color: #ffffff;
	}
	.clickPhoto {
		width: 63px;
		height: 50px;
		margin-right: 10px;
	}
	
</style>
