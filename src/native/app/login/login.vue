<template>
	<div>
		<image class="bgimg" src="root:img/bg.png"> </image>

		<scroller class="wrapper">
			<Loading></Loading>
			<text class="title">Welcome to your account</text>
			<div class="inputBox bb">
				<text class="iconfont inputIcon br">&#xe782;</text>
				<input v-if="loginType=='account'" type="text" :value="account" class="input" placeholder="Enter account" @input="onChange"
				 placeholder-color="#c3c3c3" />
				<input v-if="loginType=='phone'" type="text" :value="phone_number" class="input" placeholder="Enter phone" @input="changePhone"
				 placeholder-color="#c3c3c3" />
			</div>
			<div class="inputBox bb">
				<text class="iconfont inputIcon br">&#xe635;</text>
				<input v-if="loginType=='account'" type="text" :value="password" class="input" placeholder="Enter password" @input="changep"
				 placeholder-color="#c3c3c3" />
				<input v-if="loginType=='phone'" type="text" class="input" placeholder="Enter verify" @input="changeV"
				 placeholder-color="#c3c3c3" />
				<text class="codeBtn" v-if="loginType=='phone'" @click="send_verify_code">Receive Sms code</text>
			</div>
			<text class="loginType" v-if="loginType=='account'" @click="loginType='phone'">Verification code login</text>
			<text class="loginType" v-if="loginType=='phone'" @click="loginType='account'">Account login</text>
			<text class="singnIn" @click="login">Sign in</text>
			<div class="rowBox">
				<text class="boxItem" @click="register">User registration</text>
				<text class="br h20"></text>
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
	var pref = weex.requireModule("storage")


	import asCore from "../../mixin/core";
	import {
		send_verify,
		loginWithPw,
		verify_login
	} from "../../mixin/ajax.js";

	export default {
		data() {
			return {
				loading: false,
				loginType: "account",
				phone_number: "",
				verify: "",
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
		created() {
			let that = this;
			pref.getItem("as_username", event => {
				if (event.result == "success") {
					that.account = event.data;
				}
			})
			pref.getItem("as_password", event => {
				if (event.result == "success") {
					that.password = event.data;
				}
			})
		},

		methods: {
			onChange(e) {
				this.account = e.value
			},
			changep(e) {
				this.password = e.value
			},
			changeV(e) {
				this.verify = e.value
			},
			changePhone(e) {
				console.log(e)
				this.phone_number = e.value

			},
			send_verify_code() {
				let that = this;
				if (!that.phone_number) {
					that.toast("Enter your phoneNumber");
					return false
				}
				this.loading = true;
				send_verify({
					mobile: that.phone_number,
					type: "2"
				}, (res, flag) => {
					this.loading = false;
					if (flag) {
						if (res.code == "200") {
							that.toast(res.message)
						} else {
							that.toast(res.message)
						}
					}

				})

			},
			login_pw() {
				if (!that.account) {
					that.toast("Enter your account");
					return false
				}
				if (!that.password) {
					that.toast("Enter your password");
					return false
				}
				this.loading = true;
				loginWithPw({
					account: that.account,
					password: that.password
				}, res => {
					this.loading = false;
					if (res.code == "200") {

						this.loginSus(res)

					} else {
						that.toast(res.message)
					}
				})
			},
			login_ver() {
				if (!that.phone_number) {
					that.toast("Enter your phoneNumber");
					return false
				}
				if (!that.verify) {
					that.toast("Enter your verify");
					return false
				}
				this.loading = true;
				verify_login({
					phone_number: that.phone_number,
					verify: that.verify
				}, res => {
					this.loading = false;
					if (res.code == "200") {

						this.loginSus(res)

					} else {
						that.toast(res.message)
					}
				})
			},
			//登录
			login() {
				// 判断登录方式
				if (this.loginType !== 'account') {
					this.login_ver();
				} else {
					this.login_pw();
				}
			},
			loginSus(res) {
				let that = this;
				asCore.setBsessionid(res.data.users_uuid);
				if (that.loginType == 'account') {
					pref.setItem('as_username', that.account);
					pref.setItem('as_password', that.password);
				}
				navigator.back();
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

	.h20 {
		height: 20px;
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
		height: 60px;
		line-height: 60px;
		margin-top: 20px;
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
		height: 60px;
		line-height: 60px;
		padding: 0 34px;
		font-size: 20px;
		color: #FFFFFF;
		text-align: center;
	}
</style>
