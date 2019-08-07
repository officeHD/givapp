<template>
	<div class="wrapper">
		<head title="appointment time"> </head>
		<div class="locationBox     " @click="changeAlert('show')">
			<text class="meth_title">Visit time</text>
			<div class="meth_right ">
				<text class="cityName">9 a.m-11 a.m. on September 1</text>
				<text class="rightIcon">&#xe6a1;</text>
			</div>
		</div>
		<div class="locationBox" @click="changeAlert('show')">
			<text class="meth_title">delivery time</text>
			<div class="meth_right ">
				<text class="cityName">{{selected.label}}</text>
				<text class="rightIcon">&#xe6a1;</text>
			</div>
		</div>
		<div :class="[showMask?'maskAlert':'hidemask']" @click="changeAlert('hide')"></div>
		<!-- 邮费弹出框 -->
		<div class="shopAlert" ref="shopAlert" @click="e=>e.stopPropagation()">
			<text class="alertTop">Booking time</text>
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
	export default {
		data() {
			return {
				//是否显示遮罩层
				showMask: false,
				selected: {
					value: "1",
					label: "unlimited"
				},
				shippWay: [{
						value: "1",
						label: "unlimited"
					},
					{
						value: "2",
						label: "Monday - Friday"
					},
					{
						value: "3",
						label: "Saturday and Sunday"
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
			}
		}
	};
</script>

<style>
	.wrapper {
		background-color: #F5F5F5;
	}

	.locationBox {
		width: 750px;
		/* border-bottom-style: solid;
		border-bottom-color: #e6e6e6;
		border-bottom-width: 2px; */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 104px;
		padding: 0 32px;
		margin-bottom: 20px;
		background-color: #FFFFFF;
	}

	.meth_title {
		color: #323232;
		font-size: 30px;
		width: 230px;
	}

	.meth_right {
		flex: 1;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;

	}

	.cityName {

		margin-right: 30px;
		font-size: 28px;
		color: #999999;
		flex: 1;
	}

	.rightIcon {
		font-family: iconfont;
		font-size: 26px;
		color: #999;
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
