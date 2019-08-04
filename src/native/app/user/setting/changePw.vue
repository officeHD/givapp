<template>
	<div class="wrapper">
		<head title="Change password"> </head>
		<text class="title">Please enter the old password</text>
		<div class="boxInput">
			<input type="password"  class="input" placeholder="Enter Old Password"/>
		</div>
		<text class="title">Please enter a new password</text>
		<div class="boxInput">
			<input type="password" class="input" placeholder="Enter New Password"/>

			<text class="line"></text>
		</div>
		
		<div class="boxInput">
			
			<input type="password"  class="input" placeholder="Repeat the new password"/>
		</div>
		
		<text class="tips" @click="gonext('root:app/user/setting/changePw2.js')">Forget your password. Use SMS</text>
		<text class="sureBtn" @click="gonext('root:app/user/setting/changePw4.js')">confirm modification</text>
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
		height: 90px;
		background-color: #FFFFFF;
		position: relative;
	}
	.input{
		flex: 1;
		padding-left: 37px;
	}
	.tips{
		widows: 750px;
		padding: 32px;
		color: #BA8833;
		text-align: right;
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
