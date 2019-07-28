<template>
	<div>
		<div class="block">
			<text class="title"> 我的账户 </text>
			<div class="content">
				<text class="my"> 我的账户余额：0 元 </text>
			</div>
		</div>
		<div class="block">
			<text class="title"> 充值金额 </text>
			<div class="content">
				<div class="amount">
					<div class="list">
						<text class="box" v-for="(amount,index) in amountList" :key="index" @tap="select(amount)" :class="{'on':amount == inputAmount}">
							{{amount}}元 </text>
					</div>
					<div class="num">
						<text class="text"> 自定义充值金额 </text>
						<div class="input">
							<input type="number" v-model="inputAmount" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="block">
			<text class="title"> 选择支付方式 </text>
			<div class="content">
				<div class="pay-list">
					<div class="row" @tap="paytype='alipay'">
						<div class="left">
							<img src="root:/img/alipay.png"></img>
						</div>
						<text class="center"> 支付宝支付 </text>
						<div class="right">
							<radio :checked="paytype=='alipay'" color="#f06c7a" />
						</div>
					</div>
					<div class="row" @tap="paytype='wxpay'">
						<div class="left">
							<img src="root:/img/wxpay.png"></img>
						</div>
						<text class="center"> 微信支付 </text>
						<div class="right">
							<radio :checked="paytype=='wxpay'" color="#f06c7a" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="pay">
			<text class="btn" @tap="doDeposit">立即充值</text>
			<div class="tis">
				<text>点击立即充值，即代表您同意</text>
				<text class="terms"> 《条款协议》 </text>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				inputAmount: "", //金额
				amountList: [10, 50, 100], //预设3个可选快捷金额
				paytype: "alipay" //支付类型
			};
		},
		methods: {
			select(amount) {
				this.inputAmount = amount;
			},
			doDeposit() {
				if (parseFloat(this.inputAmount).toString() == "NaN") {
					uni.showToast({
						title: "请输入正确金额",
						icon: "none"
					});
					return;
				}
				if (this.inputAmount <= 0) {
					uni.showToast({
						title: "请输入大于0的金额",
						icon: "none"
					});
					return;
				}
				if (
					parseFloat(this.inputAmount).toFixed(2) != parseFloat(this.inputAmount)
				) {
					uni.showToast({
						title: "最多只能输入两位小数哦~",
						icon: "none"
					});
					return;
				}
				//模板模拟支付，实际应用请调起微信/支付宝
				uni.showLoading({
					title: "支付中..."
				});
				setTimeout(() => {
					uni.hideLoading();
					uni.showToast({
						title: "支付成功"
					});
					setTimeout(() => {
						uni.redirectTo({
							url: "../../pay/success/success?amount=" + this.inputAmount
						});
					}, 300);
				}, 700);
			}
		},
		onLoad() {}
	};
</script>

<style scoped>
	.block {
		width: 94%;
		padding: 20px 3%;
	}

	.title {
		width: 100%;
		font-size: 34px;
	}

	.my {
		width: 100%;
		height: 120px;
		align-items: center;
		font-size: 30px;
		border-bottom: solid 1px #eee;
	}

	.amount {
		width: 100%;
	}

	.list {
		justify-content: space-between;
		padding: 20px 0;
	}

	.box {
		width: 30%;
		height: 120px;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
		font-size: 36px;
		background-color: #f1f1f1;
		color: 333;
	}

	.on {
		background-color: #f06c7a;
		color: #fff;
	}

	.num {
		margin-top: 10px;
		justify-content: flex-end;
		align-items: center;
	}

	.text {
		padding-right: 10px;
		font-size: 30px;
	}

	.input {
		width: 28.2vw;
		border-bottom: solid 2px #999;

		justify-content: flex-end;
		align-items: center;
	}

	input {
		margin: 0 20px;
		height: 60px;
		font-size: 30px;
		color: #f06c7a;
		justify-content: flex-end;
		align-items: center;
	}

	.pay-list {
		width: 100%;
		border-bottom: solid 1px #eee;
	}

	.row {
		width: 100%;
		height: 120px;
		align-items: center;
	}

	.left {
		width: 100px;

		align-items: center;
	}

	image {
		width: 80px;
		height: 80px;
	}

	.center {
		width: 100%;
		font-size: 30px;
	}

	.right {
		width: 100px;
		justify-content: flex-end;
	}

	.pay {
		margin-top: 20px;
		width: 100%;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn {
		width: 70%;
		height: 80px;
		border-radius: 80px;
		justify-content: center;
		align-items: center;
		color: #fff;
		background-color: #f06c7a;
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
	}

	.tis {
		margin-top: 10px;
		width: 100%;
		font-size: 24px;
		justify-content: center;
		align-items: flex-end;
		color: #999;
	}

	.terms {
		color: #5a9ef7;
	}
</style>
