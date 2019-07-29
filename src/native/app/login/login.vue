<template>
	<div>
		<image class="bgimg" src="root:img/bg.png"> </image>

		<scroller class="wrapper">
			<Loading></Loading>
			<text class="title">Welcome to your account</text>
			<div class="inputBox bb">
				<text class="iconfont inputIcon br">&#xe782;</text>
				<input type="text" class="input" placeholder="Enter account" @change="onChange" placeholder-color="#c3c3c3" />  
			</div>
			<div class="inputBox bb">
				<text class="iconfont inputIcon br">&#xe635;</text>
				<input type="text" class="input" placeholder="Enter password" @change="changep" placeholder-color="#c3c3c3" />
				<text class="codeBtn" v-if="loginType=='phone'">Receive Sms code</text>
			</div>
			<text class="loginType" v-if="loginType=='account'" @click="loginType='phone'">Verification code login</text>
			<text class="loginType" v-if="loginType=='phone'" @click="loginType='account'">Account login</text>
			<text class="singnIn" @click="login">Sign in</text>
			<div class="rowBox">
				<text class="boxItem br" @click="register">User registration</text>
				<text class="boxItem">Forgot password</text>
			</div>
			<div v-if="loading" class="mask" @click="event=> event.stopPropagation()">
				<floading class="indicator" color="#303030"> </floading>
			</div>
		</scroller>


	</div>
</template>

<script>
	const navigator = weex.requireModule("navigator");
	var pref = weex.requireModule("static")
	import asCore from "../../mixin/core";

	export default {
		data() {
			return {
				loading: false,
				loginType: "account",
				phoneNumber: "",
				account: "",
				password: "",
				isShowOauth: false,
				showProvider: {
					weixin: false,
					qq: false,
					sinaweibo: false,
					xiaomi: false
				}
			};
		},

		methods: {
			onChange(e) {
				this.account = e.value
			},
			changep(e) {
				this.password = e.value
			},
			login() {
				let that = this;
				if (!that.account) {
					that.toast("Enter your account");
					return false
				}
				if (!that.password) {
					that.toast("Enter your password");
					return false
				}
				this.loading = true;
				asCore.post("web/login/index", {
					account: that.account,
					password: that.password
				}, res => {
					if (res.code == "200") {
						this.log(res)
						navigator.back();
						asCore.setBsessionid(res.data.users_uuid)
					} else {
						that.toast(res.message)
					}

				})

			},
			register() {
				navigator.push("root:app/login/register.js");
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
	.codeBtn {
		height: 60px;
		color: #FFFFFF;
		line-height: 60px;
		font-size: 30px;
	}

	.mask {
		position: fixed;
		left: 0;
		bottom: 0;
		top: 0;
		right: 0;
		justify-content: center;
		align-items: center;
		background-color: rgba(255, 255, 255, .2);
	}

	.indicator {
		width: 100px;
		height: 100px;
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
		font-size: 32px;
		margin-top: 370px;
	}

	.input {
		flex: 1;
		height: 60px;
		padding-left: 20px;
		color: #FFFFFF;
	}

	.inputBox {
		margin-top: 60px;
		height: 60px;
		width: 556px;
		flex-direction: row;
		align-items: center;
	}

	.loginType {
		text-align: right;
		padding-right: 97px;
		color: #FFFFFF;
		width: 750px;
		;
		margin-top: 32px;
		font-size: 22px;
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
		margin-top: 300px;
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
		padding: 0 34px;
		font-size: 20px;
		color: #FFFFFF;
		text-align: center;
	}
</style>
