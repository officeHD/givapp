<template>
	<div class="wrapper">
		<head title="Accounts and Security"> </head>
		<div class="locationBox  bb   ">
			<text class="meth_title">username</text>
			<div class="meth_right ">
				<text class="cityName">LILI</text>
				 
			</div>
		</div>
		<div class="locationBox bb " @click="gonext('root:app/user/setting/changePh.js')">
			<text class="meth_title">Modify mobile phone number</text>
			<div class="meth_right ">
				<text class="cityName">18156636363</text>
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
		<div class="locationBox  ">
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
	export default {
		methods: {
			gonext(url) {
				 
				navigator.push(url);
			}
		}
	}
</script>

<style>
	.wrapper {
		background-color: #F5F5F5;
	}
	.bb{
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
