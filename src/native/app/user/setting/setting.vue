<template>
	<div class="wrapper">
		<head title="Setting"> </head>
		<div class="locationBox " @click="gonext('root:app/user/address/address.js')">
			<text class="meth_title">My receipt address</text>
			<text class="rightIcon">&#xe6a1;</text>
		</div>
		<div class="locationBox row jbew atop " @click="gonext('root:app/user/address/return.js')">
			<text class="meth_title">return address</text>
			<text class="rightIcon">&#xe6a1;</text>
		</div>
		<div class="locationBox row jbew atop " @click="gonext('root:app/user/setting/account.js')">
			<text class="meth_title">Accounts and Security</text>
			<text class="rightIcon">&#xe6a1;</text>
		</div>
		<text class="btn" @click="logout">Sign out</text>

	</div>
</template>

<script>
	const navigator = weex.requireModule("navigator");
	export default {
		methods: {
			logout() {
				this.log("logout")
			},
			gonext(url, parmar) { 
				this.push(url, parmar);
			}
		}
	}
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
		flex: 1;
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

	.btn {
		width: 686px;
		left: 32px;
		position: fixed;
		bottom: 30px;
		height: 80px;
		line-height: 80px;
		border-radius: 8px;
		background-color: #303030;
		color: #fff;
		text-align: center;
		font-size: 30px;
	}
</style>
