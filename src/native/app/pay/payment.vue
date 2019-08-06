<template>
	<div class="wrapper">
		<head title="Payment details"></head>
		<div class="block">
			<text class="symbol">￥</text><text class="money">{{amount}}</text>
		</div>
		<div class="paytypeBox">
			<div class="row" @click="paytype='visa'">
				<image class="visa" src="root:img/visa.png"> </image>
				<text class="center">Visa</text>
				<div class="right">
					<text class="iconfont active" v-if="paytype=='visa'">&#xe60d;</text>
					<text class="iconfont" v-else>&#xe67f;</text>
				</div>
			</div>
			<div class="row" @click="paytype='union'">
				<image class="union" src="root:img/union.png"> </image>
				<text class="center">Mastercard</text>
				<div class="right">
					<text class="iconfont active" v-if="paytype=='union'">&#xe60d;</text>
					<text class="iconfont" v-else>&#xe67f;</text>
				</div>
			</div>
			<div class="addCard" v-if="paytype=='union'">
				<text class="addTit">Add credit card</text>
				<input class="inputCard" placeholder="Name" />
				<input class="inputCard bt0" placeholder="Card number" />
				<text class="addTit">Card expiry date</text>
				<div class="inputBox">
					<input class="boxItem"  type="date"/> 
					<input class="boxItem" /> 
				</div>
				<text class="btn">Add credit card</text>
			</div>


		</div>
		<div class="paytypeBox">
			<div class="row" @click="paytype='wechat'">
				<image class="left" src="root:img/wechat.png"> </image>
				<text class="center">WeChat pay</text>
				<div class="right">
					<text class="iconfont active" v-if="paytype=='wechat'">&#xe60d;</text>
					<text class="iconfont" v-else>&#xe67f;</text>
				</div>
			</div>
			<div class="row" @click="paytype='alipay'">
				<image class="left" src="root:img/alipay.png"> </image>
				<text class="center">Alipay</text>
				<div class="right">
					<text class="iconfont active" v-if="paytype=='alipay'">&#xe60d;</text>
					<text class="iconfont" v-else>&#xe67f;</text>
				</div>
			</div>
			<div class="row" @click="paytype='paypal'">
				<image class="paypal" src="root:img/paypal.png"> </image>
				<text class="center">Paypal</text>
				<div class="right">
					<text class="iconfont active" v-if="paytype=='paypal'">&#xe60d;</text>
					<text class="iconfont" v-else>&#xe67f;</text>
				</div>
			</div>

		</div>
		<div class="save" @click="save">
			<text class="btn">confirm</text>
		</div>
	</div>
</template>

<script>
	const navigator = weex.requireModule("navigator");

	export default {
		data() {
			return {
				amount: 0,
				paytype: "union" //支付类型
			};
		},
		onLoad(e) {},
		methods: {
			save() {
				navigator.push("root:app/pay/success.js");
			}
		}
	};
</script>

<style scoped>
	.iconfont {
		font-family: iconfont;
		font-size: 34px;
	}

	.iconfont {
		color: #ba8733;
	}

	.wrapper {
		background-color: #f5f5f5;
	}

	.block {
		width: 750px;
		height: 120px;
		justify-content: center;
		align-items: center;
		flex-direction: row;
	}

	.symbol {
		color: #ec414d;
		font-size: 24px;
	}

	.money {
		color: #ec414d;
		font-size: 38px;
		font-weight: 600;
	}

	.addCard {
		width: 686px;
		padding: 0 0 40px;

	}

	.addTit {
		color: #666666;
		margin: 20px 0;
		font-size: 26px;
	}

	.inputCard {
		border-width: 1px;
		border-style: solid;
		border-color: #D8D8D8;
		width: 686px;
		height: 100px;
		padding-left: 32px;
		;
	}

	.inputBox {
		width: 686px;
		margin-bottom: 40px;
		flex-direction: row;
		justify-content: space-between;
	}

	.boxItem {
		border-width: 1px;
		border-style: solid;
		border-color: #D8D8D8;
		width: 310px;
		height: 100px;
	}

	.bt0 {
		border-top-width: 0;

	}

	.paytypeBox {
		margin-top: 20px;
		background-color: #fff;
		padding: 0 20px;
		align-items: center;
	}

	.row {
		width: 710px;
		height: 95px;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
	}

	.bb {
		border-bottom-color: #e6e6e6;
		border-bottom-style: solid;
		border-bottom-width: 1px;
	}

	.left {
		width: 50px;
		height: 50px;
		margin-right: 30px;
		margin-left: 10px;
	}

	.paypal {
		width: 61px;
		height: 16px;
		margin-right: 25px;
		margin-left: 5px;
	}

	.visa {
		width: 60px;
		height: 18.3px;
		margin-right: 25px;
		margin-left: 5px;
	}

	.union {
		width: 51px;
		height: 32px;
		margin-right: 30px;
		margin-left: 10px;
	}

	.center {
		flex: 1;
		font-size: 30px;
		color: #333333;
	}

	.right {
		width: 100px;
		justify-content: flex-end;
		flex-direction: row;
	}

	.save {
		position: fixed;
		bottom: 0;
		width: 750px;
		height: 120px;
		justify-content: center;
		align-items: center;
	}

	.btn {
		width: 690px;
		height: 80px;
		line-height: 80px;
		border-radius: 10px;
		background-color: #303030;
		color: #fff;
		text-align: center;
		font-size: 30px;
	}
</style>
