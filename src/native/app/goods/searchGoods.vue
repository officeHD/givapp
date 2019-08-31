<template>
	<div>
		<head @rightClick="rightClick" bgcolor="rgba(0,0,0,0)" bgwidth="120">
			<div slot="center" class="inputbox" @click="searchClick">
				<text class="searchIcon iconfont">&#xe62a;</text>
				<input class="tips" placeholder="noteBook" />
			</div>
			<text class="Cancel" slot="right">Cancel</text>
		</head>
		<div class="bt"></div>
	</div>
</template>

<script>
	const navigator = weex.requireModule('navigator');
	const navbar = weex.requireModule('navbar');
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
			onResume() {
				navbar.setStatusBarStyle("black");
			},
		}
	}
</script>

<style>
	.inputbox {
		background-color: #fff;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		flex: 1;
		border-radius: 40px;
		height: 58px;
		padding: 0 40px;
		margin: 0 20px;
		border-width: 1px;
		border-style: solid;
		border-color: #E1E1E1;
		/* margin-left: 32px; */
	}
	.bt{
		border-top-width: 1px;
		border-top-style: solid;
		border-top-color: #E1E1E1;
	}
	.searchIcon {
		font-family: iconfont;
		color: #999;
		margin-right: 10px;
		font-size: 30px;
	}
	.tips{
		height: 58px;
		flex: 1;
		font-size: 28px;
	}

	.Cancel {
		font-size: 26px;
		color: #333333;
	}
</style>
