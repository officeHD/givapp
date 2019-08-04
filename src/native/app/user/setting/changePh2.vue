<template>
	<div class="wrapper">
		<head title="Message authentication"> </head>
		<text class="title">After changing your mobile phone number, your account number will become a new mobile phone number. Next time you log in, use the new mobile phone number to log in. Current mobile phone number: 19255344221</text>
		<div class="boxInput">
			<input   class="input" placeholder=""/> 
			 
		</div>
		<div class="boxInput mt20">
			<input   class="input" placeholder=""/> 
			<text class="getCode">get code</text>
		</div>
		 
		<text class="sureBtn" @click="gonext('root:app/user/setting/changePh3.js')">confirm modification</text>
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
	.mt20{
		margin-top: 20px;
	}
	.boxInput{
		width: 750px;
		height: 90px;
		background-color: #FFFFFF;
		position: relative;
		flex-direction: row;
	}
	.input{
		flex: 1;
		padding-left: 37px;
	}
	.getCode{
		padding: 0 34px;
		height: 80px;
		line-height: 80px;
		color: #BA8833;
		text-align: center;
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
