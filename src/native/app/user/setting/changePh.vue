<template>
	<div class="wrapper">
		<head title="Message authentication"> </head>
		<div class="boxInput">
			<text class="getCode">Current binding phone number:</text>

			<input   class="input" value="+86-19255344221" placeholder="+86-19255344221"/> 
		</div>
		<text class="title">The phone number is used as the login account and to change the password</text>

		<text class="sureBtn" @click="gonext('root:app/user/setting/changePh2.js')">confirm modification</text>
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

<style scoped>
	.wrapper{
		background-color: #F2F2F2;
	}
	.title{
		font-size: 28px;
		color: #666666;
		padding: 32px;
		width: 750px;
	}
	.line{
		position: absolute;
		width: 686px;
		left: 32px;
		bottom: 1px;
		border-bottom-width: 2px;
		border-bottom-color: #CCCCCC;
		border-bottom-style: solid;
	}
	.boxInput{
		width: 750px;
		height: 164px;
		background-color: #FFFFFF;
		position: relative;
		justify-content: center;
	}
	.input{
		 height: 60px;
		padding-left: 37px;
	}
	.getCode{
		padding: 0 34px;
		height: 30px;
		line-height: 30px;
		color: #666666;
		text-align: left;
		font-size: 22px;
	}
	.sureBtn{
		margin-left: 32px;
		margin-top: 40px;
		width:686px;
		height:80px;
		background-color:rgba(200,200,200,1);
		border-radius:8px;
		text-align: center;
		line-height: 80px;
		color: #999999;
		font-size: 34px;
	}
</style>
