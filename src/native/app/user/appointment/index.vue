<template>
	<div class="wrapper">
		<head title="appointment time"> </head>
		<div class="locationBox" @click="changeAlert('show','take_time')">
			<text class="meth_title">Visit time</text>
			<div class="meth_right ">
				<text class="cityName">{{user.take_time}}</text>
				<text class="rightIcon">&#xe6a1;</text>
			</div>
		</div>
		<div class="locationBox" @click="changeAlert('show','receive_time')">
			<text class="meth_title">delivery time</text>
			<div class="meth_right ">
				<text class="cityName">{{user.receive_time}}</text>
				<text class="rightIcon">&#xe6a1;</text>
			</div>
		</div>
		<div :class="[showMask?'maskAlert':'hidemask']" @click="changeAlert('hide')"></div>
		<!-- 邮费弹出框 -->
		<div class="shopAlert" ref="shopAlert" @click="e=>e.stopPropagation()">
			<text class="alertTop">Visit time</text>
			<scroller class="alertScroll">
				<div class="selectLi" v-for="item in shippWay" :key="item" @click="selectTime=item">
					<text class="liIcon" :class="[selectTime==item?'selected':'']">{{selectTime==item?"&#xe602;":"&#xe67f;"}}</text>
					<text class="liTxt" :class="[selectTime==item?'selected':'']">{{item}}</text>
				</div>

			</scroller>
			<text class="sureBtn" @click="confirm">confirm</text>
		</div>
	</div>
</template>

<script>
	const navigator = weex.requireModule("navigator");
	const animation = weex.requireModule("animation");
	import asCore from "../../../mixin/core";
	import { edit_users_info } from "../../../mixin/ajax.js";
	export default {
		data() {
			return {
				//是否显示遮罩层
				showMask: false,
				selectTime: "",
				selectTYpe: "",
				user: {
					take_time: "",
					receive_time: "",
				},
				shippWay: ["13:00 - 14:00", "15:00 - 16:00", "After 20:00"]

			};
		},
		created() {
			asCore.getContext(userData => {
				this.user = userData
			})
		},
		methods: {

			changeAlert(type, items) {
				if (items) {
					this.selectTYpe = items;
					if (items === "take_time") {
						this.selectTime = this.user.take_time
					} else {
						this.selectTime = this.user.receive_time
					}
				}

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
				this.addressData = msg.data
			},
			confirm() {
				if (this.selectTYpe == "take_time") {
					this.user.take_time = this.selectTime;
				} else {
					this.user.receive_time = this.selectTime;
				}
				edit_users_info({
					users_id: this.user.users_uuid,
					take_time: this.user.take_time,
					receive_time: this.user.receive_time,
				}, (res, flag) => {
					if (flag) {
						// this.log(res)
						this.toast(res.message)
						if (res.code == 200) {
							const updateImg = new BroadcastChannel("updateImg");
							updateImg.postMessage("update");
						}
					}
				})
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
		bottom: 500px;
		top: 0;
		/* background-color: rgba(0, 0, 0, 0); */
	}

	.shopAlert {
		position: fixed;
		left: 0;
		bottom: -500px;
		width: 750px;
		height: 500px;
		background-color: #ffffff;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		align-items: center;
		padding: 32px;
		flex-direction: column;
	}

	.alertTop {
		width: 686px;
		text-align: center;
		padding-bottom: 32px;
		font-size: 28px;
		color: #333333;
		height: 70px;
	}

	.alertScroll {
		width: 686px;
		flex: 1;
	}

	.selectLi {
		/* margin-bottom: 30px; */
		height: 70px;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: 750px;
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
		height: 74px;
		line-height: 74px;
		border-radius: 10px;
		/* margin-bottom: 15px; */
		background-color: #303030;
		color: #fff;
		text-align: center;
		font-size: 30px;
	}
</style>
