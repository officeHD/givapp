<template>
	<div>
		<image class="bgimg" src="root:img/bg.png"> </image>
		<scroller class="wrapper">
			<text class="title" >{{loginType=='email'?"Registered mail":"Registered mobile phone number"}}</text> 
			<div class="inputBox bb">
				<text v-if="loginType=='phone'" class="phoneType">+86</text>
				<input v-if="loginType=='phone'" type="text" class="input" placeholder="Please enter email" placeholder-color="#F2f2f2" /> 
				<input v-if="loginType=='email'" type="text" class="input" placeholder="Please enter email" placeholder-color="#F2f2f2" />
			</div> 
			<div class="inputBox bb" v-if="loginType=='phone'"> 
				<input type="text" class="input" placeholder="" placeholder-color="#F2f2f2" />
				<text class="codeBtn">Send verification code</text>
			</div>
			<div class="inputBox bb">
				<input type="text" class="input" placeholder="Please enter password" placeholder-color="#F2f2f2" />
			</div>
			<div class="radioBox">
				<text class="iconfont radio">&#xe67f;</text>
				<text class="loginType">User agreement</text>
			</div>
			<text class="singnIn" @click="regist">Register and log in</text>
			<text class="logintip" @click="loginType='phone'" v-if="loginType=='email'">Registered mobile phone number</text>
			<text class="logintiphone" @click="loginType='email'" v-if="loginType=='phone'">Registered mail</text>
			<div class="rowBox" @click="toLogin">
				<text class="boxItem ccc">Have an account, </text>
				<text class="boxItem"> Log in now</text>
			</div>
		</scroller>

	</div>
</template>

<script>
	const navigator = weex.requireModule("navigator");
	export default {
		data() {
			return {
				passwd: "",
				loginType: "email"
			};
		},
		methods: {
			regist() {
				pref.set('userInfo', obj);
				navigator.backTo("A");
			},
			toLogin() {
				navigator.back();
			}
		}
	};
</script>

<style scoped>
	.bgimg {
		width: 750px;
		height: 1334px;
	}

	.iconfont {
		font-family: iconfont;
	}

	.inputIcon {
		font-size: 30px;
		color: #FFFFFF;
		width: 60px;
		text-align: left;
	}

	.wrapper {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		color: #FFFFFF;
		justify-content: flex-start;
		align-items: center;
	}

	.title {
		color: #FFFFFF;
		font-size: 48px;
		margin-top: 167px;
		height: 200px;
		width: 556px;
		text-align: left;
	}


	.input {
		flex: 1;
		height: 60px;
		padding-left: 5px;
		color: #FFFFFF;
		font-size: 30px;
	}

	.inputBox {
		margin-top: 40px;
		height: 80px;
		width: 556px;
		flex-direction: row;
		align-items: flex-end;
		padding-bottom: 2px;

	}

	.phoneType {
		height: 60px;
		color: #FFFFFF;
		line-height: 60px;
		font-size: 30px;
		margin-right: 20px;
	}

	.codeBtn {
		height: 60px;
		color: #FFFFFF;
		line-height: 60px;
		font-size: 30px;
	}

	.radioBox {
		flex-direction: row;
		margin-top: 32px;
		justify-content: flex-start;
		align-items: center;
		width: 556px;
		height: 40px;
	}

	.radio {
		color: #FFFFFF;
		font-size: 34px;
		margin-right: 20px;

	}

	.loginType {
		color: #FFFFFF;
		font-size: 26px;
	}

	.logintip {
		font-size: 22px;
		margin-top: 32px;
		height: 30px;
		line-height: 30px;
		color: #FFFFFF;
		margin-bottom: 220px;
	}

	.logintiphone {
		font-size: 22px;
		margin-top: 32px;
		height: 30px;
		line-height: 30px;
		color: #FFFFFF;
		margin-bottom: 100px;
	}

	.singnIn {
		width: 580px;
		height: 80px;
		border-radius: 40px;
		background-color: #FFFFFF;
		color: #303030;
		text-align: center;
		line-height: 80px;
		font-size: 28px;
		margin-top: 102px;
	}

	.rowBox {
		flex-direction: row;
		align-items: center;
		justify-content: center;

	}

	.br {
		border-right-color: #FFFFFF;
		border-right-width: 1px;
		border-right-style: solid;
	}

	.bb {
		border-bottom-color: #FFFFFF;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	.boxItem {

		font-size: 32px;
		color: #FFFFFF;
		text-align: center;
	}

	.ccc {
		color: #CCCCCC;
	}
</style>
