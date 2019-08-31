<template>
	<div class="wrapper">
		<head title="Accounts receivable"> </head>
		<div class="locationBox">
			<text class="meth_title">Name</text>
			<div class="meth_right ">
				<text class="cityName">LILI</text>
			</div>
		</div>
		<div class="locationBox" @click="changeAlert('show')">
			<text class="meth_title">Accounts receivable</text>
			<div class="meth_right ">
				<text class="cityName">{{selectTYpe}}</text>
				<text class="rightIcon">&#xe6a1;</text>
			</div>
		</div>
		<div class="locationBox"  >
			<text class="meth_title">Account number</text>
		 
				<input class="meth_right methInput" >
			 
		</div>
		<text class="confirmBtn" @click="withDraw">confirm</text>
		<div :class="[showMask?'maskAlert':'hidemask']" @click="changeAlert('hide')"></div>
		<!-- 邮费弹出框 -->
		<div class="shopAlert" ref="shopAlert" @click="e=>e.stopPropagation()">
			<text class="alertTop">Visit time</text>
			<scroller class="alertScroll">
				<div class="selectLi" v-for="item in shippWay" :key="item" @click="selectTYpe=item">
					<text class="liIcon" :class="[selectTYpe==item?'selected':'']">{{selectTYpe==item?"&#xe602;":"&#xe67f;"}}</text>
					<text class="liTxt" :class="[selectTYpe==item?'selected':'']">{{item}}</text>
				</div>

			</scroller>
			<text class="sureBtn" @click="confirm">confirm</text>
		</div>
	</div>
</template>

<script>
	const navigator = weex.requireModule("navigator");
	const animation = weex.requireModule("animation");
	const navbar = weex.requireModule("navbar");
	import asCore from "../../../mixin/core";
	import {
		edit_users_info,
		add_withdraw_info
	} from "../../../mixin/ajax.js";
	export default {
		data() {
			return {
				//是否显示遮罩层
				showMask: false,
				selectTime: "",
				selectTYpe: "",
				shippWay: ["WeChat pay", "Paypal", "Bank card"],
				users_id: "",
				price: "",
				remarks: "", //备注
				withdraw_type: "", //收款方式 1 银行卡 2 支付宝 3 PayPal
				withdraw_name: "", //收款用户姓名
				bank_name: "", //银行名称
				bank_number: "", //银行卡号
				alipay_number: "", //支付宝账号
				paypal_number: "" //paypal账
			};
		},
		created() {
			
			asCore.getContext(userData => {
				this.user = userData
			})
		},
		methods: {
			onResume(){
				navbar.setStatusBarStyle("white");
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
			withDraw() {
				
				add_withdraw_info({
					users_id: this.users_id,
					price: this.price,
					remarks: this.remarks, //备注
					withdraw_type: this.withdraw_type, //收款方式 1 银行卡 2 支付宝 3 PayPal
					withdraw_name: this.withdraw_name, //收款用户姓名
					bank_name: this.bank_name, //银行名称
					bank_number: this.bank_number, //银行卡号
					alipay_number: this.alipay_number, //支付宝账号
					paypal_number: this.paypal_number //paypal账号
				}, (res, flag) => {
					if (flag) {
						this.toast(res.mesage)
						if (res.code == 200) {
							this.push("root:app/user/balance/drawResult.js");
						}
					}
				})

			},
			changeAddress(msg) {
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
		color: #333333;
		font-size: 28px;
		flex: 1;
	}

	.meth_right {
		flex: 1;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;

	}
	.methInput{
		text-align: right;
		height: 80px;;
	}
	 

	.cityName {

		margin-right: 10px;
		font-size: 28px;
		color: #999999;
		flex: 1;
		text-align: right;
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

	.confirmBtn {
		width: 686px;
		height: 80px;
		margin-left: 32px;
		margin-top: 50px;
		line-height: 80px;
		border-radius: 10px;
		/* margin-bottom: 15px; */
		background-color: #303030;
		color: #fff;
		text-align: center;
		font-size: 30px;
	}
</style>
