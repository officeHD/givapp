<template>
	<div class="wrapper">
		<head title="Balance" @rightClick="gonext('root:app/user/balance/bill.js')">
			<text slot="right" class="rightTix">Bill</text>
		</head>
		<div class="topc">
			<div class="topLine">
				<text class="lineL"></text>
				<text class="lineC">Account Balance</text>
				<text class="lineR"></text>
			</div>
			<text class="acNum">{{balance}}</text>
			<text class="bBtn">Balance withdrawal</text>
		</div>
		<text class="titA">Withdrawal rules</text>
		<text class="tit">1. Over {{min_price}} can be withdrawn</text>
		<text class="tit">2. Rate {{(poundage-0)*100}}%</text>
		<text class="tit">3. {{content}}</text>
		<!-- <text class="tit">4. </text> -->
	</div>
</template>

<script>
	import {
		get_system_info,
		get_users_balance
	} from "../../../mixin/ajax.js";
	import asCore from "../../../mixin/core";
	export default {
		data() {
			return {
				balance: "",
				poundage: "",
				content: "",
				min_price: ""
			}
		},
		methods: {
			onLoad() {
				asCore.getBsessionid(userId => {
					this.log(userId)
					get_users_balance({
						users_id: userId
					}, (res, flag) => {
						this.log(res)
						if (flag) {
							if (res.code == 200) {
								this.balance = res.data.balance;
							}
						}
					})
				})
				get_system_info({}, (res, flag) => {
					this.log(res)
					if (flag) {
						this.min_price = res.data.min_price;
						this.content = res.data.content;
						this.poundage = res.data.poundage;
					}
				})

			},
			gonext(url, parmar) {
				this.push(url, parmar)
			}
		}
	}
</script>

<style scoped="scoped">
	.wrapper {
		background-color: #F5F5F5;
	}

	.topc {
		background-color: #FFFFFF;
		height: 444px;
		width: 750px;
		align-items: center;


	}

	.topLine {
		flex-direction: row;
		position: relative;
		margin-top: 80px;
		align-items: center;
	}

	.lineL {
		height: 1px;
		background-color: #E0BD83;
		width: 140px;
	}

	.lineR {
		height: 1px;
		background-color: #E0BD83;
		width: 140px;
	}

	.lineC {
		color: #E0BD83;
		margin: 0 30px;
		font-size: 28px;
	}

	.acNum {
		height: 123px;
		line-height: 123px;
		color: #1E1E1E;
		font-size: 88px;
		margin-top: 36px;
	}

	.rightTix {
		color: #FFFFFF;
		font-size: 28px;
	}

	.titA {
		margin-top: 48px;
		font-size: 28px;
		padding-left: 32px;
		color: #333333;
		line-height: 40px;
	}

	.bBtn {
		margin-top: 37px;
		width: 505px;
		height: 80px;
		line-height: 80px;
		text-align: center;
		background-color: #BA8833;
		color: #FFFFFF;
		font-size: 34px;
		border-radius: 60px;
	}

	.tit {
		font-size: 24px;
		padding-left: 32px;
		margin-top: 16px;
		line-height: 33px;
		color: #666;
	}
</style>
