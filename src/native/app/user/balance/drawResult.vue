<template>
	<div>
		<head title="" bgcolor="rgba(0,0,0,0)" bgwidth="200">
			<text slot="right" @click="confirm" class="rightTix">Comfirm</text>
		</head>
		<div class="icon">
			<text class="iconfont">&#xe60d;</text>
			<text class="status">Successful application</text>
			<text class="money">$50.00</text>
			<!-- 	<text class="btn" @click="returnpage">Return</text>
			<text class="btn">View orders</text> -->

		</div>

	</div>
</template>

<script>
	const navigator = weex.requireModule('navigator');
	const navbar = weex.requireModule("navbar");
	export default {
		data() {
			return {
				amount: 0
			};
		}, 
		
		onLoad(e) {
			this.amount = parseFloat(e.amount).toFixed(2);
		},
		methods: {
			 onResume(){
			 	navbar.setStatusBarStyle("black");
			 },
			confirm(){
				// this.backTo("缺人")
				navigator.backTo('balance')
			},
			returnpage() {
				navigator.backTo('A')
			}
		}
	};
</script>

<style scoped>
	.icon {
		width: 750px;
		flex: 1;
		justify-content: flex-start;
		align-items: center;
	}

	.iconfont {
		font-family: iconfont;
		font-size: 100px;
		margin-top: 100px;
		color: #BA8833;
	}

	.status {
		color: #333333;
		font-size: 32px;
		margin-top: 30px;
		margin-bottom: 100px;
	}
		
	.rightTix{
		color: #333333;
		font-size: 32px;
	}
	.money {
		font-size: 48px;
		color: #333333;
	}

	.btn {
		width: 400px;
		height: 80px;
		line-height: 80px;
		border-radius: 80px;
		background-color: #303030;
		color: #fff;
		text-align: center;
		font-size: 30px;
		margin-top: 88px;
	}
</style>
