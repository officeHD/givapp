<template>
	<div class="wrapper">
		<head title="Accounts and Security"> </head>
		<div class="locationBox  bb   ">
			<text class="meth_title">username</text>
			<div class="meth_right ">
				<text class="cityName">{{user.user_name}}</text>

			</div>
		</div>
		<div class="locationBox bb " @click="gonext('root:app/user/setting/changePh.js',{phone:user.phone_number})">
			<text class="meth_title">Modify mobile phone number</text>
			<div class="meth_right ">
				<text class="cityName">{{user.phone_number}}</text>
				<text class="rightIcon">&#xe6a1;</text>
			</div>
		</div>
		<div class="locationBox  bb" @click="gonext('root:app/user/setting/changePw.js')">
			<text class="meth_title">Modify login password</text>
			<div class="meth_right ">
				<text class="cityName"> </text>
				<text class="rightIcon">&#xe6a1;</text>
			</div>
		</div>
		<div class="locationBox  " @click="unsubscribe()">
			<text class="meth_title">unsubscribe</text>
			<div class="meth_right ">
				<text class="cityName"></text>
				<text class="rightIcon">&#xe6a1;</text>
			</div>
		</div>
	</div>
</template>

<script>
	const navigator = weex.requireModule("navigator");
	import asCore from "../../../mixin/core";
	export default {
		data() {
			return {
				user:{
					user_name:""
				}
			}
		},
		created() {
			asCore.getContext(context => {
				this.log(context)
				this.user = context;
			});
		},
		methods: {
			gonext(url,parmas) {
				this.push(url,parmas);
			},
			unsubscribe() { 
				this.toast("确定注销？")
			}
		}
	}
</script>

<style>
	.wrapper {
		background-color: #F5F5F5;
	}

	.bb {
		border-bottom-style: solid;
		border-bottom-color: #EDEDED;
		border-bottom-width: 1px;
	}

	.locationBox {
		width: 750px;

		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 104px;
		padding: 0 32px;
		/* margin-bottom: 20px; */
		background-color: #FFFFFF;
	}

	.meth_title {
		color: #323232;
		font-size: 26px;
		width: 353px;
	}

	.meth_right {
		flex: 1;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;

	}

	.cityName {


		font-size: 28px;
		color: #999999;
		flex: 1;
		text-align: right;
	}

	.rightIcon {
		font-family: iconfont;
		font-size: 26px;
		color: #999;
		margin-left: 30px;
	}
</style>
