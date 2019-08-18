<template>
	<div class="wrapper">
		<head title="Message authentication"> </head>
		<text class="title">Your mobile phone number is {{PhoneNumber}}, click "get verification code"</text>
		<div class="boxInput">
			<input class="input" v-model="vertify" placeholder="" maxlength="6" />
			<text class="getCode" v-if=" state">{{ currentTime }} s</text>
			<text class="getCode" v-if=" !state" @click="send_verify_code">get code</text>
		</div>

		<text class="sureBtn" :class="[flagShow?'active':'']" @click="checkVer">confirm modification</text>
	</div>
</template>

<script>
	const navigator = weex.requireModule("navigator");

	import {
		send_verify,
		verify_mobile,
		editMobile
	} from "../../../mixin/ajax.js";
	export default {
		data() {
			return {
				vertify: "",
				phone: "",
				state: false, //是否开启倒计时
				totalTime: 60, //总时间，单位秒
				recordingTime: 0, //记录时间变量
				currentTime: 0, //显示时间变量
			}
		},

		computed: {
			PhoneNumber() {
				let str = "";
				if (this.phone && this.phone !== null) {
					str = this.phone.replace(this.phone.substring(3, 7), " **** ")
				}
				return str;
			},
			flagShow() {
				return this.vertify
			}
		},
		methods: {

			onLoad(parmar) {
				this.log(parmar)
				this.phone = parmar.phone
			},
			gonext(url) {

				navigator.push(url);
			},
			checkVer() {
				if (!this.flagShow) {
					this.toast("Enter verify")
					return false;
				}
				verify_mobile({
					phone_number: this.phone,
					verify: this.vertify
				}, (res, flag) => {
					if (flag) {
						if (res.code == 200) {
							this.gonext('root:app/user/setting/changePw3.js')
						} else {
							this.toast(res.message)
						}
					}
				})

			},

			send_verify_code() {
				let that = this;

				this.loading = true;
				send_verify({
					mobile: that.phone,
					type: "3" //设置密码
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
			}
		}
	}
</script>

<style scoped>
	.wrapper {
		background-color: #F2F2F2;
	}

	.title {
		font-size: 28px;
		color: #666666;
		padding: 32px;
		width: 750px;
	}

	.line {
		position: absolute;
		width: 686px;
		left: 32px;
		bottom: 1px;
		border-bottom-width: 2px;
		border-bottom-color: #CCCCCC;
		border-bottom-style: solid;
	}

	.boxInput {
		width: 750px;
		height: 90px;
		background-color: #FFFFFF;
		position: relative;
		flex-direction: row;
		align-items: center;
	}

	.input {
		flex: 1;
		padding-left: 37px;
		height: 60px;
	}

	.getCode {
		padding: 0 34px;
		height: 80px;
		line-height: 80px;
		color: #BA8833;
		text-align: center;
		font-size: 32px;
	}

	.sureBtn {
		margin-left: 32px;
		margin-top: 40px;
		width: 686px;
		height: 80px;
		background-color: rgba(200, 200, 200, 1);
		border-radius: 8px;
		text-align: center;
		line-height: 80px;
		color: #999999;
		font-size: 34px;
	}

	.active {
		background-color: #303030;
		color: #FFFFFF;
	}
</style>
