<template>
	<div>
		<image class="bgimg" src="root:img/bg.png"> </image>
		<scroller class="wrapper">
			<text class="title">{{loginType=='email'?"Registered mail":"Registered mobile phone number"}}</text>
			<div class="inputBox bb">
				<text v-if="loginType=='phone'" class="phoneType">+86</text>
				<input v-if="loginType=='phone'" v-model="phone" type="text" class="input" placeholder="Please enter phone"
				 placeholder-color="#F2f2f2" />
				<input v-if="loginType=='email'" v-model="email" type="text" class="input" placeholder="Please enter email"
				 placeholder-color="#F2f2f2" />
			</div>
			<div class="inputBox bb" v-if="loginType=='phone'">
				<input type="text" class="input" v-model="vertify" placeholder="" placeholder-color="#F2f2f2" />
				<text class="codeBtn" v-if="state">{{ currentTime }} s</text>
				<text class="codeBtn" v-if="!state" @click="send_verify_code">Send verification code</text>
			</div>
			<div class="inputBox bb">
				<input type="text" class="input" v-model="password" placeholder="Please enter password" placeholder-color="#F2f2f2" />
			</div>
			<div class="radioBox">
				<text class="iconfont radio">&#xe67f;</text>
				<text class="loginType">User agreement</text>
			</div>
			<text class="singnIn" @click="toRegist">Register and log in</text>
			<text class="logintip" @click="loginType='phone'" v-if="loginType=='email'">Registered mobile phone number</text>
			<text class="logintiphone" @click="loginType='email'" v-if="loginType=='phone'">Registered mail</text>
			<div class="rowBox" @click="toLogin">
				<text class="boxItem ccc">Have an account, </text>
				<text class="boxItem"> Log in now</text>
			</div>
		</scroller>
		<div v-if="loading" class="mask" @click="event=> event.stopPropagation()">
				<floading class="indicator" color="#303030"> </floading>
		</div>
	</div>
</template>

<script>
	const pref = weex.requireModule("storage")
	const navigator = weex.requireModule("navigator");
	import {
		send_verify,
		register,
		verify_login
	} from "../../mixin/ajax.js";

	export default {
		data() {
			return {
				passwd: "",
				phoneL: "",
				email: "",
				vertify: "",
				loading:false,
				state: false, //是否开启倒计时
				totalTime: 60, //总时间，单位秒
				recordingTime: 0, //记录时间变量
				currentTime: 0, //显示时间变量
				loginType: "email"
			};
		},
		methods: {
			checkingTime() {
				let that = this;
				//判断是否开启
				if (this.state) {
					//判断显示时间是否已到0，判断记录时间是否已到总时间
					if (this.currentTime > 0 && this.recordingTime <= this.totalTime) {
						//记录时间增加 1
						this.recordingTime = this.recordingTime + 1;
						//显示时间，用总时间 - 记录时间
						this.currentTime = this.totalTime - this.recordingTime;
						//1秒钟后，再次执行本方法
						setTimeout(() => {
							//定时器内，this指向外部，找不到vue的方法，所以，需要用that变量。
							that.checkingTime();
						}, 1000)
					} else {
						//时间已完成，还原相关变量
						this.state = false; //关闭倒计时
						this.recordingTime = 0; //记录时间为0
						this.currentTime = this.totalTime; //显示时间为总时间
					}
				} else {
					//倒计时未开启，初始化默认变量
					this.state = false;
					this.recordingTime = 0;
					this.currentTime = this.totalTime;
				}
			},
			send_verify_code() {
				let that = this;
				if (!that.phone) {
					that.toast("Enter your phoneNumber");
					return false
				}
				this.loading = true;
				send_verify({
					mobile: that.phone,
					type: "1" // 1.注册验证码 2.登录验证码
				}, (res, flag) => {
					this.loading = false;
					if (flag) {
						if (res.code == "200") {
							that.toast(res.message)
							//把显示时间设为总时间
							that.currentTime = this.totalTime;
							//开始倒计时
							that.state = true;
							//执行倒计时
							that.checkingTime();
						} else {
							that.toast(res.message)
						}
					}

				})

			},
			toRegist() {
				let data = {};
				if (this.loginType == 'phone') {
					if (!this.phone) {
						this.toast("Enter your phoneNumber");
						return false;
					}

					if (!this.verify) {
						this.toast("Enter your verifyCode");
						return false;
					}
					data = {
						account: this.phone,
						password: this.password,
						repassword: this.password,
						verify: this.verify,
					}
				} else {
					if (!this.email) {
						this.toast("Enter your email");
						return false;
					}

					data = {
						account: this.email,
						password: this.password,
						repassword: this.password,
						verify: "",
					}
				}

				if (!this.password) {
					this.toast("Enter your password");
					return false;
				}
				register(data, (res, flag) => {
					if (flag) {
						this.log(res.message);
						if (res.code == 200) {
							pref.setItem('users_id', res.data.users_uuid);
							if (this.loginType == 'phone'){
								navigator.backTo("A");
							}else{
								navigator.push("root:app/login/bindPhone.js");
							} 
						} else {
							this.toast(res.message) 
						}
					}
				})



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
</style>
